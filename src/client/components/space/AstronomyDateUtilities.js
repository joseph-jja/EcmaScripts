import {
    add,
    subtract,
    multiply,
    divide
} from '/js/utils/mathFunctions';
import AstronomyMathUtilitiesInstance from '/js//client/components/space/AstronomyMathUtilities';

const J2000_EPOCH_MS = Date.UTC(2000, 0, 1, 12, 0, 0, 0); // Month is 0-indexed (0=Jan)
const JULIAN_DATE_J2000 = 2451545.0;
const MS_PER_DAY = 86400000;

class AstronomyDateUtilities {

    // takes new Date() object
    toUTC( localTime ) {
        return {
            year: localTime.getUTCFullYear(),
            month: localTime.getUTCMonth(),
            date: localTime.getUTCDate(),
            hours: localTime.getUTCHours(),
            minutes: localTime.getUTCMinutes(),
            seconds: localTime.getUTCSeconds(),
            milliseconds: localTime.getUTCMilliseconds()
        };
    }

    // takes output of toUTC called internal
    toJulian( utcDate ) {
        const {
            year,
            month,
            date,
            hours,
            minutes,
            seconds
        } = utcDate;
        let n = add( month, 1 ),
            r = year,
            i = add( hours, divide( minutes, 60 ), divide( seconds, 3600 ) ); // universal time
        if ( n <= 2 ) {
            n = add( n, 12 );
            r = subtract( r, 1 );
        }
        const p = Math.floor( divide( r, 100 ) );
        const q = Math.floor( multiply( 365.25, add( r, 4716 ) ) );
        const u = Math.floor( multiply( 30.6001, add( n, 1 ) ) );
        const s = add( subtract( subtract( add( q, u, date ), 13 ), 1524.5 ), divide( i, 24 ) );
        const j = (n <= 2 && ( n, r ), p, s);
        return Number( j ).toFixed(6);
    }

    // another method of calculating julian date
    // takes new Date() object
    // takes local time
    toJulianLT( localTime ) {
        const timeSinceJ2000Inms = subtract(localTime.getTime(), J2000_EPOCH_MS);
        const daysSinceJ2000 = divide(timeSinceJ2000Inms, MS_PER_DAY);
        const julianDate = add(JULIAN_DATE_J2000, daysSinceJ2000);
        return Number( julianDate ).toFixed(6);
    }
    
    // takes output of toJulien 
    // this calclates correct GSMT in decimal degree format
    // calling AstronomyMathUtilitiesInstance
    // decDegreesToHourMinutesSeconds converts it to hours ptoperly
    toGMST( d ) {
        const jdutc = subtract( d, JULIAN_DATE_J2000 ); // Julian date since j2000 
        const t = divide( jdutc, 36525 );  // Julian Centuries since J2000
        const tSquare = multiply(Math.pow(t, 2), 0.000387933);
        const tCube = divide(Math.pow(t, 3), 38710000);
        const jdate360 = multiply(jdutc, 360.98564736629);
        const theta = subtract(add(280.46061837, jdate360, tSquare), tCube);
        const gmstDegrees = theta % 360;
        return Number( gmstDegrees ).toFixed(6);
    }

    // takes output of toGMST and longitude called internal
    // Greenwich Mean Sidereal Time
    // LST = GMST + (Longitude / 15). 
    gmstToLST( gmst, longitude) {
        const long = ( longitude < 0 ? add(360, longitude) : longitude );
        const lst = add(gmst, long) % 360; 
        return Number( lst ).toFixed(6);
    }

    lstDecimalToLstDecimalHours( lst ) { 
        return divide( lst / 15 );
    }

    isDST( now ) {
        const jan = new Date( now.getFullYear(), 0, 1 ).getTimezoneOffset();
        const jul = new Date( now.getFullYear(), 6, 1 ).getTimezoneOffset();
        return Math.max( jan, jul ) !== now.getTimezoneOffset();
    }

    // calcualte LST
    utcToLST( d, longitude ) {
        const n = this.toJulian( d );
        const r = this.toGMST( n );
        return this.gmstToLST( r, longitude );
    }

    // alternate method to calculate LST, which seems to do it right
    calculateLST( now, longitude ) {

        const utc = this.toUTC( now );
        const LST = this.utcToLST( utc, longitude );
        return multiply(AstronomyMathUtilitiesInstance.getFraction( divide( LST, 24 ) ), 24); // adjust for negative values
    }
}

const AstronomyDateUtilitiesInstance = new AstronomyDateUtilities();
export default AstronomyDateUtilitiesInstance;
