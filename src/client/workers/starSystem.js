import {
    add,
    subtract,
    divide,
    multiply,
    getRectangleCenter,
    getRectangleCorner,
    getCurrentPosition,
    distanceBetweenCirclesCenters,
    getEllipsePoints,
    getCirclePoints,
    square
} from 'utils/mathFunctions';

const self = this,
    timeout = 100;

let center,
    timerID;

class CelestialBody {

    constructor( color, radius, options = {} ) {

        this.color = color || 'red';
        this.radius = radius || 5;
        this.hiddenRadius = add( this.radius, 1 );
        this.direction = options.direction && options.direction === 'clockwise' ? add : subtract;
        this.angle = options.startAngle || 0;
        this.speed = options.speed || 1;
    }

    setupPoints( xRadius = 30, yRadius ) {

        if ( xRadius !== yRadius && yRadius ) {
            this.points = getEllipsePoints( xRadius, yRadius );
        } else {
            this.points = getCirclePoints( xRadius );
        }
    }

    increment() {
        this.angle = this.direction( this.angle, this.speed );
        if ( this.angle < 0 ) {
            this.angle = 360;
        } else if ( this.angle > 360 ) {
            this.angle = 0;
        }
    }

    getCurrentPosition( centerPoints, isShown ) {

        return {
            x: ( this.direction( centerPoints.x, this.points[ this.angle ].x ) ),
            y: ( this.direction( centerPoints.y, this.points[ this.angle ].y ) ),
            diameter: ( isShown ? this.radius : this.hiddenRadius ),
            color: ( isShown ? this.color : 'black' )
        };
    }
}

onmessage = ( msg ) => {

    if ( msg && msg.data && msg.data.setWidthHeight ) {
        const width = msg.data.setWidthHeight[ 0 ],
            height = msg.data.setWidthHeight[ 1 ];

        center = getRectangleCenter( width, height );

        const radius = divide( getRectangleCorner( width, height ), 1.25 );

        // stars
        const bigStar = new CelestialBody( '#FDB813', 24, {
            direction: 'counterClockwise',
            startAngle: 180
        } );
        bigStar.setupPoints( radius );

        const smallerStar = new CelestialBody( '#FDB813', 18, {
            direction: 'counterClockwise',
            startAngle: 0
        } );
        smallerStar.setupPoints( radius );

        const stars = [
            bigStar.getCurrentPosition( center, true ),
            smallerStar.getCurrentPosition( center, true ),
        ];

        // planets
        const planetRadius = Math.floor( divide( radius, ( width > 600 ? 3 : 1.65 ) ) );
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
        const ePradius = add( radius, 75 );
        const exradius = add( ePradius, 55 );
        planetThree.setupPoints( ePradius, exradius );

        const planet = [ smallPlanet.getCurrentPosition( stars[ 0 ], true ) ],
            sPlanet = [ planetTwo.getCurrentPosition( stars[ 0 ], true ) ],
            ePlanet = [ planetThree.getCurrentPosition( stars[ 0 ], true ) ];

        postMessage( {
            stars: {
                white: stars
            },
            planets: {
                shownPlanet: planet.concat( sPlanet, ePlanet )
            }
        } );

        timerID = setInterval( () => {

            const black = [
                bigStar.getCurrentPosition( center, false ),
                smallerStar.getCurrentPosition( center, false ),
            ];
            bigStar.increment();
            smallerStar.increment();
            const blackPlanet = [ smallPlanet.getCurrentPosition( black[ 0 ], false ) ];
            const sBlackPlanet = [ planetTwo.getCurrentPosition( black[ 0 ], false ) ];
            const eBlackPlanet = [ planetThree.getCurrentPosition( black[ 0 ], false ) ];

            const white = [
                bigStar.getCurrentPosition( center, true ),
                smallerStar.getCurrentPosition( center, true ),
            ];
            smallPlanet.increment();
            planetTwo.increment();
            planetThree.increment();
            const shownPlanet = [ smallPlanet.getCurrentPosition( white[ 0 ], true ) ];
            const sShownPlanet = [ planetTwo.getCurrentPosition( white[ 0 ], true ) ];
            const eShownPlanet = [ planetThree.getCurrentPosition( white[ 0 ], true ) ];

            // check if 2 circles intersect
            const mfCentersDistance = distanceBetweenCirclesCenters( sShownPlanet[ 0 ].x, sShownPlanet[ 0 ].y, eShownPlanet[ 0 ].x, eShownPlanet[ 0 ].y );
            const centersDistance = Math.ceil( square( mfCentersDistance ) );

            // radius + 5 in case they are near
            const radiusIntersect = square( add( 7, 6 ) ),
                radiusClose = square( add( 7, 5, 6, 5 ) );

            // touch
            if ( centersDistance === radiusIntersect ) {
                console.log( 'Touching %s %s %s %s', sShownPlanet[ 0 ].x, sShownPlanet[ 0 ].y, eShownPlanet[ 0 ].x, eShownPlanet[ 0 ].y );
            }
            if ( centersDistance === radiusClose ) {
                console.log( 'Close touching %s %s %s %s', sShownPlanet[ 0 ].x, sShownPlanet[ 0 ].y, eShownPlanet[ 0 ].x, eShownPlanet[ 0 ].y );
            }
            // intersect
            if ( centersDistance < radiusIntersect ) {
                console.log( 'Intersecting %s %s %s %s', sShownPlanet[ 0 ].x, sShownPlanet[ 0 ].y, eShownPlanet[ 0 ].x, eShownPlanet[ 0 ].y );
            }
            if ( centersDistance < radiusClose ) {
                console.log( 'Close intersecting %s %s %s %s', sShownPlanet[ 0 ].x, sShownPlanet[ 0 ].y, eShownPlanet[ 0 ].x, eShownPlanet[ 0 ].y );
            }

            postMessage( {
                stars: {
                    black,
                    white
                },
                planets: {
                    blackPlanet: blackPlanet.concat( sBlackPlanet, eBlackPlanet ),
                    shownPlanet: shownPlanet.concat( sShownPlanet, eShownPlanet )
                }
            } );

        }, timeout );
    } else if ( msg && msg.data && msg.data.stop ) {
        clearInterval( timerID );
    }
};
