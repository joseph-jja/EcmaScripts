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

                    if ( black ) {
                        for ( let p = 0, end = black.length; p < end; p++ ) {
                            canvasRef.circle( black[ p ].x, black[ p ].y, black[ p ].radius, {
                                color: black[ p ].color,
                                fillStrokeClear: 'fill'
                            } );
                        }
                    }
                    if ( white ) {
                        for ( let p = 0, end = white.length; p < end; p++ ) {
                            canvasRef.circle( white[ p ].x, white[ p ].y, white[ p ].radius, {
                                color: white[ p ].color,
                                fillStrokeClear: 'fill'
                            } );
                        }
                    }

                    if ( blackPlanet ) {
                        for ( let p = 0, end = blackPlanet.length; p < end; p++ ) {
                            canvasRef.circle( blackPlanet[ p ].x, blackPlanet[ p ].y, blackPlanet[ p ].radius, {
                                color: blackPlanet[ p ].color,
                                fillStrokeClear: 'fill'
                            } );
                        }
                    }
                    if ( shownPlanet ) {
                        for ( let p = 0, end = shownPlanet.length; p < end; p++ ) {
                            canvasRef.circle( shownPlanet[ p ].x, shownPlanet[ p ].y, shownPlanet[ p ].radius, {
                                color: shownPlanet[ p ].color,
                                fillStrokeClear: 'fill'
                            } );
                        }
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
