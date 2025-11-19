import {
    add,
    subtract,
    multiply,
    divide,
    degreesToRadians,
    radiansToDegrees
} from '/js/utils/mathFunctions';
import AstronomyDateUtilitiesInstance from '/js/client/components/space/AstronomyDateUtilities';
import AstronomyMathUtilitiesInstance from '/js/client/components/space/AstronomyMathUtilities';

// alt, az, lat, long are in degrees
// internally this will convert all to radians for the dec/ra calculations
// it will compute the local sidereal time as well
// use AstronomyMathUtilitiesInstance.degreeHHMMSSToDegrees from AstronomyMathUtilities to convert 
// HH degree MM minutes SS.S seconds to degrees to pass into this function
export default function altAzToRaDec( alt, az, lat, lon, localTime ) {

    // more accurate method
    const utcTime = AstronomyDateUtilitiesInstance.toUTC( localTime );
    const julianDate = AstronomyDateUtilitiesInstance.toJulian( utcTime );
    const gmst = AstronomyDateUtilitiesInstance.toGMST( julianDate );
    const lst = AstronomyDateUtilitiesInstance.gmstToLST( gmst, lon );

    // need radians
    const latR = degreesToRadians( lat );
    const azR = degreesToRadians( az );
    const altR = degreesToRadians( alt );

    const sinLat = Math.sin( latR );
    const cosLat = Math.cos( latR );
    const sinAlt = Math.sin( altR );
    const cosAlt = Math.cos( altR );
    const cosAz = Math.cos( azR );
    const sinAz = Math.sin( azR );

    // now calculate the declination 
    const sinDec = add( multiply( sinAlt, sinLat ), multiply( cosAlt, cosLat, cosAz ) );
    const decR = Math.asin( sinDec );
    const cosDecR = Math.cos( decR );
    // this is the dec in degrees xxx.yyyyy
    const dec = radiansToDegrees( decR );

    // both these methods of computing hour angle come up with same value
    const hourAngleX = divide( multiply( multiply( -1, sinAz ), cosAlt ), cosDecR );
    const hourAngleY = divide( subtract( sinAlt, multiply( sinDec, sinLat ) ), multiply( cosDecR, cosLat ) );
    const hourAngle = radiansToDegrees( Math.atan2( hourAngleX, hourAngleY ) );

    // this method is occassionally off 
    const hourAngleAlt = radiansToDegrees( divide( subtract( sinAlt, multiply( sinLat, sinDec ) ), multiply( cosLat, cosDecR ) ) );

    // third try
    const angleOne = multiply( cosAz, sinLat );
    const angleTwo = multiply( -1, sinAz );
    const angleThree = multiply( Math.tan( alt ), cosLat );
    let hourAngleThree = Math.atan2( angleTwo, subtract( angleThree, angleOne ) );
    if ( hourAngleThree < 0 ) {
        hourAngleThree += Math.PI * 2;
    }

    // now compute ra
    const ra = subtract( lst, hourAngle );
    const raAlt = subtract( lst, hourAngleAlt );
    const raThree = subtract( lst, hourAngleThree );

    const decInHMS = AstronomyMathUtilitiesInstance.decDegreesToHourMinutesSeconds( dec );
    const raInHMS = AstronomyMathUtilitiesInstance.raDegreesToHourMinutesSeconds( ra );
    const raInHMSAlt = AstronomyMathUtilitiesInstance.raDegreesToHourMinutesSeconds( raAlt );
    const raInHMSThree = AstronomyMathUtilitiesInstance.raDegreesToHourMinutesSeconds( raThree );

    return {
        dec,
        decInHMS,
        ra,
        raInHMS,
        raAlt,
        raInHMSAlt,
        raThree,
        raInHMSThree
    };
};
