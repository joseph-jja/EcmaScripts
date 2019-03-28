// libs first
import * as dom from 'client/dom/DOM';
import * as events from 'client/dom/events';
import selector from 'client/dom/selector';

// default libs
import detect from 'client/browser/detect';

// components
import footer from 'client/components/footer';
//import * as menu from 'client/components/menu';
import {
    DigitalClock
} from 'client/components/clocks';
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

events.addOnLoad( () => {
    const myclock = new DigitalClock();
    myclock.setId( "digiclock" );
    myclock.startClock();

    footer( document.querySelectorAll( 'footer' )[ 0 ] );

    const calendarButton = selector( 'footer ul li:first-child' );
    events.addEvent( calendarButton.get( 0 ), 'click', ( e ) => {

        // get footer
        const footerObj = selector( 'footer' ).get( 0 );

        // figure out the height
        const computedStyles = window.getComputedStyle( footerObj );
        const topOfFooter = computedStyles.top;

        // body for new element
        const body = document.querySelector( 'body' );

        // calendar stuff here
        const calendarContainer = dom.createElement( 'div', body, {
            id: 'calendar-container',
            'zIndex': 5
        } );
        const cal = new Calendar( calendarContainer.id );
        cal.render();

        // reposition stuff here
        const calHeight = window.getComputedStyle( calendarContainer, 'height' );
        const repositionPX = parseInt( topOfFooter ) - parseInt( calHeight );
        calendarContainer.style.top = repositionPX + 'px';

    } );

    //dom.html( "#cautionContent", capabilities + detected );
    //menu.basicMenu();
} );
