import selector from 'client/dom/selector';
import * as events from 'client/dom/events';

// components
import * as rss from 'client/components/rss';
import wbWindow from 'client/components/wbWindow';
import footer from 'client/components/footer';
import * as menu from 'client/components/menu';

function doOnLoadStuff() {

    menu.basicMenu();
    footer( 'footer' );

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
    // TODO remove this window and combine all windows and use fieldsets for separation
    //<form><fieldset><legend>RSS Feed</legend> ....
    win2.windowArea.innerHTML = '<form><input type="file" name="feedInput" id="feedInputID"><button type="button" onclick="getFeed();">Load Feed</button></form><div style="height: 100px;text-align:left;overflow-y: scroll;" id="feedData"></div>';

    // make dragable viewer
    var win3 = new wbWindow( "RSS Output", 145, 600, 'auto', 175, "rssOutput" );
    win3.windowArea.innerHTML = '<form><textarea id="feedOutput" cols="85" rows="7"></textarea></form>';

    events.addEvent( selector( "#insertDate" ).get( 0 ), "click", function () {
        var dt = selector( "#pubDateID" ).get( 0 );
        if ( dt ) {
            dt.innerHTML = new Date();
        }
        return true;
    } );

    events.addEvent( selector( "#clearAllID" ).get( 0 ), "click", rss.clearAll );
    events.addEvent( selector( "#updateRecordID" ).get( 0 ), "click", rss.updateRecord );
    events.addEvent( selector( "#insertRecordID" ).get( 0 ), "click", rss.insertRecord );
    events.addEvent( selector( "#saveDataID" ).get( 0 ), "click", rss.saveData );
}

events.addOnLoad( doOnLoadStuff );
