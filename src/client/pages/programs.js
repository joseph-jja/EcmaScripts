import * as events from 'client/dom/events';

import selector from 'client/dom/selector';
import toggleUL from 'client/dom/toggleUL';

import footer from 'client/components/footer';
import * as menu from 'client/components/menu';

events.addOnLoad((() => {
    menu.basicMenu();
    footer('footer');

    // onclick toggleUL setup
    let toplevel = selector("span.toplevel");
    let i = 0,
        len = toplevel.length;

    for (i = 0; i < len; i++) {
        // we know the DOM here
        let spanEle = toplevel.get(i);
        let liParent = spanEle.parentNode;
        let ulEle = selector('ul.tree_child_hidden', liParent).get(0);
        events.addEvent(spanEle, 'click', () => {
            toggleUL(ulEle.id, spanEle);
        }, false);
    }
}));