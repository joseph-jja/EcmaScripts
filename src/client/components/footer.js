import * as dom from "client/dom/DOM";
import df from "utils/dateFunctions";
import {
    exists
} from "utils/typeCheck";

// destructing
const {
    weekDayShortNames,
    monthShortNames
} = df;

function formatDate( dateObj ) {

    const dayOfTheWeek = weekDayShortNames[ dateObj.getDay() ],
        month = monthShortNames[ dateObj.getMonth() ];

    return `${dayOfTheWeek}, ${month} ${dateObj.getDate()}, ${dateObj.getFullYear()}`;
}

function getLastModifiedDate() {

    // last modified date
    if ( exists( document.lastModified ) && document.lastModified.length > 0 ) {
        // convert to a date
        const moddate = Date.parse( document.lastModified );

        const mdate = new Date();
        mdate.setTime( moddate );

        // return formatted our way
        return formatDate( mdate );
    }
    return '';
}

function createFooter() {
    const dt = new Date();

    const daynow = formatDate( dt );

    let buildFooter = `<div class="footer-column">Today is ${daynow}.</div>`;

    const lastmoddate = getLastModifiedDate();

    if ( lastmoddate.length > 0 ) {

        // display the date
        buildFooter = buildFooter + `<div class="footer-column">Last modified on ${lastmoddate}.</div>`;
    }

    buildFooter = buildFooter + `<div class="footer-column">Copyright ${dt.getFullYear()}.</div>`;

    return buildFooter;
}

export default function setFooter( footerParent ) {
    let ft;
    if ( footerParent ) {
        ft = dom.createElement( "div", footerParent, {
            'id': 'footer-container'
        } );
        if ( ft ) {
            ft.innerHTML = createFooter();
        }
    }
    // users with no query selector all go to home page to get nasty message
    if ( typeof document.querySelectorAll === 'undefined' ) {
        let loc = window.location.pathname;
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
