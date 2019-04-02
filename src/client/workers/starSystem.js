import MF from 'utils/mathFunctions';

const self = this,
    timeout = 100;

let center,
    resultPoints,
    startPoint = 0;

function getStars( points ) {

    const starOne = {
            x: ( MF.subtract( center[ 0 ], points.x ) ),
            y: ( MF.subtract( center[ 1 ], points.y ) )
        },
        starTwo = {
            x: ( MF.add( center[ 0 ], points.x ) ),
            y: ( MF.add( center[ 1 ], points.y ) )
        };

    return {
        stars: {
            starOne,
            starTwo
        }
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

        setTimeout( () => {
            startPoint = ( startPoint >= 360 ? 0 : ++startPoint );

            postMessage( getStars( resultPoints[ startPoint ] ) );
        }, timeout );
    }
};
