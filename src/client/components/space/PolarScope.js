import {
    getCirclePoints,
    multiply,
    add,
    subtract
} from 'utils/mathFunctions';

import {
    Star
} from 'client/components/space/celestialBody';

import {
    PolarisCalculatorInstance
} from 'client/components/space/PolarScopeCalculator';

const doPolarMath = ( now, latitude, longitude, rightAssention ) => {
    const {
        hourAnglePolaris,
        plusHourAnglePolaris
    } = PolarisCalculatorInstance.getPolarisHourAngle( now,
        latitude, longitude, rightAssention );

    return {
        hourAnglePolaris: Number( multiply( hourAnglePolaris, 15 ) ).toFixed( 2 ),
        plusHourAnglePolaris: Number( multiply( plusHourAnglePolaris, 15 ) ).toFixed( 2 )
    };
};

export default class PolarScope extends Star {

    constructor( options = {} ) {
        super( options );

        this.speed = 0;

        this.latitude = options.latitude;
        this.longitude = options.longitude;
        this.rightAssention = options.rightAssention;
        this.clockTime = options.clockTime || new Date();

        const {
            hourAnglePolaris,
            plusHourAnglePolaris
        } = doPolarMath( this.clockTime,
            this.latitude, this.longitude, this.rightAssention );

        this.hourAngle = plusHourAnglePolaris;
        this.altHourAngle = hourAnglePolaris;
        this.angle = Math.floor( this.hourAngle );

        this.clockwise = ( options.direction && options.direction === 'clockwise' );
    }

    setupPoints( xRadius = 30 ) {
        this.points = getCirclePoints( xRadius );
    }

    increment() {

        this.clockTime = new Date();
 
        const {
            hourAnglePolaris,
            plusHourAnglePolaris
        } = doPolarMath( this.clockTime,
            this.latitude, this.longitude, this.rightAssention );

        // polaris hour angle ends up being fro 0-23
        // so to convert to degrees we multiply by 15
        this.hourAngle = plusHourAnglePolaris;
        this.altHourAngle = hourAnglePolaris;
        this.angle = Math.floor( this.hourAngle ) * 2;

        if ( this.angle < 0 ) {
            this.angle = 360;
        } else if ( this.angle > 360 ) {
            this.angle = 0;
        }
    }

    getNextPosition( centerPoints ) {

        this.increment();

        this.key = this.angle;
        // 0-90 is from 0 to 3
        // 90 to 180 is fro 3 to 6
        // 180 to 270 is from 6 to 9
        // 270 to 360 to 9 to 12
        if ( this.clockwise ) {
            if ( this.angle < 90 ) {
                this.key = add( this.angle, 90 );
            } else if ( this.angle >= 90 && this.angle < 180 ) {
                this.key = subtract( this.angle, 90 );
            } else if ( this.angle >= 180 && this.angle < 270 ) {
                this.key = subtract( this.angle, 90 );
            }
        }
        
        const point = {
            x: ( this.direction( centerPoints.x, this.points[ this.key ].x ) ),
            y: ( this.direction( centerPoints.y, this.points[ this.key ].y ) ),
            radius: this.radius,
            color: this.color
        };

        return {
            hidden: point,
            visable: point
        };
    }
}
