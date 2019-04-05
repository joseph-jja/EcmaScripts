import MF from 'utils/mathFunctions';

const self = this,
    timeout = 100;

let center,
    resultPoints,
    planetPoints,
    startPoint = 0,
    planetPoint = 0,
    timerID;

function getStars( points, hider ) {

    // Zeta Reticuli :P
    const color = ( hider ? 'black' : '#FDB813' );

    return [ {
        x: ( MF.subtract( center[ 0 ], points.x ) ),
        y: ( MF.subtract( center[ 1 ], points.y ) ),
        diameter: ( hider ? 19 : 18 ),
        color: color
    }, {
        x: ( MF.add( center[ 0 ], points.x ) ),
        y: ( MF.add( center[ 1 ], points.y ) ),
        diameter: ( hider ? 16 : 15 ),
        color: color
    } ];
}

function getPlanet( starX, starY, points, hider ) {

    const planetColor = ( hider ? 'black' : '#019108' );

    return [ {
        x: ( MF.subtract( starX, points.x ) ),
        y: ( MF.subtract( starY, points.y ) ),
        diameter: ( hider ? 6 : 5 ),
        color: planetColor
    } ];
}

onmessage = ( msg ) => {

    if ( msg && msg.data && msg.data.setWidthHeight ) {
        const width = msg.data.setWidthHeight[ 0 ],
            height = msg.data.setWidthHeight[ 1 ];

        center = MF.getRectangleCenter( width, height );

        const radius = MF.getRectangleCorner( width, height );
        const planetRadius = Math.floor( MF.divide( radius, 3 ) );

        resultPoints = MF.getCirclePoints( radius );
        planetPoints = MF.getCirclePoints( planetRadius );

        const stars = getStars( resultPoints[ startPoint ], false );

        const planet = getPlanet( stars[ 0 ].x, stars[ 0 ].y, planetPoints[ planetPoint ], false );

        postMessage( {
            stars: {
                white: stars
            },
            planets: {
                shownPlanet: planet
            }
        } );

        timerID = setInterval( () => {

            const oldPoint = resultPoints[ startPoint ];
            const black = getStars( oldPoint, true );
            const blackPlanet = getPlanet( black[ 0 ].x, black[ 0 ].y, planetPoints[ planetPoint ], true );
            startPoint = ( startPoint >= 360 ? 0 : ++startPoint );
            planetPoint = ( planetPoint >= 360 ? 0 : ++planetPoint );
            planetPoint = ( planetPoint >= 360 ? 0 : ++planetPoint );
            const newPoint = resultPoints[ startPoint ];
            const white = getStars( newPoint, false );
            const shownPlanet = getPlanet( white[ 0 ].x, white[ 0 ].y, planetPoints[ planetPoint ], false );

            postMessage( {
                stars: {
                    black,
                    white
                },
                planets: {
                    blackPlanet,
                    shownPlanet
                }
            } );

        }, timeout );
    } else if ( msg && msg.data && msg.data.stop ) {
        clearInterval( timerID );
    }
};
