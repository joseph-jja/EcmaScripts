export default function addEditTask(task_id, work_date) {

    return `<form>
<input type="text" name="task_id" id="task_id" disabled value="{{task_id}}">
    
<label>Work Date: </label><input type="text" name="work_date" id="work_date" value="{{work_date}}" size="50">

<label>Short Description: </label><input type="text" name="short_description" id="short_description" size="80">

<label>Long Description: </label>
<textarea name="long_description" id="long_description" ros="4" cols="80"></textarea>

<label>Completed: </label>
<input type="checkbox" name="completed" id="completed">

<button id="cancelTask">Cancel</button>
<button id="saveTask">Save</button>

</form>`;
};