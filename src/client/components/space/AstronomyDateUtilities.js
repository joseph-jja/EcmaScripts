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
            seconds: localTime.getUTCSeconds()
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
            seconds,
            milliseconds
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
        return ( n <= 2 && ( n, r ), p, s );
    }

    // another method of calculating julian date
    // takes new Date() object
    // takes local time
    toJulianLT( localTime ) {
        const timeSinceJ2000Inms = subtract(localTime.getTime(), J2000_EPOCH_MS);
        const daysSinceJ2000 = divide(timeSinceJ2000Inms, MS_PER_DAY);
        const julianDate = add(JULIAN_DATE_J2000, daysSinceJ2000);
        return julianDate;
    }
    
    // takes output of toJulian called internal
    toGMST( d ) {
        const r = subtract( d, 2400000.5 );
        const n = Math.floor( r );
        const t = divide( subtract( n, 51544.5 ), 36525 );
        const u = multiply( subtract( .093104, multiply( 62e-7, t ) ), t );
        const v = multiply( add( 8640184.812866, u ), divide( t, 3600 ) );
        return add( 6.697374558, multiply( 24, subtract( r, n ), 1.0027379093 ), v );
    }

    // takes output of toGMST and longitude called internal
    // Greenwich Mean Sidereal Time
    gmstToLST( d, longitude ) {
        return multiply( 24, AstronomyMathUtilitiesInstance.getFraction( divide( add( d, divide( longitude, 15 ) ), 24 ) ) );
    }

    isDST( now ) {
        const jan = new Date( now.getFullYear(), 0, 1 ).getTimezoneOffset();
        const jul = new Date( now.getFullYear(), 6, 1 ).getTimezoneOffset();
        return Math.max( jan, jul ) !== now.getTimezoneOffset();
    }

    // calcualte LST
    utcToLST( d, longitude ) {
        const n = this.toJulian( d ),
            r = this.toGMST( n );
        return this.gmstToLST( r, longitude );
    }

    // alternate method to calculate LST, which seems to do it right
    calculateLST( now, longitude ) {

        const julianDate = add( divide( now.getTime(), 86400000 ), 2440587.5 );
        const D = subtract( julianDate, 2451545.0 ); // calculate number of days since January 1, 2000 at 12:00 UT
        const UT = add( now.getUTCHours(), divide( now.getUTCMinutes(), 60 ), divide( now.getUTCSeconds(), 3600 ) ); // calculate Universal Time
        const GMST = add( 6.697374558, multiply( 0.06570982441908, D ), multiply( 1.00273790935, UT ) ); // calculate Greenwich Mean Sidereal Time
        const LST = AstronomyMathUtilitiesInstance.getFraction( divide( add( GMST, divide( longitude, 15 ) ), 24 ) ); // calculate local sidereal time
        return multiply( 24, LST ); // adjust for negative values
    }
}

const AstronomyDateUtilitiesInstance = new AstronomyDateUtilities();
export default AstronomyDateUtilitiesInstance;
