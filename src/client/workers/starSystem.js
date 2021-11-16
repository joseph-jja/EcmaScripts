import {
    add,
    divide,
    getRectangleCenter,
    getRectangleCorner
} from 'utils/mathFunctions';

import {
    Star,
    Planet
} from 'client/components/space/celestialBody';

const timeout = 100;

let center,
    timerID;

function getStars( center, orbitalRadius, yOribialRadius ) {

    return [ new Star( {
        color: '#FDB813',
        radius: 20,
        direction: 'counterClockwise',
        startAngle: 180,
        xRadius: orbitalRadius,
        yRadius: yOribialRadius,
        isFixedCenter: true,
        centerPoints: center
    } ), new Star( {
        color: '#FDB813',
        radius: 14,
        direction: 'counterClockwise',
        startAngle: 0,
        xRadius: orbitalRadius,
        yRadius: yOribialRadius,
        isFixedCenter: true,
        centerPoints: center
    } ) ];
}

onmessage = ( msg ) => {

    if ( msg && msg.data && msg.data.setWidthHeight ) {
        const width = msg.data.setWidthHeight[ 0 ],
            height = msg.data.setWidthHeight[ 1 ];

        center = getRectangleCenter( width, height ); // [175, 175]

        const corner = getRectangleCorner( width, height );
        const orbitalRadius = Math.ceil( divide( corner, 1.35 ) );

        // stars
        const gstars = getStars( center, orbitalRadius, orbitalRadius );
        const bigStar = gstars[ 0 ],
            smallerStar = gstars[ 1 ];

        const stars = [
            bigStar.getInitialPosition(),
            smallerStar.getInitialPosition()
        ];

        // planets
        const planetRadius = Math.floor( divide( orbitalRadius, 1.65 ) );
        const smallPlanet = new Planet( {
            color: '#17e3ea',
            radius: 3,
            direction: 'counterClockwise',
            startAngle: 90,
            speed: 5,
            parentStar: bigStar,
            xRadius: planetRadius
        } );

        const pradius = add( planetRadius, 17 );
        const xradius = add( pradius, 8 );
        const planetTwo = new Planet( {
            color: '#17e3ea',
            radius: 7,
            direction: 'counterClockwise',
            startAngle: 180,
            speed: 3,
            parentStar: bigStar,
            xRadius: pradius,
            yRadius: xradius
        } );

        const ePradius = add( orbitalRadius, 25 );
        const exradius = add( ePradius, 15 );
        const planetThree = new Planet( {
            color: '#17e3ea',
            radius: 5,
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
