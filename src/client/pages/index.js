// libs first
import * as dom from 'client/dom/DOM';
import * as css from 'client/dom/CSS';
import * as events from 'client/dom/events';
import selector from 'client/dom/selector';
import fetcher from 'client/net/fetcher';
import * as perf from 'client/browser/performance';

// default libs
import detect from 'client/browser/userAgentParser';

// components
import footer from 'client/components/footer';

// clock
import {
    DigitalClock
} from 'client/components/clocks';

// calendar
import Calendar from 'client/components/calendar';

// resume parser
import resumeParser from 'client/components/resumeParser';

// star system
import {
    setupStarSystem,
    startStarSystem,
    stopStarSystem
} from 'client/metaPages/stellarSystems';

// fish information
import {
    startFishInfo,
    stopFishInfo
} from 'client/metaPages/fishInformation';

// window
import WebWindow from 'client/components/wbWindow';

let defaultPosition = {},
    isCalendarDisplayed = false,
    mainWin,
    sideWin;

let capabilities = '<br><div class="home-content">';
capabilities += 'Info pulled from your browsers user agent.';
capabilities += '<br />If you have problems viewing this site, please update your browser.';
capabilities += '<br />Spoofable OS = ' + detect.uaOS + ( detect.uaOSVersion ? '(' + detect.uaOSVersion + ')' : '' ) + '.';
capabilities += '<br />Spoofable Name - Version = ' + detect.uaName + ' - ' + detect.uaAppVersion;
capabilities += '<br />User Agent String = ' + navigator.userAgent + '.</div>';

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

    const resumeHTML = resumeParser( resumeData, {
        limitYear: true
    } );

    const resumeObj = dom.createElement( 'div', mainWin.windowArea, {
        id: 'resume-html'
    } );
    dom.html( resumeObj, resumeHTML );
    css.addClass( resumeObj, 'left-align' );
    resumeObj.style.display = 'block';

    const mwtitle = selector( '.WebWindowTitleText', mainWin.titleBar ).get( 0 );
    mwtitle.innerHTML = 'Resume';

    const swtitle = selector( '.WebWindowTitleText', sideWin.titleBar ).get( 0 );
    swtitle.innerHTML = 'Welcome';

    if ( perf.hasPerformanceMetrics ) {
        performance.measure( 'resume render' );
    }
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

    const sw = document.getElementById( 'welcome-content' );
    const swStyles = window.getComputedStyle( sw );

    sideWin = new WebWindow( 'Welcome',
        swStyles.offsetLeft,
        swStyles.offsetTop,
        swStyles.offsetWidth,
        swStyles.offsetHeight,
        'welcome-content' );
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
        if ( perf.hasPerformanceMetrics ) {
            performance.measure( 'calendar render' );
        }
    } else {
        const calReference = selector( '#calendar-container' ).get( 0 );
        calReference.style.display = 'none';
        isCalendarDisplayed = false;
    }
}

let softwareLoaded = false;
async function loadSoftwareFrag() {

    const frag = await fetcher( '/frags/software.frag' );

    const softwareObj = dom.createElement( 'div', mainWin.windowArea, {
        id: 'sofware-html'
    } );
    dom.html( softwareObj, frag );
    css.addClass( softwareObj, 'left-align' );
    softwareObj.style.display = 'block';

    const mwtitle = selector( '.WebWindowTitleText', mainWin.titleBar ).get( 0 );
    mwtitle.innerHTML = 'Programs';

    const linksObj = dom.createElement( 'div', sideWin.windowArea, {
        id: 'software-links'
    } );

    linksObj.style.display = 'block';
    linksObj.innerHTML = `In my spare time I work on the projects on this page. Some of them,
    I consider to be completed, like TkNotePad.
    These are are all released as 'Open Source'.
    These programs are provided as is and with no warranty expressed or implied!
        While I have tested them, I am not responsible
    for
    anything that might happen
    if you use them.
    They just might not work the way you
    think that they should! < br / >
        Please notify me
    if you intend to include any of this software as a part of any distribution or mirror site.Thank you!`;

    //<!--a href="email_form.html" >Email me with any questions or comments.< /a-->

    if ( perf.hasPerformanceMetrics ) {
        performance.measure( 'software render' );
    }
    softwareLoaded = true;
}

async function setupSoftware() {

    if ( !softwareLoaded ) {
        await loadSoftwareFrag();

        // onclick toggleUL setup
        let toplevel = selector( 'span.toplevel' );
        let i = 0,
            len = toplevel.length;

        for ( i = 0; i < len; i++ ) {
            // we know the DOM here
            let spanEle = toplevel.get( i );
            let liParent = spanEle.parentNode;
            let ulEle = selector( 'ul.tree_child_hidden', liParent ).get( 0 );
            events.addEvent( spanEle, 'click', () => {
                //toggleUL( ulEle.id, spanEle );
            }, false );
        }
    }
}

events.addOnLoad( async function () {

    // clock
    const myclock = new DigitalClock();
    myclock.setId( 'digiclock' );
    myclock.startClock();

    // footer
    footer( document.querySelectorAll( 'footer' )[ 0 ] );

    // setup windows and positions
    setDefaultPosition();

    // calendar setup
    const calendarButton = selector( 'footer ul li:first-child' );
    events.addEvent( calendarButton.get( 0 ), 'click', renderCalendar );

    setupStarSystem();
    startStarSystem();

    await buildNav();
    const indexData = await getIndex();
    sideWin.windowArea.innerHTML = indexData + capabilities;

    const dropdown = selector( '.url-wrapper select' ).get( 0 );
    events.addEvent( dropdown, 'change', ( e ) => {
        const evt = events.getEvent( e );
        const tgt = events.getTarget( evt );
        const item = tgt.options[ tgt.selectedIndex ].text.toLowerCase();

        // default the titles
        const mwtitle = selector( '.WebWindowTitleText', mainWin.titleBar ).get( 0 );
        mwtitle.innerHTML = 'Home - Not Mine Though';

        const swtitle = selector( '.WebWindowTitleText', sideWin.titleBar ).get( 0 );
        swtitle.innerHTML = 'Welcome';

        // hide divs
        Array.from( mainWin.windowArea.childNodes ).forEach( item => {
            if ( item.nodeName.toLowerCase() === 'div' ) {
                item.style.display = 'none';
            }
        } );

        Array.from( sideWin.windowArea.childNodes ).forEach( item => {
            if ( item.nodeName.toLowerCase() === 'div' ) {
                item.style.display = 'none';
            }
        } );

        stopStarSystem();
        stopFishInfo();
        switch ( item ) {
        case 'resume':
            loadResume();
            Array.from( sideWin.windowArea.childNodes ).forEach( item => {
                if ( item.nodeName.toLowerCase() === 'div' && css.hasClass( item, 'home-content' ) ) {
                    item.style.display = 'block';
                }
            } );
            break;
        case 'fish':
            mwtitle.innerHTML = 'Fish Information';
            swtitle.innerHTML = 'Animated Fish';
            startFishInfo();
            break;
        case 'software':
            mwtitle.innerHTML = 'Software';
            swtitle.innerHTML = 'Local Pages';
            loadSoftwareFrag();
            break;
        case 'home':
        default:
            Array.from( sideWin.windowArea.childNodes ).forEach( item => {
                if ( item.nodeName.toLowerCase() === 'div' && css.hasClass( item, 'home-content' ) ) {
                    item.style.display = 'block';
                }
            } );
            const canvasContainer = selector( '#canvas-container' ).get( 0 );
            canvasContainer.style.display = 'block';
            startStarSystem();
            break;
        }

    } );
} );
