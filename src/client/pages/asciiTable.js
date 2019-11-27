import "@babel/runtime/regenerator";

import * as events from 'client/dom/events';
import WebWindow from 'client/components/wbWindow';
import asciiTable from 'client/components/asciiTable';

function getMainWindow() {
    const mw = document.getElementById( 'main-window' );
    const styles = window.getComputedStyle( mw );

    return new WebWindow( 'Quake Info',
        styles.offsetLeft,
        styles.offsetTop,
        styles.offsetWidth,
        styles.offsetHeight,
        'main-window' );
}

async function doOnloadStuff() {

    const results = asciiTable.results;
    const wwin = getMainWindow();

    const content = wwin.windowArea;

    content.innerHTML = results;
}

events.addOnLoad( doOnloadStuff );
