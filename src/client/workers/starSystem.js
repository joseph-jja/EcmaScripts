import MF from 'utils/mathFunctions';

const self = this,
    timeout = 100;

let center,
    resultPoints,
    planetPoints,
    sPlanetPoints,
    ePlanetPoints,
    startPoint = 0,
    planetPoint = 0,
    sPlanetPoint = 0,
    ePlanetPoint = 225,
    timerID;

function getStars( points, hider ) {

    // Zeta Reticuli :P
    const color = ( hider ? 'black' : '#FDB813' );

    return [ {
        x: ( MF.subtract( center[ 0 ], points.x ) ),
        y: ( MF.subtract( center[ 1 ], points.y ) ),
        diameter: ( hider ? 25 : 24 ),
        color: color
    }, {
        x: ( MF.add( center[ 0 ], points.x ) ),
        y: ( MF.add( center[ 1 ], points.y ) ),
        diameter: ( hider ? 19 : 18 ),
        color: color
    } ];
}

function getPlanet( starX, starY, points, hider, diameter ) {

    const planetColor = ( hider ? 'black' : '#17e3ea' );

    return [ {
        x: ( MF.subtract( starX, points.x ) ),
        y: ( MF.subtract( starY, points.y ) ),
        diameter: ( hider ? MF.add( diameter, 1 ) : diameter ),
        color: planetColor
    } ];
}

onmessage = ( msg ) => {

    if ( msg && msg.data && msg.data.setWidthHeight ) {
        const width = msg.data.setWidthHeight[ 0 ],
            height = msg.data.setWidthHeight[ 1 ];

        center = MF.getRectangleCenter( width, height );

        const radius = MF.divide( MF.getRectangleCorner( width, height ), 1.25 );
        const planetRadius = Math.floor( MF.divide( radius, ( width > 600 ? 3 : 1.65 ) ) );

        resultPoints = MF.getCirclePoints( radius );
        planetPoints = MF.getCirclePoints( MF.add( planetRadius, 0 ) );
        const pradius = MF.add( planetRadius, ( width > 600 ? 28 : 17 ) );
        const xradius = MF.add( pradius, ( width > 600 ? 50 : 8 ) );
        sPlanetPoints = MF.getEllipsePoints( xradius, pradius );

        const ePradius = MF.add( radius, 75 );
        const exradius = MF.add( ePradius, 55 );
        ePlanetPoints = MF.getEllipsePoints( ePradius, exradius );

        const stars = getStars( resultPoints[ startPoint ], false );

        const planet = getPlanet( stars[ 0 ].x, stars[ 0 ].y, planetPoints[ planetPoint ], false, 3 ),
            sPlanet = getPlanet( stars[ 0 ].x, stars[ 0 ].y, sPlanetPoints[ sPlanetPoint ], false, 7 ),
            ePlanet = getPlanet( center[ 0 ], center[ 1 ], ePlanetPoints[ ePlanetPoint ], false, ( width > 600 ? 6 : 0 ) );

        postMessage( {
            stars: {
                white: stars
            },
            planets: {
                shownPlanet: planet.concat( sPlanet, ePlanet )
            }
        } );

        timerID = setInterval( () => {

            const oldPoint = resultPoints[ startPoint ];
            const black = getStars( oldPoint, true );
            const blackPlanet = getPlanet( black[ 0 ].x, black[ 0 ].y, planetPoints[ planetPoint ], true, 3 );
            const sBlackPlanet = getPlanet( black[ 0 ].x, black[ 0 ].y, sPlanetPoints[ sPlanetPoint ], true, 7 );
            const eBlackPlanet = getPlanet( center[ 0 ], center[ 1 ], ePlanetPoints[ ePlanetPoint ], true, ( width > 600 ? 6 : 0 ) );
            startPoint = ( startPoint <= 0 ? 360 : --startPoint );
            if ( planetPoint < 4 ) {
                planetPoint = 360;
            } else {
                planetPoint -= 4;
            }
            if ( sPlanetPoint < 3 ) {
                sPlanetPoint = 360;
            } else {
                sPlanetPoint -= 3;
            }
            if ( ePlanetPoint < 2 ) {
                ePlanetPoint = 360;
            } else {
                ePlanetPoint -= 2;
            }
            const newPoint = resultPoints[ startPoint ];
            const white = getStars( newPoint, false );
            const shownPlanet = getPlanet( white[ 0 ].x, white[ 0 ].y, planetPoints[ planetPoint ], false, 3 );
            const sShownPlanet = getPlanet( white[ 0 ].x, white[ 0 ].y, sPlanetPoints[ sPlanetPoint ], false, 7 );
            const eShownPlanet = getPlanet( center[ 0 ], center[ 1 ], ePlanetPoints[ ePlanetPoint ], false, ( width > 600 ? 6 : 0 ) );

            // check if 2 circles intersect
            const mfCentersDistance = MF.distanceBetweenCirclesCenters( sShownPlanet[ 0 ].x, sShownPlanet[ 0 ].y, eShownPlanet[ 0 ].x, eShownPlanet[ 0 ].y );
            const centersDistance = Math.ceil( MF.square( mfCentersDistance ) );

            // radius + 5 in case they are near
            const radiusIntersect = MF.square( MF.add( 7, 6 ) ),
                radiusClose = MF.square( MF.add( 7, 5, 6, 5 ) );

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
