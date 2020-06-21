import * as dom from 'client/dom/DOM';
import * as perf from 'client/browser/performance';

import {
    exists
} from 'utils/typeCheck';

// canvas
import * as canvas from 'client/components/canvas';

const screenWidth = dom.screen.maxx();

let starSystemWorker,
    canvasRef,
    tristarSystemWorker,
    tricanvasRef;

function getWorker( filename ) {
    return exists( Worker ) ? new Worker( filename ) : undefined;
}

function setupStarSystem() {

    starSystemWorker = getWorker( '/js/starSystem.js' );
    canvasRef = canvas.create( 'star-system', 'canvas-container', 350, 350 );

    tristarSystemWorker = getWorker( '/js/triStarSystem.js' );
    tricanvasRef = canvas.create( 'tristar-system', 'canvas-container', 350, 350 );

    // make canvas black
    canvasRef.setBackgroundColor( 'black' );
    tricanvasRef.setBackgroundColor( 'black' );
}

let hasMeasured = false;


function handleMessage( msg, canvasObj ) {

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
                canvasObj.circle( item.x, item.y, item.radius, {
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

function startStarSystem() {

    if ( starSystemWorker ) {
        // make canvas black
        canvasRef.setBackgroundColor( 'black' );

        starSystemWorker.onmessage = ( msg ) => {
            handleMessage( msg, canvasRef );
        };
        starSystemWorker.postMessage( {
            'setWidthHeight': [ canvasRef.width, canvasRef.height ]
        } );
    }

    if ( tristarSystemWorker ) {
        // make canvas black
        tricanvasRef.setBackgroundColor( 'black' );

        tristarSystemWorker.onmessage = ( msg ) => {
            handleMessage( msg, tricanvasRef );
        };
        tristarSystemWorker.postMessage( {
            'setWidthHeight': [ tricanvasRef.width, tricanvasRef.height ]
        } );
    }
}

function stopStarSystem() {
    if ( starSystemWorker ) {
        starSystemWorker.postMessage( {
            'stop': 'stop'
        } );
    }
    if ( tristarSystemWorker ) {
        tristarSystemWorker.postMessage( {
            'stop': 'stop'
        } );
    }
}

export {
    setupStarSystem,
    startStarSystem,
    stopStarSystem
};
