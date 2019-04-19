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
        const homeContent = selector( '#welcome-content' ).get( 0 );
        const displayWindow = selector( '.WebWindowArea', homeContent ).get( 0 );

        Array.from( displayWindow.childNodes ).forEach( item => {
            if ( item.nodeName.toLowerCase() === 'div' ) {
                item.style.display = 'none';
            }
        } );

        const animFishContainer = dom.createElement( 'div', displayWindow, {
            id: 'animated-fish'
        } );

        fetcher( 'frags/fish-svg.frag' )
            .then( data => {

                animFishContainer.innerHTML = data;
                const parts = selector( 'ellipse', animFishContainer );

                const mouth = parts[ 0 ].attributes.ry,
                    omouth = parts[ 1 ].attributes.ry;

                fishInfoWorker.onmessage = ( msg ) => {
                    if ( msg && msg.data ) {
                        mouth.value = msg.data.mouth;
                        omouth.value = msg.data.omouth;
                    }
                };
                fishInfoWorker.postMessage( {
                    'start': 'start'
                } );
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
