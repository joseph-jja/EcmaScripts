import {
    getCirclePoints
} from 'utils/mathFunctions';

import {
    Star
} from 'client/components/space/celestialBody';

class PolarScope extends Star {

    constructor( options = {} ) {
        super( options );

        this.latitude = options.latitude;
        this.longitude = options.longitude;
        this.rightAssention = options.rightAssention;
    }

    setupPoints( xRadius = 30 ) {
        this.points = getCirclePoints( xRadius );
    }

    increment() {

        this.angle = this.direction( this.angle, this.speed );
        if ( this.angle < 0 ) {
            this.angle = 360;
        } else if ( this.angle > 360 ) {
            this.angle = 0;
        }
    }
}

export PolarScope;
