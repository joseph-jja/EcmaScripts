import MF from 'utils/mathFunctions';

const self = this,
    timeout = 100;

let center,
    resultPoints,
    startPoint = 0,
    timerID;

function getStars( points ) {

    const starOne = {
            x: ( MF.subtract( center[ 0 ], points.x ) ),
            y: ( MF.subtract( center[ 1 ], points.y ) ),
            diameter: 18,
            backroundDiameter: 19,
            color: 'white'
        },
        starTwo = {
            x: ( MF.add( center[ 0 ], points.x ) ),
            y: ( MF.add( center[ 1 ], points.y ) ),
            diameter: 15,
            backroundDiameter: 16,
            color: 'white'
        };

    return {
        starOne,
        starTwo
    };
}

onmessage = ( msg ) => {

    if ( msg && msg.data && msg.data.setWidthHeight ) {
        const width = msg.data.setWidthHeight[ 0 ],
            height = msg.data.setWidthHeight[ 1 ];

        center = MF.getRectangleCenter( width, height );

        const radius = MF.getRectangleCorner( width, height );

        resultPoints = MF.getCirclePoints( radius );

        postMessage( getStars( resultPoints[ startPoint ] ) );

        timerID = setInterval( () => {

            const oldPoint = resultPoints[ startPoint ];
            const black = getStars( oldPoint );
            startPoint = ( startPoint >= 360 ? 0 : ++startPoint );
            const newPoint = resultPoints[ startPoint ];
            const white = getStars( newPoint );

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
