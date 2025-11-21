import {
    add,
    subtract,
    multiply,
    divide
} from '/js/utils/mathFunctions';
import AstronomyDateUtilitiesInstance from '/js/client/components/space/AstronomyDateUtilities';
import AstronomyMathUtilitiesInstance from '/js//client/components/space/AstronomyMathUtilities';

// some of this code was taken from takahashi-europe.com minified code
// unminfied and redone to make some sense 
// then compared to some code output by chatGPT
// then this code was converted into ES classes
const Polaris = {
    RightAscension: 3.1208056,
    Declination: 89.3742500
};

const SigmaOctantis = {
    RightAscension: 21.0786056,
    Declination: -77.4311111
};


class PolarScopeCalculator {

    calculateHourAngle(datetime, polarisRA, longitude) {

        const now = new Date();
        now.setFullYear(datetime.getFullYear());
        now.setMonth(datetime.getMonth());
        now.setDate(datetime.getDate());
        now.setHours(datetime.getHours());
        now.setMinutes(datetime.getMinutes());
        now.setSeconds(datetime.getSeconds());
        now.setMilliseconds(0);
        const localTime = new Date(now.getTime());
        const timezoneOffset = now.getTimezoneOffset() / 60;

        const utcTime = AstronomyDateUtilitiesInstance.toUTC( localTime );
        const julianDate = AstronomyDateUtilitiesInstance.toJulian( utcTime );
        const gmst = AstronomyDateUtilitiesInstance.toGMST( julianDate );
        const lst = AstronomyDateUtilitiesInstance.gmstToLST( gmst, longitude );
        const lstHours = divide(lst, 15); // lst is in hours now

        // computer hour angle = LST - RA
        const hourAngle = subtract(lstHours, polarisRA);
        const delta = subtract(timezoneOffset, hourAngle);
        if (delta < 0) {
            const positive = add(delta, 24); 
            return {
                correctHourAngle: subtract(24, positive),
                hourAngle
            };
        }
        return {
            correctHourAngle: delta,
            hourAngle
        };
    }
    
    // calculate offset of Polaris 
    // OMG crazy maths
    precessionCorrection( utc, latitude ) {
        const julianDate = AstronomyDateUtilitiesInstance.toJulian( utc );
        
        const ra = ( latitude < 0  ? SigmaOctantis.RightAscension: Polaris.RightAscension);
        const dec = ( latitude < 0  ? SigmaOctantis.Declination: Polaris.Declination);

        let i = divide( multiply( ra, Math.PI ), 12 ),
            o = divide( multiply( dec, Math.PI ), 180 );

        if ( latitude < 0 ) {
            this.correctedRA = add( ra, divide( multiply( add( 3.075, multiply( 1.336, Math.sin( multiply( 15, ra ) ), 57.08839 ) ), subtract( utc.year, 2e3 ) ), 3600 ) );
            this.correctedDEC = add( dec, divide( multiply( 20.04, Math.cos( multiply( 15, dec ) ), subtract( utc.year, 2e3 ) ), 3600 ) );
        } else {
            const s = divide( subtract( julianDate, 2451545 ), 36525 );
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
            this.correctedRA = AstronomyMathUtilitiesInstance.mapTo24Hour( this.correctedRA );
        }
    }

    // from the dot com
    getPolarisHA( now, latitude, longitude ) {
        const utcNow = AstronomyDateUtilitiesInstance.toUTC( now );
        this.precessionCorrection( utcNow, latitude );
        const lst = AstronomyDateUtilitiesInstance.utcToLST( utcNow, longitude );
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
    // this returns 2 values
    // one value 'hourAnglePolaris' is the hour angle commputed with the input RA
    // one value 'plusHourAnglePolaris' is the hour angle commputed with the constant RA and correction processing
    getPolarisHourAngle( now, latitude, longitude, rightAssention ) {

        // get utc time
        const utcNow = AstronomyDateUtilitiesInstance.toUTC( now );
        this.precessionCorrection( utcNow, latitude );

        const localSideRealTime = AstronomyDateUtilitiesInstance.calculateLST( now, longitude );

        let hourAnglePolaris = Number( subtract( localSideRealTime, rightAssention ) ).toFixed( 6 );
        let plusHourAnglePolaris = Number( subtract( localSideRealTime, this.correctedRA ) ).toFixed( 6 );

        if ( hourAnglePolaris < 0 ) {
            hourAnglePolaris = add( 24, hourAnglePolaris );
        }

        if ( plusHourAnglePolaris < 0 ) {
            plusHourAnglePolaris = add( 24, plusHourAnglePolaris );
        }

        const {
            correctHourAngle,
            hourAngle
        } = this.calculateHourAngle(now, rightAssention, longitude)

        return {
            hourAnglePolaris, // used input ra
            plusHourAnglePolaris, // corrected angle
            correctHourAngle,
            hourAngle
        };
    }

    haToDegrees( ha ) {
        return divide( multiply( 360, ha ), 24 );
    }
}

const PolarisCalculatorInstance = new PolarScopeCalculator();
export default PolarisCalculatorInstance;
