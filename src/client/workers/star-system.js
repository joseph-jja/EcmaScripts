import MF from 'utils/mathFunctions';

let center,
    resultPoints,
    startPoint = 0;;

onmessage = ( msg ) => {

    if ( msg.setWidthHeight ) {
        const width = msg.setWidthHeight[ 0 ],
            height = msg.setWidthHeight[ 1 ];

        const radius = MF.getRectangleCorner( width, height );

        resultPoints = MF.getCirclePoints( radius );
            
        const points = resultPoints[ 0 ];
        
        const starOne = {
            x: (center[ 0 ] - points.x), 
            y: (center[ 1 ] - points.y)
        },
              starTwo = {
            x: (center[ 0 ] + points.x), 
            y: (center[ 1 ] + points.y)
        };
        
        postMessage(() => {
            stars: {
               starOne, 
                   starTwo
            }
        });
    }

};
