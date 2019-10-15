import * as events from 'client/dom/events';
import footer from 'client/components/footer';
import * as menu from 'client/components/menu';

events.addOnLoad(() => {

    menu.basicMenu();
    footer('footer');

});