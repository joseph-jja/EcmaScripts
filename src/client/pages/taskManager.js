import * as events from 'client/dom/events';

import * as TaskList from 'client/components/tasks/taskList';

events.addOnLoad( ( onloadFN ) => {

    //menu.basicMenu();
    //footer( 'footer' );

    const listOfTasks = new TaskList();

} );
