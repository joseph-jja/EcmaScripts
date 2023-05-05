import {
    add,
    subtract,
    multiply,
    divide
} from 'utils/mathFunctions';

// some of this code was taken from takahashi-europe.com minified code
// unminfied and redone to make some sense 
// then compared to some code output by chatGPT
// then this code was converted into ES classes
const Polaris = {
    RightAscension: 2.496532,
    Declination: 89.2641667
};

const SigmaOctantis = {
    RightAscension: 21.0786056,
    Declination: -77.4311111
};

class PolarScopeUtilities {

    // degrees to hour angle
    hoursMinutesSeconds( degrees ) {
        let hours = Math.floor( degrees );
        hours = ( hours < 0 ? add( 24, hours ) : hours );

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

const PolarScopeUtilitiesInstance = new PolarScopeUtilities();

class PolarScopeDateUtilities {

    // takes new Date() object
    toUTC( d ) {
        return {
            year: d.getUTCFullYear(),
            month: d.getUTCMonth(),
            date: d.getUTCDate(),
            hours: d.getUTCHours(),
            minutes: d.getUTCMinutes(),
            seconds: d.getUTCSeconds()
        };
    }

    // takes output of toUTC called internal
    toJulien( d ) {
        //    const julianDate = ( now.getTime() / 86400000 ) + 2440587.5;
        const t = d.date;
        let n = add( d.month, 1 ),
            r = d.year,
            i = add( d.hours, divide( d.minutes, 60 ), divide( d.seconds, 3600 ) ); // universal time
        if ( n <= 2 ) {
            n = add( n, 12 );
            r = subtract( r, 1 );
        }
        const p = Math.floor( divide( r, 100 ) );
        const q = Math.floor( multiply( 365.25, add( r, 4716 ) ) );
        const u = Math.floor( multiply( 30.6001, add( n, 1 ) ) );
        const s = add( subtract( subtract( add( q, u, t ), 13 ), 1524.5 ), divide( i, 24 ) );
        return ( n <= 2 && ( n, r ), p, s );
    }

    // takes output of toJulien called internal
    toGMST( d ) {
        const r = subtract( d, 2400000.5 );
        const n = Math.floor( r );
        const t = divide( subtract( n, 51544.5 ), 36525 );
        const u = multiply( subtract( .093104, multiply( 62e-7, t ) ), t );
        const v = multiply( add( 8640184.812866, u ), divide( t, 3600 ) );
        return add( 6.697374558, multiply( 24, subtract( r, n ), 1.0027379093 ), v );
    }

    // takes output of toGMST and longitude called internal
    gmstToLST( d, longitude ) {
        return multiply( 24, PolarScopeUtilitiesInstance.getFraction( divide( add( d, divide( longitude, 15 ) ), 24 ) ) );
    }

    isDST( now ) {
        const jan = new Date( now.getFullYear(), 0, 1 ).getTimezoneOffset();
        const jul = new Date( now.getFullYear(), 6, 1 ).getTimezoneOffset();
        return Math.max( jan, jul ) !== now.getTimezoneOffset();
    }

    // calcualte LST
    utcToLST( d, longitude ) {
        const n = this.toJulien( d ),
            r = this.toGMST( n );
        return this.gmstToLST( r, longitude );
    }

    // alternate method to calculate LST, which seems to do it right
    calculateLST( now, longitude ) {

        const julianDate = add( divide( now.getTime(), 86400000 ), 2440587.5 );
        const D = subtract( julianDate, 2451545.0 ); // calculate number of days since January 1, 2000 at 12:00 UT
        const UT = add( now.getUTCHours(), divide( now.getUTCMinutes(), 60 ), divide( now.getUTCSeconds(), 3600 ) ); // calculate Universal Time
        const GMST = add( 6.697374558, multiply( 0.06570982441908, D ), multiply( 1.00273790935, UT ) ); // calculate Greenwich Mean Sidereal Time
        const LST = PolarScopeUtilitiesInstance.getFraction( divide( add( GMST, divide( longitude, 15 ) ), 24 ) ); // calculate local sidereal time
        return multiply( 24, LST ); // adjust for negative values
    }
}

const PolarScopeDateUtilitiesInstance = new PolarScopeDateUtilities();

class PolarScopeCalculator {

    // calculate offset of Polaris 
    // OMG crazy maths
    precessionCorrection( e, latitude ) {
        let t = PolarScopeDateUtilitiesInstance.toJulien( e ),
            n = Polaris.RightAscension,
            r = Polaris.Declination;

        if ( latitude < 0 ) {
            n = SigmaOctantis.RightAscension;
            r = SigmaOctantis.Declination;
        }

        let i = divide( multiply( n, Math.PI ), 12 ),
            o = divide( multiply( r, Math.PI ), 180 );

        if ( latitude < 0 ) {
            this.correctedRA = add( n, divide( multiply( add( 3.075, multiply( 1.336, Math.sin( multiply( 15, n ) ), 57.08839 ) ), subtract( e.year, 2e3 ) ), 3600 ) );
            this.correctedDEC = add( r, divide( multiply( 20.04, Math.cos( multiply( 15, r ) ), subtract( e.year, 2e3 ) ), 3600 ) );
        } else {
            const s = divide( subtract( t, 2451545 ), 36525 );
            let f = add( multiply( 2306.2181, s ), multiply( .30188, s, s ), multiply( .017998, s, s, s ) ),
                d = add( multiply( 2306.2181, s ), multiply( 1.09468, s, s ), multiply( .018203, s, s, s ) ),
                p = add( multiply( 2004.3109, s ), multiply( -.42665, s, s ), multiply( -.041833, s, s, s ) );

            f = divide( multiply( f, Math.PI ), 648e3 );
            d = divide( multiply( d, Math.PI ), 648e3 );
            p = divide( multiply( p, Math.PI ), 648e3 );

            const h = multiply( Math.sin( add( i, f ) ), Math.cos( o ) ),
                g = subtract( multiply( Math.cos( add( i, f ) ), Math.cos( p ), Math.cos( o ) ), multiply( Math.sin( p ), Math.sin( o ) ) ),
                v = add( multiply( Math.cos( add( i, f ) ), Math.sin( p ), Math.cos( o ) ), multiply( Math.cos( p ), Math.sin( o ) ) );

            const z = add( Math.sqrt( multiply( h, h ), multiply( g, g ) ) );
            this.correctedDEC = v > .9 ?
                Math.acos( z ) :
                v < -.9 ? -Math.acos( z ) : Math.asin( v );
            this.correctedRA = add( Math.atan2( h, g ), d );
            this.correctedRA = divide( multiply( 12, this.correctedRA ), Math.PI );
            this.correctedDEC = divide( multiply( 180, this.correctedDEC ), Math.PI );

            if ( this.correctedDEC > 90 ) {
                this.correctedDEC = subtract( 180, this.correctedDEC );
                this.correctedRA = add( this.correctedRA, 12 );
            }
            if ( this.correctedDEC < -90 ) {
                this.correctedDEC = subtract( -180, this.correctedDEC );
                this.correctedRA = add( this.correctedRA, 12 );
            }
            this.correctedRA = PolarScopeUtilitiesInstance.mapTo24Hour( this.correctedRA );
        }
    }

    // from the dot com
    getPolarisHA( now, latitude, longitude ) {
        const utcNow = PolarScopeDateUtilitiesInstance.toUTC( now );
        this.precessionCorrection( utcNow, latitude );
        const lst = PolarScopeDateUtilitiesInstance.utcToLST( utcNow, longitude );
        let t = subtract( lst, this.correctedRA );
        if ( latitude < 0 ) {
            if ( t < 0 ) {
                t = Math.abs( t );
            } else {
                t = -t;
            }
        }
        return {
            ha: t
        };
    }

    // tweaked from chatGPT and other sources
    getPolarisHourAngle( now, latitude, longitude, rightAssention ) {

        // get utc time
        const utcNow = PolarScopeDateUtilitiesInstance.toUTC( now );
        this.precessionCorrection( utcNow, latitude );

        const localSideRealTime = PolarScopeDateUtilitiesInstance.calculateLST( now, longitude );

        let hourAnglePolaris = Number( subtract( localSideRealTime, rightAssention ) ).toFixed( 6 );
        let plusHourAnglePolaris = Number( subtract( localSideRealTime, this.correctedRA ) ).toFixed( 6 );

        if ( hourAnglePolaris < 0 ) {
            hourAnglePolaris = add( 24, hourAnglePolaris );
        }

        if ( plusHourAnglePolaris < 0 ) {
            plusHourAnglePolaris = add( 24, plusHourAnglePolaris );
        }

        return {
            hourAnglePolaris,
            plusHourAnglePolaris // I think this is the correct one
        };
    }

    haToDegrees( ha ) {
        return divide( multiply( 360, ha ), 24 );
    }
}

const PolarisCalculatorInstance = new PolarScopeCalculator();


export {
    PolarScopeUtilitiesInstance,
    PolarScopeDateUtilitiesInstance,
    PolarisCalculatorInstance
};
