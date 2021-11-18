import * as events from 'client/dom/events';
import selector from 'client/dom/selector';
import * as dom from 'client/dom/DOM';
import * as css from 'client/dom/CSS';

import fetcher from 'client/net/fetcher';

import Task from 'client/components/tasks/task';
import addEditTask from 'client/components/tasks/addEditTask';

import {
    getTable,
    getTableRow
} from 'client/components/tasks/tableFunctions';

import {
    mapFromDom,
    tableSort,
    cancelButtonClick,
    setEndDate
} from 'client/components/tasks/taskUtils';

const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000,
    ABOUT_A_MONTH = SEVEN_DAYS * 4;

let tasks;

function TaskList() {

    this.taskListContainer = document.getElementById( 'taskListID' );

    this.initialize = function () {
        tasks = new Task();

        this.render();
    };

    this.render = function () {

        const options = {};
        options.callback = ( data ) => {
            let i = -1;
            const rows = (data || []).map( ( item ) => {
                i++;

                return getTableRow( item.key,
                    item.value.short_description,
                    item.value.long_description,
                    item.value.work_date,
                    ( item.value.start_date || item.value.work_date ),
                    ( item.value.end_date || ( item.value.completed ? item.value.work_date : '' ) ),
                    item.value.completed,
                    ( ( i % 2 === 0 ) ? ' even' : ' odd' ) );
            } );

            this.taskListContainer.innerHTML = getTable( rows );
            tableSort();

            const addButton = selector( '#addTaskID' ).get( 0 ),
                editButton = selector( '#taskList' ).get( 0 ),
                exportTasksButton = selector( '#exportTasksID' ).get( 0 ),
                importTasksButton = selector( '#importTasksID' ).get( 0 ),
                filterDisplaySelect = selector( '#filterDisplay' ).get( 0 );
            events.addEvent( addButton, 'click', this.addTask, false );
            events.addEvent( editButton, 'click', this.editTask, false );
            events.addEvent( exportTasksButton, 'click', this.exportData, false );
            events.addEvent( importTasksButton, 'click', this.importData, false );
            events.addEvent( filterDisplaySelect, 'change', this.filterDisplay, false );

            // filter to show working items
            filterDisplaySelect.selectedIndex = 2;
            this.filterDisplay();
        };

        tasks.list( options );
    };

    this.filterDisplay = function () {
        const selectFilter = document.getElementById( 'filterDisplay' );
        const selectedValue = selectFilter.options[ selectFilter.selectedIndex ].value.toLowerCase();
        const rows = selector( '#taskList tbody tr' );

        // enable all rows
        rows.each( ( r ) => {
            r.style.display = 'table-row';
        } );

        switch ( selectedValue ) {
        case 'working':
            rows.each( ( r ) => {
                const cols = selector( 'td', r );
                const lastCol = cols.get( cols.length - 1 );
                if ( lastCol.innerHTML.toLowerCase() === 'done' ) {
                    r.style.display = 'none';
                }
            } );
            break;
        case 'done':
            rows.each( ( r ) => {
                const cols = selector( 'td', r );
                const lastCol = cols.get( cols.length - 1 );
                if ( lastCol.innerHTML.toLowerCase() === 'working' ) {
                    r.style.display = 'none';
                }
            } );
            break;
        case 'week':
            const weekAgo = new Date().getTime() - SEVEN_DAYS;
            rows.each( ( r ) => {
                const cols = selector( 'td', r );
                const lastCol = cols.get( cols.length - 4 );
                const date = Date.parse( lastCol.innerHTML );
                if ( date < weekAgo ) {
                    r.style.display = 'none';
                }
            } );
            break;
        case 'month':
            const aboutAMonthAgo = new Date().getTime() - ABOUT_A_MONTH;
            rows.each( ( r ) => {
                const cols = selector( 'td', r );
                const lastCol = cols.get( cols.length - 4 );
                const date = Date.parse( lastCol.innerHTML );
                if ( date < aboutAMonthAgo ) {
                    r.style.display = 'none';
                }
            } );
            break;
        default:
            // this is the default to show all
            // need to do nothing
            break;
        }

        // properly style rows
        let i = 0;
        rows.each( ( r ) => {
            if ( r.style.display !== 'none' ) {
                css.removeClass( r, 'even' );
                css.removeClass( r, 'odd' );
                const newClass = ( ( i % 2 === 0 ) ? ' even' : ' odd' );
                i++;
                css.addClass( r, newClass );
            }
        } );
    };

    this.addTask = function () {
        const addEditHTML = addEditTask();
        selector( '#taskEditID' ).get( 0 ).innerHTML = addEditHTML;

        const saveButton = selector( '#saveTask' ).get( 0 ),
            cancelButton = selector( '#cancelTask' ).get( 0 ),
            completed = selector( '#completed' ).get( 0 );

        events.addEvent( saveButton, 'click', () => {
            const options = mapFromDom();

            options.callback = ( evt, err ) => {
                window.location.reload();
            };

            tasks.create( options );
        }, false );

        events.addEvent( completed, 'change', setEndDate, false );
        events.addEvent( cancelButton, 'click', cancelButtonClick, false );
    };

    this.editTask = function ( e ) {
        const evt = events.getEvent( e );
        const target = events.getTarget( evt );
        if ( target.nodeName.toLowerCase() !== 'button' ) {
            return;
        }

        const buttonHTML = target.innerHTML;
        const taskId = buttonHTML.replace( /Edit\ /g, '' ).replace( /[\(\)]/g, '' );

        const options = {
            id: taskId
        };
        options.callback = ( item ) => {

            const addEditHTML = addEditTask( item.id,
                new Date(),
                item.start_date || item.work_date,
                item.end_date || ( item.completed ? new Date() : '' ),
                item.short_description,
                item.long_description, item.completed );

            selector( '#taskEditID' ).get( 0 ).innerHTML = addEditHTML;

            const saveButton = selector( '#saveTask' ).get( 0 ),
                cancelButton = selector( '#cancelTask' ).get( 0 ),
                completed = selector( '#completed' ).get( 0 );

            events.addEvent( saveButton, 'click', () => {
                const record = mapFromDom();
                record.id = dom.html( '#task_id' );

                record.callback = ( evt, err ) => {
                    window.location.reload();
                };
                tasks.update( record );
            }, false );

            events.addEvent( completed, 'change', setEndDate, false );
            events.addEvent( cancelButton, 'click', cancelButtonClick, false );
        };

        tasks.fetch( options );
    };

    this.importData = function () {

        const fileToLoad = 'data/all-tasks.json';

        fetcher( `/${fileToLoad}` )
            .then( ( data ) => {
                console.log( 'success' );
                const tasksToImport = JSON.parse( data );
                tasks.clear( {
                    callback: ( evt, err ) => {
                        tasksToImport.forEach( item => {

                            const options = {
                                'key': item.key,
                                'completed': item.completed,
                                'work_date': item[ 'work_date' ],
                                'start_date': item[ 'start_date' ] || item[ 'work_date' ],
                                'end_date': item[ 'end_date' ] || ( item.completed ? item[ 'work_date' ] : '' ),
                                'short_description': item[ 'short_description' ],
                                'long_description': item[ 'long_description' ]
                            };

                            options.callback = ( evt, err ) => {};
                            tasks.create( options, true );
                        } );
                        console.log( data );
                    }
                } );
            } ).catch( ( err ) => {
                console.log( err );
            } );
    };

    this.exportData = function () {

        const options = {};
        options.callback = ( data ) => {

            const rows = data.map( ( item ) => {

                return {
                    'key': item.key,
                    'id': item.key,
                    'short_description': item.value.short_description,
                    'long_description': item.value.long_description,
                    'work_date': item.value.work_date,
                    'start_date': item.value.start_date || item.value.work_date,
                    'end_date': item.value.end_date || ( item.value.completed ? item.value.work_date : '' ),
                    'completed': item.value.completed
                };
            } );
            const results = JSON.stringify( rows );
            console.log( results );

            const fileToSave = 'data/all-tasks.json';
            const downloadOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Length': results.length
                },
                body: JSON.stringify( {
                    data: results
                } )
            };

            fetcher( `/${fileToSave}?saveFile=${fileToSave}`, downloadOptions )
                .then( ( data ) => {
                    console.log( 'success' );
                    console.log( data );
                } ).catch( ( err ) => {
                    console.log( err );
                } );
        };

        tasks.list( options );
    };
}

export default TaskList;
