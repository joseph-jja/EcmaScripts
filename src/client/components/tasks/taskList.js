import * as events from 'client/dom/events';
import selector from 'client/dom/selector';

import Task from 'client/components/tasks/task';

import {
    getButtonCell,
    getCell,
    getTable
} from 'client/components/tasks/tableFunctions';

function TaskList() {

    this.taskListContainer = document.getElementById( 'taskListID' );

    function processFilter() {}

    function addTask() {}

    function editTask() {}

    this.initialize = function () {
        this.render();
        //events.addEvent( '#filterDisplay', 'change', processFilter, false );
        //events.addEvent( '#addTaskID', 'click', addTask, false );
        //events.addEvent( 'button.edit-task', 'click', editTask, false );
    };

    this.render = function () {
        const task = new Task();

        const options = {};
        options.callback = ( data ) => {
            let i = 0;
            const rows = data.map( ( item ) => {
                const className = ( i % 2 === 0 ) ? ' even' : ' odd';

                const row = '<tr>' +
                    getButtonCell( item.id, className ) +
                    getCell( item.short_description, className ) +
                    getCell( item.long_description, className ) +
                    getCell( item.work_date, className ) +
                    getCell( ( item.completed ? 'Done' : 'Working' ), className ) +
                    '</tr>';

                return row;
            } ).reduce( ( acc, next ) => {
                return acc + next;
            } );

            // FIXME 
            this.taskListContainer.innerHTML = getTable( rows );
        };

        task.list( options );
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

    //    addTask: function() {
    //        require(['taskView'], function(TaskView) {
    //            var x = new TaskView();
    //        });
    //    },
    //    editTask: function(e) {
    //        var target = e.target,
    //            data;
    //        data = target.innerHTML.replace(/Edit\ /g, '').replace(/[\(\)]/g, '');
    //        require(['taskView'], function(TaskView) {
    //            var x = new TaskView({
    //                id: data
    //            });
    //        });
    //    },
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
