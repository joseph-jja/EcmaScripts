import selector from 'client/dom/selector';
import * as events from 'client/dom/events';
import * as dom from 'client/dom/DOM';

// components
import * as rss from 'client/components/rss';
import footer from 'client/components/footer';
import * as menu from 'client/components/menu';
import * as file from 'client/file/loadFile';

function doOnLoadStuff() {

    menu.basicMenu();
    footer( 'footer' );

    let uploadFileObj = selector( "#feedInputID" ).get( 0 );
    events.addEvent( uploadFileObj, "change", ( e ) => {
        return file.selectFile( e, function ( data ) {
            rss.processData( data );
            uploadFileObj.value = '';
            events.addEvent( selector( "#feedData" ).get( 0 ), "click", ( ev ) => {
                let tgt = events.getTarget( ev );
                let id = tgt.id.replace( 'rssFeedItem_', '' );
                rss.getRSSItem( id );
            } );
        } );
    }, false );

    events.addEvent( selector( "#insertDate" ).get( 0 ), "click", function () {
        dom.html( "#pubDateID", new Date().toString() );
    } );

    events.addEvent( selector( "#clearAllID" ).get( 0 ), "click", rss.clearAll );
    events.addEvent( selector( "#updateRecordID" ).get( 0 ), "click", rss.updateRecord );
    events.addEvent( selector( "#insertRecordID" ).get( 0 ), "click", rss.insertRecord );
    events.addEvent( selector( "#saveDataID" ).get( 0 ), "click", rss.saveData );
}

events.addOnLoad( doOnLoadStuff );
