import * as dom from 'client/dom/DOM';
import * as events from 'client/dom/events';
import selector from 'client/dom/selector';

import footer from 'client/components/footer';
import * as menu from 'client/components/menu';

events.addOnLoad( () => {

    menu.basicMenu();
    footer( 'footer' );

    var mmddyyyy,
        todaysdate,
        timestamp,
        hhmmss, bv, p,
        beg, mid, end;

    todaysdate = new Date();
    mmddyyyy = todaysdate.getMonth() + "/" + todaysdate.getDate() + "/" + todaysdate.getFullYear();
    hhmmss = todaysdate.getHours() + ":" + todaysdate.getMinutes() + ":" + todaysdate.getSeconds();
    timestamp = mmddyyyy + " " + hhmmss;

    beg = "joseph-ja";
    mid = "earthlink";
    end = "net";

    bv = selector( "#browserVersion" ).get( 0 );
    if ( bv ) {
        bv.value = navigator.appVersion;
    }
    p = selector( "#platform" ).get( 0 );
    if ( p ) {
        p.value = navigator.appVersion;
    }
    dom.createElement( "input", bv.parentNode, {
        "id": "timedate",
        "value": timestamp
    } );
    dom.createElement( "input", bv.parentNode, {
        "id": "RECIPIENT",
        "value": beg + "@" + mid + "." + end
    } );

} );
