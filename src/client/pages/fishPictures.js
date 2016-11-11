import {
    addOnLoad,
    addEvent
} from 'client/dom/events';
import {
    html,
    createElement,
    toggleDisplay
} from 'client/dom/DOM';
import * as menu from 'client/components/menu';
import footer from 'client/components/footer';
import fish from 'client/components/swimmingFish';

addOnLoad( () => {

    var swimmingfish = new fish.BrowserFish( "movingfish" );



    function runfish() {
        var tid = swimmingfish.runtimerid;
        var button = document.getElementById( "fishButtonID" );
        if ( tid ) {
            swimmingfish.stopfish();
            swimmingfish.runtimerid = undefined;
            if ( button ) {
                button.innerHTML = "Start";
            }
        } else {
            swimmingfish.startfish();
            tid = swimmingfish.runtimerid;
            if ( button ) {
                button.innerHTML = "Stop";
            }
        }
    }

    html( "#nav_bar", menu.extendedMenu() );
    footer( 'footer' );
    runfish();

    var span = '<button type="button" id="fishButtonID">Stop</button>';
    span += "Watch for the swiming fish on my page.";
    span += "If it annoys you or you want to play with it click the button below.";

    html( "#runFishForm", span );
    addEvent( document.getElementById( "fishButtonID" ), 'click', runfish, false );

    function popupFakeWindow( anchorTag ) {

        var href = anchorTag.href;
        if ( href.substring( 0, 10 ) === "javascript" ) {
            return; // do nothing to the javascript links
        } else {
            anchorTag.target = "_blank";
        }
        return;
    }

    function goModal() {
        var bodies = document.getElementsByTagName( "body" );
        if ( bodies.length <= 0 ) {
            return;
        }
        var body = bodies[ 0 ];
        if ( !body ) {
            return;
        }
        var overlay = createElement( "div", "overlayID", body, {
            background: '#cfcfcf'
        } );
        if ( !overlay ) {
            return;
        }
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.zIndex = '100000';
    }

    // loop through document to manipulate the images
    var fn = document.getElementById( "fishnavmenu" );
    var anchors = fn.getElementsByTagName( "a" );
    var anlen = anchors.length;
    for ( var x = 0; x < anlen; x += 1 ) {
        var parent = anchors[ x ].parentNode;
        var plen = parent.childNodes.length;
        var found = false;
        for ( var j = 0; j < plen; j += 1 ) {
            if ( parent.childNodes[ j ].nodeName.toLowerCase() === "ul" ) {
                found = true;
                break;
            }
        }
        if ( !found && ( anchors[ x ].href.substring( 0, 10 ) !== "javascript" ) ) {
            popupFakeWindow( anchors[ x ] );
        }
    }

    // export global
    window.toggleDisplay = toggleDisplay;
} );
