import "@babel/runtime/regenerator";

import WebWindow from 'client/components/wbWindow';
import colorTable from 'client/components/colorTable';

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

    const colors = colorTable.getHex();
    const wwin = getMainWindow();

    const content = wwin.windowArea;

    let results = '';
    for ( const color of colors ) {
        results += `<div><span style="background-color: ${color}">&nbsp;&nbsp;&nbsp;</:wqspan>${color}</div>`;
    }

    content.innerHTML = results;
}

events.addOnLoad( doOnloadStuff );
