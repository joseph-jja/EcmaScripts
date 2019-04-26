import * as dom from 'client/dom/DOM';

import {
    exists
} from 'utils/typeCheck';

// canvas
import * as canvas from 'client/components/canvas';

const screenWidth = dom.screen.maxx();

let starSystemWorker,
    canvasRef;

function setupStarSystem() {

    starSystemWorker = exists( Worker ) ? new Worker( '/js/starSystem.js' ) : undefined;
    if ( screenWidth > 800 ) {
        canvasRef = canvas.create( 'star-system', 'canvas-container', 800, 600 );
    } else {
        canvasRef = canvas.create( 'star-system', 'canvas-container', 250, 250 );
    }

    // make canvas black
    canvasRef.setBackgroundColor( 'black' );
}

function startStarSystem() {

    if ( starSystemWorker ) {
        // make canvas black
        canvasRef.setBackgroundColor( 'black' );

        starSystemWorker.onmessage = ( msg ) => {

            requestAnimationFrame( () => {

                if ( msg.data.stars ) {
                    const stars = msg.data.stars,
                        black = stars.black,
                        white = stars.white,
                        planets = msg.data.planets,
                        shownPlanet = planets.shownPlanet,
                        blackPlanet = planets.blackPlanet;

                    // because we want them done in order
                    [ black, white, blackPlanet, shownPlanet ].forEach( ( item ) => {
                        if ( item ) {
                            for ( let p = 0, end = item.length; p < end; p++ ) {
                                canvasRef.circle( item[ p ].x, item[ p ].y, item[ p ].radius, {
                                    color: item[ p ].color,
                                    fillStrokeClear: 'fill'
                                } );
                            }
                        }
                    } );
                }
            } );
        };
        starSystemWorker.postMessage( {
            'setWidthHeight': [ canvasRef.width, canvasRef.height ]
        } );
    }
}

function stopStarSystem() {
    if ( starSystemWorker ) {
        starSystemWorker.postMessage( {
            'stop': 'stop'
        } );
    }
}

export {
    setupStarSystem,
    startStarSystem,
    stopStarSystem
};
