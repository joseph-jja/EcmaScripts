import "@babel/runtime/regenerator";

import * as events from 'client/dom/events';
import WebWindow from 'client/components/wbWindow';
import * as colorTable from 'client/components/colorTable';

function getMainWindow() {
    const mw = document.getElementById( 'main-window' );
    const styles = window.getComputedStyle( mw );

    return new WebWindow( 'RGB Color Table',
        styles.offsetLeft,
        styles.offsetTop,
        styles.offsetWidth,
        styles.offsetHeight,
        'main-window' );
}

function showColor( e ) {
    const tgt = e.target;
    const nName = tgt.nodeName.toLowerCase();
    if ( nName === 'span' ) {
        alert( tgt.dataset.hexcode );
    } else {
        alert( tgt.firstChild );
    }
}

async function doOnloadStuff() {

    const colors = colorTable.getHex();
    const wwin = getMainWindow();

    const content = wwin.windowArea;

    let results = '<table>';
    for ( let i = 0, end = colors.length; i < end; i++ ) {
        const color = colors[ i ];
        if ( i % 64 === 0 ) {
            if ( i > 64 ) {
                results += '</tr>';
            }
            results += '<tr>';
        }
        results += `<td><span style="background-color: ${color}" data-hexcode="${color}">&nbsp;&nbsp;&nbsp;</span></td>`;
    }
    results += '</tr></table>';

    content.innerHTML = results;
    events.addEvent( wwin.windowArea, 'click', showColor, false );

}

events.addOnLoad( doOnloadStuff );
