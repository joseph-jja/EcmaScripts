import * as events from 'client/dom/events';
import selector from 'client/dom/selector';
import * as dom from 'client/dom/DOM';

import Task from 'client/components/tasks/task';
import addEditTask from 'client/components/tasks/addEditTask';

import {
    getTable,
    getTableRow
} from 'client/components/tasks/tableFunctions';

let tasks;

function mapFromDom() {

    const options = {
        'completed': false,
        'work_date': dom.html( '#work_date' ),
        'short_description': dom.html( '#short_description' ),
        'long_description': dom.html( '#long_description' )
    };

    return options;
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

            const addButton = selector( '#addTaskID' ).get( 0 ),
                editButton = selector( '#taskList' ).get( 0 );
            events.addEvent( addButton, 'click', this.addTask, false );
            events.addEvent( editButton, 'click', this.editTask, false );
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
