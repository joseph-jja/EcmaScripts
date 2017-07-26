import selector from 'client/dom/selector';
import * as events from 'client/dom/events';

// components
import wbWindow from 'client/components/wbWindow';
import footer from 'client/components/footer';
import * as menu from 'client/components/menu';

function doOnLoadStuff() {

    menu.basicMenu();
    footer( 'footer' );

    var d = selector( "#insertDate" ).get( 0 );
    if ( d ) {
        events.addEvent( d, "click", function () {
            var dt = selector( "#pubDateID" ).get( 0 );
            if ( dt ) {
                dt.innerHTML = new Date();
            }
            return true;
        } );
    }

    // make dragable editor
    var win1 = new wbWindow( "RSS Editor", 145, 225, 'auto', 350, "rssEditWindow" );
    //win1.setDragable(true);
    var formDiv = document.getElementById( "editRSS" );
    if ( formDiv ) {
        win1.windowArea.innerHTML = formDiv.innerHTML;
        formDiv.innerHTML = '';
    }

    // make dragable viewer
    var win2 = new wbWindow( "RSS Feed", 145, 30, 'auto', 175, "rssData" );
    win2.windowArea.innerHTML = '<form><input type="file" name="feedInput" id="feedInputID"><button type="button" onclick="getFeed();">Load Feed</button></form><div style="height: 100px;text-align:left;overflow-y: scroll;" id="feedData"></div>';

    // make dragable viewer
    var win3 = new wbWindow( "RSS Output", 145, 600, 'auto', 175, "rssOutput" );
    win3.windowArea.innerHTML = '<form><textarea id="feedOutput" cols="85" rows="7"></textarea></form>';
}

events.addOnLoad( doOnLoadStuff );
