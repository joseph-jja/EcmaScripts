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


    let data = '<table>';
    data += '<tr>';
    data += '<th>Decimal</th>';
    data += '<th>Character</th>';
    data += '<th>Hexidecimal</th>';
    data += '<th>Octal</th>';
    data += '<th>Binary</th>';
    data += '</tr>';
    for ( let i = 0, end = results.length; i < end; i++ ) {
        data += '<tr>';
        data += `<td>${results.decimal}</td>`;
        data += `<td>${results.character}</td>`;
        data += `<td>${results.hex}</td>`;
        data += `<td>${results.octal}</td>`;
        data += `<td>${results.binary}</td>`;
        data += '</tr>';
    }
    data += '<table>';

    content.innerHTML = data;
}

events.addOnLoad( doOnloadStuff );
