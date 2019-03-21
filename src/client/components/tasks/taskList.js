import * as events from 'client/dom/events';
import selector from 'client/dom/selector';
import * as dom from 'client/dom/DOM';

import fetcher from 'client/net/fetcher';

import Task from 'client/components/tasks/task';
import addEditTask from 'client/components/tasks/addEditTask';

import {
    getTable,
    getTableRow
} from 'client/components/tasks/tableFunctions';

let tasks;

function mapFromDom() {

    const completed = selector( '#completed' ).get( 0 ).checked;

    const options = {
        'completed': completed,
        'work_date': dom.html( '#work_date' ),
        'short_description': dom.html( '#short_description' ),
        'long_description': dom.html( '#long_description' )
    };

    return options;
}

function tableSort() {
    const tbody = selector( '#taskList tbody' ).get( 0 );
    const rows = selector( '#taskList tbody tr' ).toArray();
    const sortedRows = rows.sort( ( a, b ) => {
        const tdDateA = a.childNodes[ 3 ].innerHTML,
            tdDateB = b.childNodes[ 3 ].innerHTML;

        const timeA = new Date( tdDateA ).getTime(),
            timeB = new Date( tdDateB ).getTime();

        const delta = ( timeA - timeB );
        if ( delta > 0 ) {
            tbody.prepend( a );
        } else {
            tbody.prepend( b );
        }

        return delta;
    } );
}

function cancelButtonClick() {

    const saveButton = selector( '#saveTask' ).get( 0 ),
        cancelButton = selector( '#cancelTask' ).get( 0 );

    events.removeEvent( saveButton, 'click' );
    events.removeEvent( cancelButton, 'click' );
    window.location.reload();
}

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
            const rows = data.map( ( item ) => {
                i++;

                return getTableRow( item.key,
                    item.value.short_description,
                    item.value.long_description,
                    item.value.work_date,
                    item.value.completed,
                    ( ( i % 2 === 0 ) ? ' even' : ' odd' ) );
            } );

            this.taskListContainer.innerHTML = getTable( rows );
            tableSort();

            const addButton = selector( '#addTaskID' ).get( 0 ),
                editButton = selector( '#taskList' ).get( 0 ),
                exportTasksButton = selector( '#exportTasksID' ).get( 0 );
            events.addEvent( addButton, 'click', this.addTask, false );
            events.addEvent( editButton, 'click', this.editTask, false );
            events.addEvent( exportTasksButton, 'click', this.exportData, false );
            //events.addEvent( '#filterDisplay', 'change', processFilter, false );
        };

        tasks.list( options );
    };

    this.addTask = function () {
        const addEditHTML = addEditTask();
        selector( '#taskEditID' ).get( 0 ).innerHTML = addEditHTML;

        const saveButton = selector( '#saveTask' ).get( 0 ),
            cancelButton = selector( '#cancelTask' ).get( 0 );

        events.addEvent( saveButton, 'click', () => {
            const options = mapFromDom();

            options.callback = ( evt, err ) => {
                window.location.reload();
            };

            tasks.create( options );
        }, false );

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
                item.work_date, item.short_description,
                item.long_description, item.completed );

            selector( '#taskEditID' ).get( 0 ).innerHTML = addEditHTML;

            const saveButton = selector( '#saveTask' ).get( 0 ),
                cancelButton = selector( '#cancelTask' ).get( 0 );

            events.addEvent( saveButton, 'click', () => {
                const record = mapFromDom();
                record.id = dom.html( '#task_id' );

                record.callback = ( evt, err ) => {
                    window.location.reload();
                };
                tasks.update( record );
            }, false );

            events.addEvent( cancelButton, 'click', cancelButtonClick, false );
        };

        tasks.fetch( options );
    };

    this.exportData = function () {

        const options = {};
        options.callback = ( data ) => {

            const rows = data.map( ( item ) => {

                return {
                    key: item.key,
                    id: item.key,
                    'short_description': item.value.short_description,
                    'long_description': item.value.long_description,
                    'work_date': item.value.work_date,
                    'completed': item.value.completed
                };
            } );
            const results = JSON.stringify( rows );
            console.log( results );

            const fileToSave = 'data/all-tasks.json';
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Length': results.length
                },
                body: JSON.stringify( {
                    data: results
                } )
            };

            fetcher( `/${fileToSave}?saveFile=${fileToSave}`, options )
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
