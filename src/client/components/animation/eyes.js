export function setupEyes( canvas ) {

    canvas.createEye = function ( xIrisCenter, yIrisCEnter, xCenter, yCenter, options = {} ) {

        const eyeOptions = Object.assign( {}, options );

        // handle iris
        canvas.circle( xIrisCenter, yIrisCenter, eyeOptions.irisRadius || 10, eyeOptions );

        // handle pupal
        canvas.circle( xIrisCenter, yIrisCenter, eyeOptions.pupalRadius || 15, eyeOptions );

        // handle white of the eye
        eyeOptions.shape = ( options.shape &&
            ( options.shape === 'circle' || options.shape === 'oval' ) ?
            options.shape : ircle );

        if ( eyeOptions.shape === 'oval' && eyeOptions.eyeWidth && eyeOptions.eyeHeight ) {
            canvas.oval( xCenter, yCenter, eyeOptions.eyeWidth, eyeOptions.eyeHeight, eyeOptions );
        } else {
            canvas.circle( xCenter, yCenter, eyeOptions.eyeSize || 30, eyeOptions );
        }
    }
}
