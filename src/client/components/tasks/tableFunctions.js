const addTask = '<button id="addTaskID">Add Task</button>',
    exportTasks = '<button id="exportTasksID">Export Tasks</button>',
    importTasks = '<button id="importTasksID">Import Tasks</button>';

const selectFilter = '<select id="filterDisplay">' +
    '<option value="week">Week</option>' +
    '<option value="month">Month</option>' +
    '<option selected value="working">Still Working On</option>' +
    '<option value="done">Completed</option>' +
    '<option value="year">Year</option>' +
    '<option value="all">All</option>' +
    '</select>';

function getHeader() {
    return '<thead><tr>' +
        '<th data-cell-number="cell-1">Edit</th>' +
        '<th data-type="text" data-cell-number="cell-2">Short Description</th>' +
        '<th data-type="text" data-cell-number="cell-3">Long Description</th>' +
        '<th data-type="date" data-cell-number="cell-4">Last Access Date</th>' +
        '<th data-type="date" data-cell-number="cell-5">Start Date</th>' +
        '<th data-type="date" data-cell-number="cell-6">End Date</th>' +
        '<th data-type="text" data-cell-number="cell-7">Status</th>' +
        '</tr></thead>';
}

function getTableRow( key, shortDescription, longDescription, workDate,
    startDate, endDate, completed, className ) {

    return `<tr class="${className} row-data">` +
        getButtonCell( key, 'cell-1' ) +
        getCell( shortDescription, 'cell-2' ) +
        getCell( longDescription, 'cell-3' ) +
        getCell( workDate, 'cell-4' ) +
        getCell( startDate, 'cell-5' ) +
        getCell( endDate, 'cell-6' ) +
        getCell( ( completed ? 'Done' : 'Working' ), 'cell-7' ) +
        '</tr>';
}

/*function colorize() {
    let i = 0;
    const rows = document.querySelectorAll( '#taskList tr' );
    [].forEach.call( rows, function ( idx, x ) {
        x.className = x.className.replace( /even/g, '' ).replace( /odd/g, '' );
        if ( i % 2 === 0 ) {
            x.className += ' even';
        } else {
            x.className += ' odd';
        }
        if ( x.className.indexOf( "hidden" ) === -1 ) {
            i += 1;
        }
    } );
};*/

function getTable( rows ) {
    let rowData = '';
    if ( rows.length > 0 ) {

        rowData = rows.reduce( ( acc, next ) => {
            return acc + next;
        } );
    }

    return `<div>${addTask}${selectFilter}<br>${exportTasks}<br>${importTasks}<br><table id="taskList">${getHeader()}<tbody>${rowData}</tbody></table></div>`;
}

function getCell( content, cellNumber ) {
    return `<td data-column-number="${cellNumber}">${content}</td>`;
}

function getButtonCell( id, className ) {
    return getCell( `<button class="edit-task" id="task-${id}">Edit (${id})</button>`, className );
}

export {
    getTable,
    getCell,
    getButtonCell,
    getTableRow
};
