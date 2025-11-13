import {
    add,
    subtract,
    multiply,
    divide
} from '/js/utils/mathFunctions';

class AstronomyMathUtilities {

    // degrees to hour angle
    hoursMinutesSeconds( degrees, modHours = true ) {
        let hours = Math.floor( degrees );
        hours = ( hours < 0 ? add( 24, hours ) : hours );
        hours = ( modHours && hours > 24 ? hours % 24 : hours );

        const degreesFraction = this.getFraction( degrees );
        const fractionTimesSixty = multiply( 60, degreesFraction );
        
        let minutes = Math.floor( fractionTimesSixty );
        let seconds = Math.round( multiply( 60, subtract( fractionTimesSixty, minutes ) ) );
        if (seconds >= 60) {
            seconds = 0;
            minutes++;
        }
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
        if (modHours && hours >= 24) {
            hours = hours % 24;
        }
        return `${ hours }:${ this.pad( minutes ) }:${ this.pad( seconds ) }`;
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
