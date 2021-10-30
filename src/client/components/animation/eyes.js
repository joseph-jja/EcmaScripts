export function setupEyes( canvas ) {

    canvas.createEye = function ( xIrisCenter, yIrisCenter, xCenter, yCenter, options = {} ) {

        const eyeOptions = Object.assign( {}, options );
        
        // handle white of the eye
        eyeOptions.color = eyeOptions.eyeColor || 'white';
        eyeOptions.shape = ( options.shape &&
            ( options.shape === 'circle' || options.shape === 'oval' ) ?
            options.shape : 'circle' );

        if ( eyeOptions.shape === 'oval' && eyeOptions.eyeWidth && eyeOptions.eyeHeight ) {
            canvas.oval( xCenter, yCenter, eyeOptions.eyeWidth, eyeOptions.eyeHeight, eyeOptions );
        } else {
            canvas.circle( xCenter, yCenter, eyeOptions.eyeSize || 30, eyeOptions );
        }

        // handle pupal
        eyeOptions.color = eyeOptions.pupalColor || 'brown';
        eyeOptions.fillStrokeClear = eyeOptions.pupalColor || 'brown';
        canvas.circle( xIrisCenter, yIrisCenter, eyeOptions.pupalRadius || 15, eyeOptions );

        // handle iris
        eyeOptions.color = eyeOptions.irisColor || 'black';
        eyeOptions.fillStrokeClear = eyeOptions.irisColor || 'black';
        canvas.circle( xIrisCenter, yIrisCenter, eyeOptions.irisRadius || 10, eyeOptions );
    };
}
