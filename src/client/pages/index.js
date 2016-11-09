// libs first 
import * as dom from 'client/dom/DOM';
import * as events from 'client/dom/events';

// default libs
import detect from 'client/browser/detect';

// components
import footer from 'client/components/footer';
import * as menu from 'client/components/menu';
import {
    DigitalClock
} from 'client/components/clocks';
import Calendar from 'client/components/calendar';

// TODO clean up this detection stuff
// code 
var detected,
    capabilities = '',
    dt = detect();

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
    var myclock = new DigitalClock();
    myclock.setId( "digiclock" );
    myclock.startClock();

    let cal = new Calendar( "calendarContainer" );
    cal.render();

    dom.html( "#cautionContent", capabilities + detected );
    menu.basicMenu();
    footer( 'footer' );
} );
