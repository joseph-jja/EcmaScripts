import {
    getCirclePoints,
    radiansToDegrees
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
        hourAnglePolaris,
        plusHourAnglePolaris
    };
};

export default class PolarScope extends Star {

    constructor( options = {} ) {
        super( options );

        this.latitude = options.latitude;
        this.longitude = options.longitude;
        this.rightAssention = options.rightAssention;
        this.clockTime = options.clockTime || new Date();

        const {
            hourAnglePolaris,
            plusHourAnglePolaris
        } = doPolarMath( this.clockTime,
            this.latitude, this.longitude, this.rightAssention );

        this.hourAngle = radiansToDegrees( plusHourAnglePolaris );
        this.altHourAngle = radiansToDegrees( hourAnglePolaris );
        this.angle = Math.floor( this.hourAngle );
    }

    setupPoints( xRadius = 30 ) {
        this.points = getCirclePoints( xRadius );
    }

    increment() {

        const {
            hourAnglePolaris,
            plusHourAnglePolaris
        } = doPolarMath( new Date(),
            this.latitude, this.longitude, this.rightAssention );

        this.hourAngle = radiansToDegrees( plusHourAnglePolaris );
        this.altHourAngle = radiansToDegrees( hourAnglePolaris );
        this.angle = Math.floor( this.hourAngle );

        //this.angle = this.direction( this.angle, this.speed );
        if ( this.angle < 0 ) {
            this.angle = 360;
        } else if ( this.angle > 360 ) {
            this.angle = 0;
        }
    }
}
