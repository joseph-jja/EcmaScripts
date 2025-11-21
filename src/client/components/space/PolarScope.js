import {
    getCirclePoints,
    multiply,
    add
} from '/js/utils/mathFunctions';

import {
    Star
} from '/js/client/components/space/celestialBody';

import PolarisCalculatorInstance from '/js/client/components/space/PolarScopeCalculator';

const doPolarMath = ( now, latitude, longitude, rightAssention ) => {
    const {
        hourAnglePolaris,
        plusHourAnglePolaris,
        correctHourAngle,
        hourAngle
    } = PolarisCalculatorInstance.getPolarisHourAngle( now,
        latitude, longitude, rightAssention );

    return {
        hourAnglePolaris: Math.floor( multiply( hourAnglePolaris, 15 ) ),
        plusHourAnglePolaris: Math.floor( multiply( plusHourAnglePolaris, 15 ) ),
        correctHourAngle: Math.floor( multiply( correctHourAngle, 15 ) ),
        hourAngle: Math.floor( multiply( hourAngle, 15 ) )
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
            plusHourAnglePolaris,
            correctHourAngle,
            hourAngle
        } = doPolarMath( this.clockTime,
            this.latitude, this.longitude, this.rightAssention );

        this.hourAngle = plusHourAnglePolaris;
        this.userDefinedHourAngle = hourAnglePolaris;
        this.correctHourAngle = correctHourAngle;
        this.hourAngleAlt = hourAngle;
        this.angle = ( this.useInputRA ? this.userDefinedHourAngle : this.hourAngle );

        this.direction = add;
    }

    setupPoints( xRadius = 30 ) {
        this.points = getCirclePoints( xRadius );
    }

    increment() {

        this.clockTime = new Date();

        const {
            hourAnglePolaris,
            plusHourAnglePolaris,
            correctHourAngle,
            hourAngle
        } = doPolarMath( this.clockTime,
            this.latitude, this.longitude, this.rightAssention );

        // polaris hour angle ends up being fro 0-23
        // so to convert to degrees we multiply by 15
        this.hourAngle = plusHourAnglePolaris;
        this.userDefinedHourAngle = hourAnglePolaris;
        this.correctHourAngle = correctHourAngle;
        this.hourAngleAlt = hourAngle;
        this.angle = ( this.useInputRA ? this.userDefinedHourAngle : this.correctHourAngle );
        //this.angle = ( this.useInputRA ? this.correctHourAngle : this.correctHourAngle );
        
        if ( this.angle < 0 ) {
            this.angle = 360;
        } else if ( this.angle > 360 ) {
            this.angle = 0;
        }
    }
}
