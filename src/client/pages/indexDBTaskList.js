import * as events from 'client/dom/events';
import footer from 'client/components/footer';
import * as menu from 'client/components/menu';

import TaskList from 'client/components/tasks/taskList';

events.addOnLoad( ( onloadFN ) => {
    menu.basicMenu();
    footer( 'footer' );
} );
