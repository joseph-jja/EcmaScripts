import {
    add,
    subtract,
    multiply,
    divide,
    degreesToRadians
} from '/js/utils/mathFunctions';

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

    altAzToRaDec(alt, az, lat, lon, jd) {
        // Convert degrees to radians
        const altRad = degreesToRadians(alt);
        const azRad = degreesToRadians(az);
        const latRad = degreesToRadians(lat);

        // Calculate Greenwich Sidereal Time (GST)
        // This is a simplified calculation; for higher precision, a more detailed algorithm is needed.
        // jd: Julian Date
        const T = divide(subtract(jd, JD_J2000), 36525); // Centuries from J2000.0
        let GMST = subtract(add(280.46061837, multiply(360.98564736629, subtract(jd, JD_J2000)),  multiply(0.000387933, T, T)), divide(multiply(T, T, T), 38710000));
        GMST = GMST % 360; // Ensure it's within 0-360 degrees
        if (GMST < 0) {
            GMST = add(GMST, 360);
        }

        // Calculate Local Sidereal Time (LST)
        const LST = add(GMST, lon); // LST in degrees
        const LSTRad = divide(multiply(LST, Math.PI), 180);

        // Calculate Declination (Dec)
        const sinDec = add(multiply(Math.sin(altRad), Math.sin(latRad)), multiply(Math.cos(altRad), Math.cos(latRad), Math.cos(azRad)));
        const decRad = Math.asin(sinDec);
        const dec = divide(multiply(decRad, 180), Math.PI); // Convert back to degrees

        // Calculate Hour Angle (HA)
        const cosHA = divide(subtract(Math.sin(altRad), multiply( Math.sin(latRad), Math.sin(decRad))), multiply(Math.cos(latRad), Math.cos(decRad)));
        let HRad = Math.acos(cosHA);

        // Determine the sign of HA based on Azimuth
        if (Math.sin(azRad) > 0) {
            HRad = -HRad;
        }
        const H =divide(multiply(HRad, 180), Math.PI); // Convert back to degrees

    }
}

const AstronomyMathUtilitiesInstance = new AstronomyMathUtilities();
export default AstronomyMathUtilitiesInstance;
