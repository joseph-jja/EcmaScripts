import * as events from 'client/dom/events';
import {
    findParent
} from 'client/dom/DOM';

import selector from 'client/dom/selector';
import toggleUL from 'client/dom/toggleUL';

import footer from 'client/components/footer';
import * as menu from 'client/components/menu';

events.addOnLoad( ( onloadFN => {
    menu.basicMenu();
    footer( 'footer' );

    //onclick toggleUL
    let toplevel = selector( "span.toplevel ul" );
    let i = 0,
        len = toplevel.length;
    for ( i = 0; i < len; i++ ) {
        let ulEle = toplevel.get( i );
        let spanEle = findParent( ulEle, 'span' );
        events.addEvent( spanEle, 'click', () => {
            toggleUL( ulEle.id, spanEle );
        }, false );
    }
} ) );
