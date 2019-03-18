import * as events from 'client/dom/events';
import selector from 'client/dom/selector';
import * as dom from 'client/dom/DOM';

import Task from 'client/components/tasks/task';
import addEditTask from 'client/components/tasks/addEditTask';

import {
    getButtonCell,
    getCell,
    getTable
} from 'client/components/tasks/tableFunctions';

let tasks;

function TaskList() {

    this.taskListContainer = document.getElementById( 'taskListID' );

    this.initialize = function () {
        tasks = new Task();

        this.render( () => {

            const addButton = selector( '#addTaskID' ).get( 0 ),
                editButton = selector( '#taskList' ).get( 0 );
            events.addEvent( addButton, 'click', this.addTask, false );
            events.addEvent( editButton, 'click', this.editTask, false );
            //events.addEvent( '#filterDisplay', 'change', processFilter, false );
        } );
    };

    this.render = function ( postRender ) {

        const options = {};
        options.callback = ( data ) => {
            let i = 0;
            let rows = data.map( ( item ) => {
                const className = ( i % 2 === 0 ) ? ' even' : ' odd';

                const row = '<tr>' +
                    getButtonCell( item.key, className ) +
                    getCell( item.value.short_description, className ) +
                    getCell( item.value.long_description, className ) +
                    getCell( item.value.work_date, className ) +
                    getCell( ( item.value.completed ? 'Done' : 'Working' ), className ) +
                    '</tr>';

                return row;
            } );

            if ( rows.length > 0 ) {

                rows = rows.reduce( ( acc, next ) => {
                    return acc + next;
                } );
            }

            this.taskListContainer.innerHTML = getTable( rows );
            if ( postRender ) {
                postRender();
            }
        };

        tasks.list( options );
    };

    this.colorize = function () {
        let i = 0;
        const rows = document.querySelectorAll( '#taskList tr' );
        [].forEach.call( rows, function ( idx, x ) {
            if ( i % 2 === 0 ) {
                x.className += ' even';
            } else {
                x.className += ' odd';
            }
            if ( x.className.indexOf( "hidden" ) === -1 ) {
                i += 1;
            }
        } );
    };

    this.addTask = function () {
        const addEditHTML = addEditTask();
        selector( '#taskEditID' ).get( 0 ).innerHTML = addEditHTML;

        const saveButton = selector( '#saveTask' ).get( 0 ),
            cancelButton = selector( '#cancelTask' ).get( 0 );

        events.addEvent( saveButton, 'click', () => {
            const options = {
                'completed': false,
                'work_date': dom.html( '#work_date' ),
                'short_description': dom.html( '#short_description' ),
                'long_description': dom.html( '#long_description' )
            };

            options.callback = ( evt, err ) => {
                window.location.reload();
            };

            tasks.create( options );
        }, false );

        events.addEvent( cancelButton, 'click', () => {
            events.removeEvent( saveButton, 'click' );
            events.removeEvent( cancelButton, 'click' );
        }, false );

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

            const addEditHTML = addEditTask( item.key,
                item.value.work_date,
                item.value.short_description, item.value.long_description, item.value.completed );

            selector( '#taskEditID' ).get( 0 ).innerHTML = addEditHTML;

            const saveButton = selector( '#saveTask' ).get( 0 ),
                cancelButton = selector( '#cancelTask' ).get( 0 );

            events.addEvent( saveButton, 'click', () => {
                const record = {
                    'id': dom.html( '#task_id' ),
                    'completed': false,
                    'work_date': dom.html( '#work_date' ),
                    'short_description': dom.html( '#short_description' ),
                    'long_description': dom.html( '#long_description' )
                };
                record.callback = ( evt, err ) => {
                    window.location.reload();
                };
                tasks.update( record );
            }, false );

            events.addEvent( cancelButton, 'click', () => {
                events.removeEvent( saveButton, 'click' );
                events.removeEvent( cancelButton, 'click' );
            }, false );
        };

        tasks.read( options );

    };

    //    exportData: function(callback) {
    //        var self = this;
    //        require(['indexedDB', 'constants'], function(Idb, Constants) {
    //            var db;
    //
    //            db = new Idb(Constants.DBName);
    //            db.list(Constants.StoreName, function(data) {
    //                callback(data);
    //                db.close();
    //            });
    //        });
    //    },
    //    processFilter: function() {
    //        var time, list, self = this,
    //            day = new Date(),
    //            selectedValue = $("#filterDisplay").val();
    //
    //        list = $("#taskList tr");
    //        if (selectedValue === 'week') {
    //            time = 7 * 24 * 60 * 60 * 1000;
    //            day.setTime(day.getTime() - time);
    //            day.setHours(0);
    //        } else if (selectedValue === 'month') {
    //            time = 30 * 24 * 60 * 60 * 1000;
    //            day.setTime(day.getTime() - time);
    //            day.setHours(0);
    //        }
    //
    //        $("#taskList tr").each(function(idx, x) {
    //            var cols = $("td", x),
    //                tdCell, dt;
    //
    //            $(x).removeClass("hidden");
    //            $(x).removeClass("even");
    //            $(x).removeClass("odd");
    //            if (selectedValue === 'working') {
    //                tdCell = cols.get(4);
    //                if (tdCell && tdCell.innerHTML.toLowerCase() !== 'working') {
    //                    $(x).addClass("hidden");
    //                }
    //            } else if (selectedValue === 'all') {
    //                // don't really need to do anything here
    //                cols.get(4);
    //            } else if (typeof time !== 'undefined') {
    //                tdCell = cols.get(3);
    //                if (tdCell) {
    //                    dt = Date.parse(tdCell.innerHTML);
    //                    if (dt < day.getTime()) {
    //                        $(x).addClass("hidden");
    //                    }
    //                }
    //            }
    //        });
    //        self.colorize();
    // }

}

export default TaskList;
