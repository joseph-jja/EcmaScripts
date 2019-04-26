import * as dom from 'client/dom/DOM';
import * as perf from 'client/browser/performance';

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
        canvasRef = canvas.create( 'star-system', 'canvas-container', 800, 700 );
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
                    // black items don't come the first time
                    // so we filter them out, then
                    // we reduce into 1 array
                    // finally render to canvas each item
                    [ black, white, blackPlanet, shownPlanet ].filter( item => {
                        if ( item ) {
                            return true;
                        }
                        return false;
                    } ).reduce( ( acc, item ) => {
                        return acc.concat( item );
                    } ).forEach( item => {
                        canvasRef.circle( item.x, item.y, item.radius, {
                            color: item.color,
                            fillStrokeClear: 'fill'
                        } );
                    } );
                    if ( perf.hasPerformanceMetrics ) {
                        performance.measure( 'binary star system render' );
                    }
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
