import "@babel/runtime/regenerator";
import selector from 'client/dom/selector';
import * as events from 'client/dom/events';
import * as dom from 'client/dom/DOM';
import fetcher from 'client/net/fetcher';

// components
import StationList from 'client/components/bart/stationsUI';
import TrainList from 'client/components/bart/trainsUI';
import Alerts from 'client/components/bart/alertUI';
import footer from 'client/components/footer';
import * as menu from 'client/components/menu';

// window
import WebWindow from 'client/components/wbWindow';

function getMainWindow() {
    const mw = document.getElementById( 'main-window' );
    const styles = window.getComputedStyle( mw );

    return new WebWindow( 'BART Info',
        styles.offsetLeft,
        styles.offsetTop,
        styles.offsetWidth,
        styles.offsetHeight,
        'main-window' );

}

async function buildNav() {
    const navFrag = '/frags/bart-nav.frag';
    const navData = await fetcher( navFrag );

    const menu = document.getElementById( 'menu' );
    menu.innerHTML = navData.replace( /\n/g, '' );
}

async function doOnLoadStuff() {

    const stationData = await StationList();

    const wwin = getMainWindow();

    const content = wwin.windowArea;

    const rdiv = dom.createElement( 'div', content, {
        id: 'slist'
    } );

    const ldiv = dom.createElement( 'div', content, {
        id: 'tlist'
    } );

    // get dom node to put this data in and inner html it
    rdiv.innerHTML = stationData;

    // the add event listener
    const stationClick = async function ( e ) {
        const tgt = events.getTarget( e );

        if ( !tgt ) {
            return;
        }

        if ( tgt.nodeName.toUpperCase() !== 'DIV' ) {
            return;
        }

        if ( !tgt.attributes[ 'data-abbr' ] ) {
            return;
        }

        const selectedStation = tgt.attributes[ 'data-abbr' ].value;
        const listOfTrains = await TrainList( selectedStation );
        ldiv.innerHTML = listOfTrains;

    };
    events.addEvent( content, 'click', stationClick );

    const alertButtonClick = async function ( e ) {
        const alertList = await Alerts();
        ldiv.innerHTML = alertList;
    };

    await buildNav();
    const dropdown = selector( '.url-wrapper select' ).get( 0 );
    events.addEvent( dropdown, 'change', ( e ) => {
        const evt = events.getEvent( e );
        const tgt = events.getTarget( evt );
        const item = tgt.options[ tgt.selectedIndex ].text.toLowerCase();

        switch ( item ) {
        case 'alerts':
            alertButtonClick();

            break;
        default:
            break;
        }
    } );
}

events.addOnLoad( doOnLoadStuff );
