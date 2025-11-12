import {
    add,
    subtract,
    multiply,
    divide,
    degreesToRadians
} from '/js/utils/mathFunctions';

const JD_J2000  = 2451545.0;

class AstronomyMathUtilities {

    // degrees to hour angle
    hoursMinutesSeconds( degrees ) {
        let hours = Math.floor( degrees );
        hours = ( hours < 0 ? add( 24, hours ) : hours );
        hours = ( hours > 24 ? hours % 24 : hours );

        const minutes = this.pad( Math.floor( multiply( 60, this.getFraction( degrees ) ) ) );
        const seconds = this.pad( Math.round( multiply( 60, subtract( multiply( 60, this.getFraction( degrees ) ), minutes ) ) ) );

        return `${ hours }:${ minutes }:${ seconds }`;
    }

    // takes hour angle and converts to degrees
    hourAngleToDegrees( hour, minute, seconds ) {
        return add( hour, divide( minute, 60 ), divide( seconds, 3600 ) );
    }

    // 24 hour clock :?
    mapTo24Hour( hour ) {
        let result = hour;
        if ( result < 0 ) {
            result = subtract( result, multiply( 24, subtract( divide( result, 24 ), 1 ) ) );
        } else if ( hour >= 24 ) {
            result = subtract( result, multiply( divide( result, 24 ), 24 ) );
        }
        return result;
    }

    pad( x ) {
        return `${x}`.padStart( 2, '0' );
    }

    getFraction( num ) {
        // get decimal places
        const decimals = subtract( num, Math.floor( num ) );
        // we want positive number
        return ( decimals < 0 ? add( decimals, 1 ) : decimals );
    }
}

const AstronomyMathUtilitiesInstance = new AstronomyMathUtilities();
export default AstronomyMathUtilitiesInstance;
