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
    canvasRef = canvas.create( 'star-system', 'canvas-container', 350, 350 );

    // make canvas black
    canvasRef.setBackgroundColor( 'black' );
}

let hasMeasured = false;

function startStarSystem() {

    if ( starSystemWorker ) {
        // make canvas black
        canvasRef.setBackgroundColor( 'black' );

        starSystemWorker.onmessage = ( msg ) => {

            requestAnimationFrame( () => {

                if ( msg.data.stars ) {
                    const msgData = msg.data,
                        stars = msgData.stars,
                        planets = msgData.planets;

                    const starsList = Object.keys( stars ).map( item => {
                        return stars[ item ];
                    } ).reduce( ( acc, next ) => {
                        return acc.concat( next );
                    } );

                    const planetsList = Object.keys( planets ).map( item => {
                        return planets[ item ];
                    } ).reduce( ( acc, next ) => {
                        return acc.concat( next );
                    } );

                    const starsNPlanets = Array.from( starsList ).concat( Array.from( planetsList ) );
                    starsNPlanets.forEach( item => {
                        canvasRef.circle( item.x, item.y, item.radius, {
                            color: item.color,
                            fillStrokeClear: 'fill'
                        } );
                    } );
                    if ( perf.hasPerformanceMetrics && !hasMeasured ) {
                        performance.measure( 'binary star system render' );
                        hasMeasured = true;
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
