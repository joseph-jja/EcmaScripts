import selector from 'client/dom/selector';
import * as events from 'client/dom/events';
import * as dom from 'client/dom/DOM';

// components
import * as rss from 'client/components/rss';
import footer from 'client/components/footer';
import * as menu from 'client/components/menu';

function doOnLoadStuff() {

    menu.basicMenu();
    footer( 'footer' );

    events.addEvent( selector( "#insertDate" ).get( 0 ), "click", function () {
        dom.html( "#pubDateID", new Date() );
    } );

    events.addEvent( selector( "#clearAllID" ).get( 0 ), "click", rss.clearAll );
    events.addEvent( selector( "#updateRecordID" ).get( 0 ), "click", rss.updateRecord );
    events.addEvent( selector( "#insertRecordID" ).get( 0 ), "click", rss.insertRecord );
    events.addEvent( selector( "#saveDataID" ).get( 0 ), "click", rss.saveData );
}

events.addOnLoad( doOnLoadStuff );
