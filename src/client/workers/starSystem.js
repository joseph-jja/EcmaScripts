import {
    add,
    divide,
    getRectangleCenter,
    getRectangleCorner,
    distanceBetweenCirclesCenters,
    square
} from 'utils/mathFunctions';

import {
    CelestialBody,
    Star
} from 'client/space/celestialMath';

const timeout = 100;

let center,
    timerID;

onmessage = ( msg ) => {

    if ( msg && msg.data && msg.data.setWidthHeight ) {
        const width = msg.data.setWidthHeight[ 0 ],
            height = msg.data.setWidthHeight[ 1 ];

        center = getRectangleCenter( width, height );

        const orbitalRadius = divide( getRectangleCorner( width, height ), 1.25 );

        // stars
        const bigStar = new Star( '#FDB813', 24, {
            direction: 'counterClockwise',
            startAngle: 180,
            xRadius: orbitalRadius,
            isFixedCenter: true,
            centerPoints: center
        } );

        const smallerStar = new Star( '#FDB813', 18, {
            direction: 'counterClockwise',
            startAngle: 0,
            xRadius: orbitalRadius,
            isFixedCenter: true,
            centerPoints: center
        } );

        const stars = [
            bigStar.getVisablePosition( center ),
            smallerStar.getVisablePosition( center )
        ];

        // planets
        const planetRadius = Math.floor( divide( orbitalRadius, ( width > 600 ? 3 : 1.65 ) ) );
        const smallPlanet = new CelestialBody( '#17e3ea', 3, {
            direction: 'counterClockwise',
            startAngle: 90,
            speed: 5
        } );
        smallPlanet.setupPoints( planetRadius );

        const planetTwo = new CelestialBody( '#17e3ea', 7, {
            direction: 'counterClockwise',
            startAngle: 180,
            speed: 3
        } );
        const pradius = add( planetRadius, ( width > 600 ? 28 : 17 ) );
        const xradius = add( pradius, ( width > 600 ? 50 : 8 ) );
        planetTwo.setupPoints( pradius, xradius );

        const planetThree = new CelestialBody( '#17e3ea', ( width > 600 ? 6 : 0 ), {
            direction: 'counterClockwise',
            startAngle: 270,
            speed: 1
        } );
        const ePradius = add( orbitalRadius, 75 );
        const exradius = add( ePradius, 55 );
        planetThree.setupPoints( ePradius, exradius );

        const planet = [ smallPlanet.getVisablePosition( stars[ 0 ] ) ],
            sPlanet = [ planetTwo.getVisablePosition( stars[ 0 ] ) ],
            ePlanet = [ planetThree.getVisablePosition( stars[ 0 ] ) ];

        postMessage( {
            stars: {
                white: stars
            },
            planets: {
                shownPlanet: planet.concat( sPlanet, ePlanet )
            }
        } );

        timerID = setInterval( () => {

            const bigStarNext = bigStar.getNextPosition();
            const black = [
                bigStarNext.hidden,
                smallerStar.getHiddenPosition( center )
            ];
            const blackPlanets = [
                smallPlanet.getHiddenPosition( black[ 0 ] ),
                planetTwo.getHiddenPosition( black[ 0 ] ),
                planetThree.getHiddenPosition( black[ 0 ] )
            ];

            // increment stars
            smallerStar.increment();

            // increment planets
            smallPlanet.increment();
            planetTwo.increment();
            planetThree.increment();

            const white = [
                bigStarNext.visable,
                smallerStar.getCurrentPosition( center, true )
            ];
            const whitePlanets = [
                smallPlanet.getVisablePosition( white[ 0 ] ),
                planetTwo.getVisablePosition( white[ 0 ] ),
                planetThree.getVisablePosition( white[ 0 ] )
            ];

            // check if 2 circles intersect
            const mfCentersDistance = distanceBetweenCirclesCenters( whitePlanets[ 1 ].x, whitePlanets[ 1 ].y, whitePlanets[ 2 ].x, whitePlanets[ 2 ].y );
            const centersDistance = Math.ceil( square( mfCentersDistance ) );

            // radius + 5 in case they are near
            const radiusIntersect = square( add( 7, 6 ) ),
                radiusClose = square( add( 7, 5, 6, 5 ) );

            // touch
            if ( centersDistance === radiusIntersect ) {
                console.log( 'Touching %s %s %s %s', whitePlanets[ 1 ].x, whitePlanets[ 1 ].y, whitePlanets[ 2 ].x, whitePlanets[ 2 ].y );
            }
            if ( centersDistance === radiusClose ) {
                console.log( 'Close touching %s %s %s %s', whitePlanets[ 1 ].x, whitePlanets[ 1 ].y, whitePlanets[ 2 ].x, whitePlanets[ 2 ].y );
            }
            // intersect
            if ( centersDistance < radiusIntersect ) {
                console.log( 'Intersecting %s %s %s %s', whitePlanets[ 1 ].x, whitePlanets[ 1 ].y, whitePlanets[ 2 ].x, whitePlanets[ 2 ].y );
            }
            if ( centersDistance < radiusClose ) {
                console.log( 'Close intersecting %s %s %s %s', whitePlanets[ 1 ].x, whitePlanets[ 1 ].y, whitePlanets[ 2 ].x, whitePlanets[ 2 ].y );
            }

            postMessage( {
                stars: {
                    black,
                    white
                },
                planets: {
                    blackPlanet: blackPlanets,
                    shownPlanet: whitePlanets
                }
            } );

        }, timeout );
    } else if ( msg && msg.data && msg.data.stop ) {
        clearInterval( timerID );
    }
};
