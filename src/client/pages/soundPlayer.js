import "@babel/runtime/regenerator";

import selector from '/js/client/dom/selector';
import * as events from '/js/client/dom/events';
import * as dom from '/jsclient/dom/DOM';

import {
	MakeSound
} from '/js/client/midi/sounds.js';

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

async function doOnLoadStuff() {



}

events.addOnLoad( doOnLoadStuff );

