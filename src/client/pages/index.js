// libs first
import * as dom from 'client/dom/DOM';
import * as events from 'client/dom/events';
import selector from 'client/dom/selector';
import fetcher from 'client/net/fetcher';
import {
    exists
} from 'utils/typeCheck';

// default libs
import detect from 'client/browser/detect';

// components
import footer from 'client/components/footer';

// canvas
import * as canvas from 'client/components/canvas';

// clock
import {
    DigitalClock
} from 'client/components/clocks';

// calendar
import Calendar from 'client/components/calendar';

// TODO clean up this detection stuff
// code
const dt = detect();

let detected,
    capabilities = '';

if ( !dt.capabilitiesDetected ) {
    capabilities += "WARNING: Your browser version information was detected from useragent string only or not at all! ";
    capabilities += "<br />If you have problems viewing this site, please get a supported browser.";
}
detected = 'Detected Name = ' + dt.name + ' ' + dt.version + '.';
detected += '<br /><br />Stated OS = ' + dt.OS + '.';
detected += '<br />Stated Name - Version = ' + dt.name + ' - ' + dt.appVersion;
detected += '<br /><br />Spoofable OS = ' + dt.uaOS + ( dt.uaOSVersion ? "(" + dt.uaOSVersion + ")" : "" ) + '.';
detected += '<br />Spoofable Name - Version = ' + dt.uaName + ' - ' + dt.uaAppVersion;
detected += '<br />User Agent String = ' + dt.userAgent + '.';

const screenWidth = dom.screen.maxx();

const starSystemWorker = exists( Worker ) ? new Worker( '/js/starSystem.js' ) : undefined;

async function buildNav() {
    const navFrag = '/frags/nav.frag';
    const navData = await fetcher( navFrag );

    const nav = document.getElementById( 'menu' );
    nav.innerHTML = navData.replace( /\n/g, '' );
}

events.addOnLoad( () => {
    const myclock = new DigitalClock();
    myclock.setId( "digiclock" );
    myclock.startClock();

    let isCanedarDisplayed = false;

    footer( document.querySelectorAll( 'footer' )[ 0 ] );

    const calendarButton = selector( 'footer ul li:first-child' );
    events.addEvent( calendarButton.get( 0 ), 'click', ( e ) => {

        if ( !isCanedarDisplayed ) {
            // get footer
            const footerObj = selector( 'footer' ).get( 0 );

            // figure out the height
            const computedStyles = window.getComputedStyle( footerObj );
            const topOfFooter = computedStyles.top;

            // body for new element
            const body = document.querySelector( 'body' );

            // calendar stuff here
            const calendarContainer = dom.createElement( 'div', body, {
                'id': 'calendar-container'
            } );
            calendarContainer.style.display = 'block';
            const cal = new Calendar( calendarContainer.id );
            cal.render();

            // reposition stuff here
            const calHeight = window.getComputedStyle( calendarContainer ).height;
            const repositionPX = parseInt( topOfFooter ) - parseInt( calHeight ) - 12;
            calendarContainer.style.top = repositionPX + 'px';
            isCanedarDisplayed = true;
        } else {
            const calReference = selector( '#calendar-container' ).get( 0 );
            calReference.style.display = 'none';
            isCanedarDisplayed = false;
        }

    } );

    // TODO move this into a worker?
    let canvasRef;
    if ( screenWidth > 800 ) {
        canvasRef = canvas.create( 'star-system', 'canvas-container', 800, 600 );
    } else {
        canvasRef = canvas.create( 'star-system', 'canvas-container', 250, 250 );
    }

    // make canvas black
    canvasRef.setBackgroundColor( 'black' );

    if ( starSystemWorker ) {
        starSystemWorker.onmessage = ( msg ) => {

            if ( msg.data.stars ) {
                const stars = msg.data.stars,
                    black = stars.black,
                    white = stars.white;

                canvasRef.circle( black[ 0 ].x, black[ 0 ].y, black[ 0 ].diameter, {
                    color: black[ 0 ].color,
                    fillStrokeClear: 'fill'
                } );
                canvasRef.circle( black[ 1 ].x, black[ 1 ].y, black[ 1 ].diameter, {
                    color: black[ 1 ].color,
                    fillStrokeClear: 'fill'
                } );

                canvasRef.circle( white[ 0 ].x, white[ 0 ].y, white[ 0 ].diameter, {
                    color: white[ 0 ].color,
                    fillStrokeClear: 'fill'
                } );
                canvasRef.circle( white[ 1 ].x, white[ 1 ].y, white[ 1 ].diameter, {
                    color: white[ 1 ].color,
                    fillStrokeClear: 'fill'
                } );
            }
        };
        starSystemWorker.postMessage( {
            'setWidthHeight': [ canvasRef.width, canvasRef.height ]
        } );
    }

    buildNav();
    //dom.html( "#cautionContent", capabilities + detected );
    //menu.basicMenu();
} );
