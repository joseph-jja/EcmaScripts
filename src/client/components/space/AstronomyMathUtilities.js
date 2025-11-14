import {
    add,
    subtract,
    multiply,
    divide
} from '/js/utils/mathFunctions';

class AstronomyMathUtilities {

    // make this private after upgrading eslint
    pad( x ) {
        return `${x}`.padStart( 2, '0' );
    }

    // ra is special, so this function needs to be used to convert
    // degrees to hours, minutes, seconds
    raDegreesToHourMinutesSeconds( degrees ) {
        // hour angle is 0 to 24? 
        const realDegrees = ( degrees < 0 ? add(degrees, 360) : degrees );
        
        const hoursFloat = divide( realDegrees, 15 );
        const hours = Math.floor( hoursFloat );
        
        const minutesFloat = multiply( this.getFraction( hoursFloat ), 60 );
        const minutes = Math.floor( minutesFloat );

        const seconds = +Number( multiply( this.getFraction( minutesFloat ), 60 )).toFixed(2);
        
        return { hours, minutes, seconds };
    }

    // dec, and alt / az are not the same as ra
    // so this function needs to be used to convert
    // degrees to hours, minutes, seconds
    decDegreesToHourMinutesSeconds( degrees ) {
        const realDegrees = degrees;
    
        const hours = Math.floor( realDegrees );
        
        const minutesFloat = multiply( this.getFraction( realDegrees ), 60 );
        const minutes = Math.floor( minutesFloat );

        const seconds = +Number( multiply( this.getFraction( minutesFloat ), 60 )).toFixed(2);
        
        return { hours, minutes, seconds };
    }

    // degrees to hour angle
    hoursMinutesSeconds( degrees ) {
        let hours = Math.floor( degrees );
        hours = ( hours < 0 ? add( 24, hours ) : hours );
        hours = ( hours > 24 ? hours % 24 : hours );

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
        if (hours >= 24) {
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

    getFraction( num ) {
        // get decimal places
        const decimals = subtract( num, Math.floor( num ) );
        // we want positive number
        return ( decimals < 0 ? add( decimals, 1 ) : decimals );
    }
}

const AstronomyMathUtilitiesInstance = new AstronomyMathUtilities();
export default AstronomyMathUtilitiesInstance;
