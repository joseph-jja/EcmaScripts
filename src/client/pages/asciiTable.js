import "@babel/runtime/regenerator";

import * as events from 'client/dom/events';
import WebWindow from 'client/components/wbWindow';
import * as asciiTable from 'client/components/asciiTable';

function getMainWindow() {
    const mw = document.getElementById( 'main-window' );
    const styles = window.getComputedStyle( mw );

    return new WebWindow( 'ASCII Table',
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

    let data = '<table>';
    data += '<tr>';
    data += '<th>Decimal</th>';
    data += '<th>Character</th>';
    data += '<th>Hexidecimal</th>';
    data += '<th>Octal</th>';
    data += '<th>Binary</th>';
    data += '</tr>';
    for ( let i = 0, end = results.length; i < end; i++ ) {

        if ( i === 128 ) {
            data += '</table>';
            data += '<table>';
            data += '<tr>';
            data += '<th>Decimal</th>';
            data += '<th>Hexidecimal</th>';
            data += '<th>Octal</th>';
            data += '<th>Binary</th>';
            data += '</tr>';
        }
        const item = results[ i ];
        data += `<tr class="${ i % 2 === 0 ? 'even' : 'odd' }">`;
        data += `<td>${item.decimal}</td>`;
        data += ( i < 128 ? `<td>${item.character}</td>` : '' );
        data += `<td>${item.hex}</td>`;
        data += `<td>${item.octal}</td>`;
        data += `<td>${item.binary}</td>`;
        data += '</tr>';
    }
    data += '</table>';
    //console.log( data );
    content.innerHTML = data;
}

events.addOnLoad( doOnloadStuff );
