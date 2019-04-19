import * as dom from 'client/dom/DOM';
import selector from 'client/dom/selector';
import fetcher from 'client/net/fetcher';

import {
    exists
} from 'utils/typeCheck';

//mouth.attributes.ry.value = y;
//omouth.attributes.ry.value = y-4;

let fishInfoWorker;

function setupFishInfo() {
    fishInfoWorker = exists( Worker ) ? new Worker( '/js/animatedFish.js' ) : undefined;
}

function startFishInfo() {

    if ( !fishInfoWorker ) {
        setupFishInfo();
    }

    if ( fishInfoWorker ) {
        const homeContent = selector( '#welcome-content' );
        const displayWindow = selector( '.WebWindowArea', homeContent );

        Array.toArray( displayWindow.childNodes ).forEach( item => {
            item.style.display = 'none';
        } );

        const animFishContainer = dom.createElement( 'div', displayWindow, {
            id: 'animated-fish'
        } );

        fishInfoWorker.onmessage = ( msg ) => {

        };
        fishInfoWorker.postMessage( {
            'start': 'start'
        } );
    }
}

function stopFishInfo() {
    if ( fishInfoWorker ) {
        fishInfoWorker.postMessage( {
            'stop': 'stop'
        } );
    }
}

export {
    startFishInfo,
    stopFishInfo
};
