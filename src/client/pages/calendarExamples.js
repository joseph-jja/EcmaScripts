import * as events from 'client/dom/events';

// default libs
import detect from 'client/browser/userAgentParser';

// components
import Calendar from 'client/components/calendar';

// TODO clean up this detection stuff
// code
const dt = detect();

let capabilities = "WARNING: Your browser version information was detected from useragent string only or not at all! ";
capabilities += "<br />If you have problems viewing this site, please get a supported browser.";

let detected = 'Detected Name = ' + dt.uaName + ' ' + dt.uaVersion + '.';
detected += '<br /><br />for = ' + dt.uaOS + '.';

var cal1, cal2, cal3;

function doSomeLoadStuff() {

    cal1 = new Calendar( "xcal1" );
    cal1.render();
    cal2 = new Calendar( "xcal2" );
    cal2.render();
    cal3 = new Calendar( "xcal3" );
    cal3.render();
}

function getSelectedCalendar() {
    var calname = "";
    var wcals = document.main.wcal;
    for ( let i = 0; i < wcals.length; i++ ) {
        if ( wcals[ i ].checked ) {
            calname = wcals[ i ].value;
        }
    }
    var cal = "";
    switch ( calname ) {
    case "xcal2":
        cal = cal2;
        break;
    case "xcal3":
        cal = cal3;
        break;
    default:
        cal = cal1;
        break;
    }
    return cal;
}

events.addOnLoad( () => {
    doSomeLoadStuff();
    document.getElementById( 'detected' ).innerHTML = capabilities + detected;

    events.addEvent( document.getElementById( 'getDateID' ), 'click', () => {
        var cname = getSelectedCalendar();
        document.main.newdate.value = cname.getCalendarDate();
    } );

    events.addEvent( document.getElementById( 'setDateID' ), 'click', () => {
        var cname = getSelectedCalendar();

        var m = new Number( document.main.newmonth.value ) - 1;
        var d = new Number( document.main.newday.value );
        var y = document.main.newyear.value;
        if ( ( m >= 0 ) && ( m < 12 ) && ( d > 0 ) && ( y > 0 ) ) {
            try {
                cname.setCalendarDate( m, d, y );
            } catch ( e ) {
                alert( e );
            }
        } else {
            alert( "You must specify a month, day, and year." );
        }
    } );
} );
