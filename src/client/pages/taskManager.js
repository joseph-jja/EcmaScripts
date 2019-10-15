import * as events from 'client/dom/events';

import TaskList from 'client/components/tasks/taskList';

events.addOnLoad(() => {

    //menu.basicMenu();
    //footer( 'footer' );

    const listOfTasks = new TaskList();
    listOfTasks.initialize();

});