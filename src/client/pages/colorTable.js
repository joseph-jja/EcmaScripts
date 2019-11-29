import "@babel/runtime/regenerator";

import * as events from 'client/dom/events';
import WebWindow from 'client/components/wbWindow';
import colorTable from 'client/components/colorTable';

function getMainWindow() {
    const mw = document.getElementById( 'main-window' );
    const styles = window.getComputedStyle( mw );

    return new WebWindow( 'Color Table',
        styles.offsetLeft,
        styles.offsetTop,
        styles.offsetWidth,
        styles.offsetHeight,
        'main-window' );
}

async function doOnloadStuff() {

    const colors = colorTable.getHex();
    const wwin = getMainWindow();

    const content = wwin.windowArea;

    let results = '';
    for ( let i = 0, end = colors.length; i < end; i++ ) {
        const color = colors[ i ];
        results += `<div><span style="background-color: ${color}">&nbsp;&nbsp;&nbsp;</span>${color}</div>`;
    }

    content.innerHTML = results;
}

events.addOnLoad( doOnloadStuff );
