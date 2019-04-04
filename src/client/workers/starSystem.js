import MF from 'utils/mathFunctions';

const self = this,
    timeout = 100;

let center,
    resultPoints,
    startPoint = 0,
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

onmessage = ( msg ) => {

    if ( msg && msg.data && msg.data.setWidthHeight ) {
        const width = msg.data.setWidthHeight[ 0 ],
            height = msg.data.setWidthHeight[ 1 ];

        center = MF.getRectangleCenter( width, height );

        const radius = MF.getRectangleCorner( width, height );

        resultPoints = MF.getCirclePoints( radius );

        postMessage( getStars( resultPoints[ startPoint ], false ) );

        timerID = setInterval( () => {

            const oldPoint = resultPoints[ startPoint ];
            const black = getStars( oldPoint, true );
            startPoint = ( startPoint >= 360 ? 0 : ++startPoint );
            const newPoint = resultPoints[ startPoint ];
            const white = getStars( newPoint, false );

            postMessage( {
                stars: {
                    black,
                    white
                }
            } );
        }, timeout );
    } else if ( msg && msg.data && msg.data.stop ) {
        clearInterval( timerID );
    }
};
