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
        hourAnglePolaris: Math.floor( multiply( hourAnglePolaris, 15 ) ),
        plusHourAnglePolaris: Math.floor( multiply( plusHourAnglePolaris, 15 ) )
    };
};

export default class PolarScope extends Star {

    constructor( options = {} ) {
        super( options );

        this.speed = 0;

        this.latitude = options.latitude;
        this.longitude = options.longitude;
        this.rightAssention = options.rightAssention;
        this.useInputRA = options.useInputRA;
        this.clockTime = options.clockTime || new Date();

        const {
            hourAnglePolaris,
            plusHourAnglePolaris
        } = doPolarMath( this.clockTime,
            this.latitude, this.longitude, this.rightAssention );

        this.hourAngle = plusHourAnglePolaris;
        this.userDefinedHourAngle = hourAnglePolaris;
        this.realAngle = ( this.useInputRA ? this.userDefinedHourAngle : this.hourAngle );
        this.angle = this.realAngle;

        this.clockType = ( options.clockType === 12 ? 12 : 24 );
        this.direction = add;
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
        this.userDefinedHourAngle = hourAnglePolaris;
        this.realAngle = ( this.useInputRA ? this.userDefinedHourAngle : this.hourAngle );
        this.angle = this.realAngle;
        
        if ( this.angle < 0 ) {
            this.angle = 360;
        } else if ( this.angle > 360 ) {
            this.angle = 0;
        }
        
        if ( this.clockType === 12 ) {
            if ( this.realAngle <= 180 ) {
                // need to force the angle to shift in the array
                this.angle = subtract( 180, this.readAngle );
            } //else if ( this.realAngle > 
        }
    }
}
