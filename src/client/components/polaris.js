const Polaris = {
    RightAscension: 2.5301944,
    Declination: 89.2641667
};

const SigmaOctantis = {
    RightAscension: 21.0786056,
    Declination: -77.4311111
};

class Utilities {

    // degrees to hour angle
    hoursMinutesSeconds( degrees ) {
        let hours = Math.floor( degrees );
        hours = ( hours < 0 ? 24 + +hours : hours );

        let minutes = Math.floor( 60 * this.getFraction( degrees ) );
        let seconds = Math.round( 60 * ( 60 * this.getFraction( degrees ) - minutes ) );

        let result = ( minutes >= 10 ? hours + ":" + minutes : hours + ":0" + minutes );

        return ( seconds < 10 ? result + ":0" + seconds : result + ":" + seconds );
    }

    // takes hour angle and converts to degrees
    hourAngleToDegrees( hour, minute, seconds ) {
        return ( +hour + ( minute / 60 ) + ( seconds / 3600 ) );
    }

    // not sure this works right
    mapTo24Hour( hour ) {
        let result = hour;
        if ( result < 0 ) {
            result = ( result - 24 ) * ( result / 24 - 1 );
        } else if ( result >= 24 ) {
            result = result - result / 24 * 24;
        }
        return result;
    }

    pad( x ) {
        return ( x < 10 ? `0${x}` : `${x}` );
    }

    getFraction( num ) {
        // get decimal places
        const decimals = num - Math.floor( num );
        // we want positive number
        return ( decimals < 0 ? decimals + 1 : decimals );
    }
}

const utils = new Utilities();

class DateConversion {

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
        let n = d.month + 1,
            r = d.year,
            i = +d.hours + +d.minutes / 60 + +d.seconds / 3600; // universal time
        if ( n <= 2 ) {
            n += 12;
            r -= 1;
        }
        const p = Math.floor( r / 100 );
        const s = ( Math.floor( 365.25 * ( r + 4716 ) ) + Math.floor( 30.6001 * ( n + 1 ) ) + t - 13 - 1524.5 + i / 24 );
        return ( n <= 2 && ( n, r ), p, s );
    }

    // takes output of toJulien called internal
    toGMST( d ) {
        const r = d - 2400000.5;
        const n = Math.floor( r );
        const t = ( n - 51544.5 ) / 36525;
        return 6.697374558 + 24 * ( r - n ) * 1.0027379093 + ( 8640184.812866 + ( .093104 - 62e-7 * t ) * t ) * t / 3600;
    }

    // takes output of toGMST and longitude called internal
    gmstToLST( d, longitude ) {
        return 24 * utils.getFraction( ( d + longitude / 15 ) / 24 );
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

    // alternate method to calculate LST
    calculateLST( now, latitude ) {

        const julianDate = ( now.getTime() / 86400000 ) + 2440587.5;
        const D = julianDate - 2451545.0; // calculate number of days since January 1, 2000 at 12:00 UT
        const UT = now.getUTCHours() + now.getUTCMinutes() / 60 + now.getUTCSeconds() / 3600; // calculate Universal Time
        const GMST = 6.697374558 + 0.06570982441908 * D + 1.00273790935 * UT; // calculate Greenwich Mean Sidereal Time
        const LST = utils.getFraction( ( GMST + latitude / 15 ) / 24 ); // calculate local sidereal time
        return ( 24 * LST ); // adjust for negative values
    }

}

const dateUtils = new DateConversion();

class PolarisMath {
    precessionCorrection( e, latitude ) {
        let t = dateUtils.toJulien( e ),
            n = Polaris.RightAscension,
            r = Polaris.Declination;
        if ( latitude < 0 ) {
            n = SigmaOctantis.RightAscension;
            r = SigmaOctantis.Declination;
        }
        let i = n * Math.PI / 12,
            o = r * Math.PI / 180;
        if ( latitude < 0 ) {
            this.correctedRA = n + ( 3.075 + 1.336 * Math.sin( 15 * n ) * 57.08839 ) * ( e.year - 2e3 ) / 3600;
            this.correctedDEC = r + 20.04 * Math.cos( 15 * r ) * ( e.year - 2e3 ) / 3600;
        } else {
            var s = ( t - 2451545 ) / 36525,
                f = 2306.2181 * s + .30188 * s * s + .017998 * s * s * s,
                d = 2306.2181 * s + 1.09468 * s * s + .018203 * s * s * s,
                p = 2004.3109 * s + -.42665 * s * s + -.041833 * s * s * s;
            f = f * Math.PI / 648e3;
            d = d * Math.PI / 648e3;
            p = p * Math.PI / 648e3;
            var h = Math.sin( i + f ) * Math.cos( o ),
                g = Math.cos( i + f ) * Math.cos( p ) * Math.cos( o ) - Math.sin( p ) * Math.sin( o ),
                v = Math.cos( i + f ) * Math.sin( p ) * Math.cos( o ) + Math.cos( p ) * Math.sin( o );
            this.correctedDEC = v > .9 ?
                Math.acos( Math.sqrt( h * h + g * g ) ) :
                v < -.9 ? -Math.acos( Math.sqrt( h * h + g * g ) ) : Math.asin( v );
            this.correctedRA = Math.atan2( h, g ) + d;
            this.correctedRA = 12 * this.correctedRA / Math.PI;
            this.correctedDEC = 180 * this.correctedDEC / Math.PI;
            if ( this.correctedDEC > 90 ) {
                this.correctedDEC = 180 - this.correctedDEC;
                this.correctedRA = this.correctedRA + 12;
            }
            if ( this.correctedDEC < -90 ) {
                this.correctedDEC = -180 - this.correctedDEC;
                this.correctedRA = this.correctedRA + 12;
            }
            this.correctedRA = utils.mapTo24Hour( this.correctedRA );
        }
    }

    getPolarisHA( now, latitude ) {
        const isDST = dateUtils.isDST( now );
        const utcNow = dateUtils.toUTC( now );
        this.precessionCorrection( utcNow, latitude );
        const lst = dateUtils.utcToLST( utcNow, latitude );
        let t = lst - this.correctedRA;
        let p = lst + this.correctedRA;
        if ( latitude < 0 ) {
            if ( t < 0 ) {
                t = Math.abs( t );
            } else {
                t = -t;
            }
            if ( p < 0 ) {
                p = Math.abs( p );
            } else {
                p = -p;
            }
        }
        const haDST = ( isDST ? +t + 1 : t );
        return {
            ha: t,
            haDST: haDST,
            pha: p
        };
    }

    getPolarisHourAngle( latitude, rightAssention ) {

        // get utc time
        const now = new Date();
        const isDST = dateUtils.isDST( now );

        const localSideRealTime = dateUtils.calculateLST( now, latitude );

        const hourAnglePolaris = Number( localSideRealTime - rightAssention ).toFixed( 6 );
        const hourAnglePolarisDST = Number( localSideRealTime - rightAssention ).toFixed( 6 ) + ( isDST ? 1 : 0 );
        const plusHourAnglePolaris = Number( localSideRealTime + rightAssention ).toFixed( 6 );

        return {
            hourAnglePolaris,
            hourAnglePolarisDST,
            plusHourAnglePolaris
        };
    }

    haToDegrees( ha ) {
        return 360 * ha / 24;
    }
}

const PolarisCalculator = new PolarisMath();

export {
    utils,
    dateUtils,
    PolarisCalculator
};
