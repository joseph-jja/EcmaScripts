import * as dom from "client/dom/DOM";
import df from "commonUtils/dateFunctions";

function createFooter() {
    var monthNM, dayOfTheWeek,
        dt = new Date(),
        lastmoddate, buildFooter = "",
        moddate, ampm,
        monthstring, today, daynow;

    dayOfTheWeek = dt.weekDayShortNames;
    monthNM = dt.monthShortNames;

    // last modified date
    lastmoddate = Date.parse( document.lastModified );

    if ( ( lastmoddate !== undefined ) && ( lastmoddate !== 0 ) ) {
        // the document.lastModified returns time in EST 
        // this will convert the time to PST as that is where I live
        moddate = new Date( lastmoddate - 3600 );

        // find out if that was AM or PM as we want 12 hour clock not 24
        ampm = ( moddate.getHours() > 12 ) ? " PM PST" : " AM PST";

        // this is the string that displays the month
        monthstring = dayOfTheWeek[ moddate.getDay() ] + ", " + monthNM[ moddate.getMonth() ] + " " + moddate.getDate() + ", " + moddate.getFullYear();
        // + " at " +  moddate.getHours() + ":" + moddate.getMinutes() + ":" + moddate.getSeconds(); 

        // display the date
        buildFooter = buildFooter + "<li>";
        buildFooter = buildFooter + "Last modified on " + monthstring + ".";
        buildFooter = buildFooter + "</li>";
    }
    daynow = dayOfTheWeek[ dt.getDay() ] + ", " + monthNM[ dt.getMonth() ] + " " + dt.getDate() + ", " + dt.getFullYear();

    buildFooter = buildFooter + "<li>";
    buildFooter = buildFooter + "Today is " + daynow;
    buildFooter = buildFooter + "</li>";

    buildFooter = buildFooter + "<li>";
    buildFooter = buildFooter + "Copyright " + dt.getFullYear();
    buildFooter = buildFooter + "</li>";

    return buildFooter;
}
export default function setFooter( footerParent ) {
    var loc, ft;
    if ( footer ) {
        ft = dom.createElement( "ul", footerParent );
        if ( ft ) {
            ft.innerHTML = createFooter();
        }
    }
    // users with no query selector all go to home page to get nasty message
    if ( typeof document.querySelectorAll === 'undefined' ) {
        loc = window.location.pathname;
        loc = loc.substring( loc.lastIndexOf( "/" ) );

        // fish page 
        if ( loc.indexOf( "fish_pictures" ) !== -1 ) {
            // return to home page
            window.location.href = "../";
        } else if ( loc.indexOf( "index.html" ) === -1 && loc !== "/" ) {
            window.location.href = "index.html";
        }
    }
}
