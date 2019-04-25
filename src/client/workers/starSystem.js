import {
    add,
    divide,
    getRectangleCenter,
    getRectangleCorner,
    distanceBetweenCirclesCenters,
    square
} from 'utils/mathFunctions';

import {
    Star,
    Planet
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
        const smallPlanet = new Planet( '#17e3ea', 3, {
            direction: 'counterClockwise',
            startAngle: 90,
            speed: 5,
            parentStar: bigStar,
            xRadius: planetRadius
        } );

        const pradius = add( planetRadius, ( width > 600 ? 28 : 17 ) );
        const xradius = add( pradius, ( width > 600 ? 50 : 8 ) );
        const planetTwo = new Planet( '#17e3ea', 7, {
            direction: 'counterClockwise',
            startAngle: 180,
            speed: 3,
            parentStar: bigStar,
            xRadius: pradius,
            yRadius: xradius
        } );

        const ePradius = add( orbitalRadius, 75 );
        const exradius = add( ePradius, 55 );
        const planetThree = new Planet( '#17e3ea', ( width > 600 ? 6 : 0 ), {
            direction: 'counterClockwise',
            startAngle: 270,
            speed: 1,
            xRadius: ePradius,
            yRadius: exradius
        } );

        const planets = [ smallPlanet.getVisablePosition( stars[ 0 ] ),
            planetTwo.getVisablePosition( stars[ 0 ] ),
            planetThree.getVisablePosition( stars[ 0 ] )
        ];

        postMessage( {
            stars: {
                white: stars
            },
            planets: {
                shownPlanet: planets
            }
        } );

        timerID = setInterval( () => {

            const bigStarNext = bigStar.getNextPosition(),
                smallerStarNext = smallerStar.getNextPosition();
            const black = [
                bigStarNext.hidden,
                smallerStarNext.hidden
            ];

            const sPlanetOne = smallPlanet.getNextPosition(),
                mPlanetTwo = planetTwo.getNextPosition();
            const blackPlanets = [
                sPlanetOne.hidden,
                mPlanetTwo.hidden,
                planetThree.getHiddenPosition( black[ 0 ] )
            ];

            // increment planets
            planetThree.increment();

            const white = [
                bigStarNext.visable,
                smallerStarNext.visable
            ];
            const whitePlanets = [
                sPlanetOne.visable,
                mPlanetTwo.visable,
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
