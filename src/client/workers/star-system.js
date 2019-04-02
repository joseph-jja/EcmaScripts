import MF from 'utils/mathFunctions';

const self = this,
    timeout = 100;

let center,
    resultPoints,
    startPoint = 0;

function getStars( points ) {

    const starOne = {
            x: ( center[ 0 ] - points.x ),
            y: ( center[ 1 ] - points.y )
        },
        starTwo = {
            x: ( center[ 0 ] + points.x ),
            y: ( center[ 1 ] + points.y )
        };

    return {
        stars: {
            starOne,
            starTwo
        }
    };
}

onmessage = ( msg ) => {

    if ( msg.setWidthHeight ) {
        const width = msg.setWidthHeight[ 0 ],
            height = msg.setWidthHeight[ 1 ];

        const radius = MF.getRectangleCorner( width, height );

        resultPoints = MF.getCirclePoints( radius );

        const points = resultPoints[ startPoint ];

        postMessage( getStars( points ) );

        setTimeout( () => {
            startPoint = ( startPoint >= 360 ? 0 : ++startPoint );

            self.ostMessage( getStars( points ) );
        }, timeout );

    }

};
