export default function addEditTask( taskId = '', workDate = new Date(),
    startDate = new Date(), endDate = '',
    shortDescription = '', longDescription = '', completed = false ) {

    const isChecked = ( completed ? 'checked' : '' );

    return `<form method="POST" onsubmit="return false;">
<input type="text" name="task_id" id="task_id" disabled value="${taskId}">

<label>Work Date: </label><input type="text" name="work_date" id="work_date" value="${workDate}" size="50">
<label>Start Date: </label><input type="text" name="start_date" id="start_date" value="${startDate}" size="50">
<label>End Date: </label><input type="text" name="end_date" id="end_date" value="${endDate}" size="50">

<label>Short Description: </label><input type="text" name="short_description" id="short_description" size="80" value="${shortDescription}">

<label>Long Description: </label>
<textarea name="long_description" id="long_description" rows="10" cols="80">${longDescription}</textarea>

<label>Completed: </label>
<input type="checkbox" name="completed" id="completed" ${isChecked}>

<button id="cancelTask">Cancel</button>
<button id="saveTask">Save</button>

</form>`;
};
