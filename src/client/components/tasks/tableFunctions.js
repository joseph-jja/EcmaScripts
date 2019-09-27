const addTask = '<button id="addTaskID">Add Task</button>',
    exportTasks = '<button id="exportTasksID">Export Tasks</button>',
    importTasks = '<button id="importTasksID">Import Tasks</button>';

const selectFilter = '<select id="filterDisplay">' +
    '<option value="week">Week</option>' +
    '<option value="month">Month</option>' +
    '<option value="working">Still Working On</option>' +
    '<option selected="selected" value="all">All</option>' +
    '</select>';

function getHeader() {
    return '<thead><tr>' +
        '<th>Edit</th>' +
        '<th>Short Description</th>' +
        '<th>Long Description</th>' +
        '<th>Last Access Date</th>' +
        '<th>Status</th>' +
        '</tr></thead>';
}

function getTableRow(key, shortDescription, longDescription, workDate, completed, className) {
    return `<tbody><tr class="${className}">` +
        getButtonCell(key, className) +
        getCell(shortDescription, className) +
        getCell(longDescription, className) +
        getCell(workDate, className) +
        getCell((completed ? 'Done' : 'Working')) +
        '</tr></tbody>';
}

function colorize() {
    let i = 0;
    const rows = document.querySelectorAll('#taskList tr');
    [].forEach.call(rows, function(idx, x) {
        x.className = x.className.replace(/even/g, '').replace(/odd/g, '');
        if (i % 2 === 0) {
            x.className += ' even';
        } else {
            x.className += ' odd';
        }
        if (x.className.indexOf("hidden") === -1) {
            i += 1;
        }
    });
};

function getTable(rows) {
    let rowData = '';
    if (rows.length > 0) {

        rowData = rows.reduce((acc, next) => {
            return acc + next;
        });
    }

    return `<div>${addTask}${selectFilter}<br>${exportTasks}<br>${importTasks}<br><table id="taskList">${getHeader()}${rowData}</table></div>`;
}

function getCell(content) {
    return `<td>${content}</td>`;
}

function getButtonCell(id, className) {
    return getCell(`<button class="edit-task" id="task-${id}">Edit (${id})</button>`, className);
}

export {
    getTable,
    getCell,
    getButtonCell,
    getTableRow
};