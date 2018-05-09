function getTable( rows ) {

    function getHeader() {
        return '<tr>' +
            '<th>Edit</th>' +
            '<th>Short Description</th>' +
            '<th>Long Description</th>' +
            '<th>Last Access Date</th>' +
            '<th>Status</th>' +
            '</tr>';
    }

    return `<table id="taskList">${getHeader()}${rows.join('')}</table>`;
}

function getCell( content, className ) {
    return `<td class="${className}">${content}</td>`;
}

function getButtonCell( id, className ) {
    return getCell( `<button class="edit-task" id="task-${id}">Edit (${id})</button>`, className );
}

export {
    getTable,
    getCell,
    getButtonCell
}
