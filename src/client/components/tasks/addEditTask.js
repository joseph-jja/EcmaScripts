export default function addEditTask( taskId = '', workDate = new Date() ) {

    return `<form method="POST" onsubmit="return false;">
<input type="text" name="task_id" id="task_id" disabled value="${taskId}">

<label>Work Date: </label><input type="text" name="work_date" id="work_date" value="${workDate}" size="50">

<label>Short Description: </label><input type="text" name="short_description" id="short_description" size="80">

<label>Long Description: </label>
<textarea name="long_description" id="long_description" ros="4" cols="80"></textarea>

<label>Completed: </label>
<input type="checkbox" name="completed" id="completed">

<button id="cancelTask">Cancel</button>
<button id="saveTask">Save</button>

</form>`;
};
