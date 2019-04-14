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

// resume parser
import resumeParser from 'client/components/resumeParser';

// window
import WebWindow from 'client/components/wbWindow';

// TODO clean up this detection stuff
// code
const dt = detect();


let defaultPosition = {},
    isCalendarDisplayed = false,
    starsShouldRun = true,
    mainWin;

let detected,
    capabilities = '<br><div class="home-content">';

if ( !dt.capabilitiesDetected ) {
    capabilities += "WARNING: Your browser version information was detected from useragent string only or not at all! ";
    capabilities += "<br />If you have problems viewing this site, please get a supported browser.";
}
detected = 'Detected Name = ' + dt.name + ' ' + dt.version + '.';
detected += '<br /><br />Stated OS = ' + dt.OS + '.';
detected += '<br />Stated Name - Version = ' + dt.name + ' - ' + dt.appVersion;
detected += '<br /><br />Spoofable OS = ' + dt.uaOS + ( dt.uaOSVersion ? "(" + dt.uaOSVersion + ")" : "" ) + '.';
detected += '<br />Spoofable Name - Version = ' + dt.uaName + ' - ' + dt.uaAppVersion;
detected += '<br />User Agent String = ' + dt.userAgent + '.</div>';

const screenWidth = dom.screen.maxx();

const starSystemWorker = exists( Worker ) ? new Worker( '/js/starSystem.js' ) : undefined;

async function buildNav() {
    const navFrag = '/frags/nav.frag';
    const navData = await fetcher( navFrag );

    const nav = document.getElementById( 'menu' );
    nav.innerHTML = navData.replace( /\n/g, '' );
}

async function getIndex() {
    const iFrag = '/frags/index.frag';
    const iData = await fetcher( iFrag );

    return iData;
}

async function loadResume() {

    const resumeURL = '/data/resume_data.xml';
    const resumeData = await fetcher( resumeURL );

    const resumeHTML = resumeParser( resumeData );

    const resumeObj = dom.createElement( 'div', mainWin.windowArea, {
        id: 'resume-html'
    } );
    dom.html( resumeObj, resumeHTML );
    resumeObj.style.display = 'block';

    // stop the running stars
    starsShouldRun = false;
}

function setDefaultPosition() {
    const mw = document.getElementById( 'main-window' );
    const styles = window.getComputedStyle( mw );
    defaultPosition = styles;

    mainWin = new WebWindow( 'Home - Not Mine Though',
        defaultPosition.offsetLeft,
        defaultPosition.offsetTop,
        defaultPosition.offsetWidth,
        defaultPosition.offsetHeight,
        'main-window' );
}

function renderCalendar() {
    if ( !isCalendarDisplayed ) {
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
        calendarContainer.style.position = 'fixed';
        isCalendarDisplayed = true;
    } else {
        const calReference = selector( '#calendar-container' ).get( 0 );
        calReference.style.display = 'none';
        isCalendarDisplayed = false;
    }
}

events.addOnLoad( async function () {
    const myclock = new DigitalClock();
    myclock.setId( "digiclock" );
    myclock.startClock();

    footer( document.querySelectorAll( 'footer' )[ 0 ] );

    setDefaultPosition();

    const calendarButton = selector( 'footer ul li:first-child' );
    events.addEvent( calendarButton.get( 0 ), 'click', renderCalendar );

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

            if ( msg.data.stars && starsShouldRun ) {
                const stars = msg.data.stars,
                    black = stars.black,
                    white = stars.white,
                    planets = msg.data.planets,
                    shownPlanet = planets.shownPlanet,
                    blackPlanet = planets.blackPlanet;

                if ( black ) {
                    for ( let p = 0, end = black.length; p < end; p++ ) {
                        canvasRef.circle( black[ p ].x, black[ p ].y, black[ p ].diameter, {
                            color: black[ p ].color,
                            fillStrokeClear: 'fill'
                        } );
                    }
                }
                if ( white ) {
                    for ( let p = 0, end = white.length; p < end; p++ ) {
                        canvasRef.circle( white[ p ].x, white[ p ].y, white[ p ].diameter, {
                            color: white[ p ].color,
                            fillStrokeClear: 'fill'
                        } );
                    }
                }

                if ( blackPlanet ) {
                    for ( let p = 0, end = blackPlanet.length; p < end; p++ ) {
                        canvasRef.circle( blackPlanet[ p ].x, blackPlanet[ p ].y, blackPlanet[ p ].diameter, {
                            color: blackPlanet[ p ].color,
                            fillStrokeClear: 'fill'
                        } );
                    }
                }
                if ( shownPlanet ) {
                    for ( let p = 0, end = shownPlanet.length; p < end; p++ ) {
                        canvasRef.circle( shownPlanet[ p ].x, shownPlanet[ p ].y, shownPlanet[ p ].diameter, {
                            color: shownPlanet[ p ].color,
                            fillStrokeClear: 'fill'
                        } );
                    }
                }
            }
        };
        starSystemWorker.postMessage( {
            'setWidthHeight': [ canvasRef.width, canvasRef.height ]
        } );
    }

    await buildNav();
    const wwa = selector( '#welcome-content .WebWindowArea' ).get( 0 );
    const indexData = await getIndex();
    wwa.innerHTML = indexData + capabilities + detected;

    const dropdown = selector( '.url-wrapper select' ).get( 0 );
    events.addEvent( dropdown, 'click', ( e ) => {
        const evt = events.getEvent( e );
        const tgt = events.getTarget( evt );
        const item = tgt.options[ tgt.selectedIndex ].text.toLowerCase();
        starsShouldRun = false;

        // hide them all
        selector( '.WebWindowArea div', ).each( item => {
            item.style.display = 'none';
        } );

        const wc = document.getElementById( 'welcome-content' );
        selector( '.WebWindowArea div', wc ).each( item => {
            item.style.display = 'block';
        } );

        if ( item === 'home' ) {
            starsShouldRun = true;
            canvasRef.setBackgroundColor( 'black' );
            const canvasContainer = selector( '#canvas-container' ).get( 0 );
            canvasContainer.style.display = 'block';
        } else if ( item === 'resume' ) {
            loadResume();
        } else {
            // unti lwe implement the rest of the ui items
            starsShouldRun = true;
            canvasRef.setBackgroundColor( 'black' );
            const canvasContainer = selector( '#canvas-container' ).get( 0 );
            canvasContainer.style.display = 'block';
        }
    } );
} );
