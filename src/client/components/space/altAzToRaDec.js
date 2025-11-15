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
export default function altAzToRaDec(alt, az, lat, lon, localTime) {

    // more accurate method
    const utcTime = AstronomyDateUtilitiesInstance.toUTC(localTime);
    const julianDate = AstronomyDateUtilitiesInstance.toJulian(utcTime);
    const gmst = AstronomyDateUtilitiesInstance.toGMST2(julianDate);
    let lst = AstronomyDateUtilitiesInstance.gmstToLST2(gmst, lon); 

    // need radians
    const latR = degreesToRadians(lat);
    const azR = degreesToRadians(az);
    const altR = degreesToRadians(alt);
    
    const sinLat = Math.sin(latR);
    const cosLat = Math.cos(latR);
    const sinAlt = Math.sin(altR);
    const cosAlt = Math.cos(altR);
    const cosAz = Math.cos(azR);
    const sinAz = Math.sin(azR);

    // now calculate the declination 
    const sinDec = add(multiply(sinAlt, sinLat), multiply(cosAlt, cosLat, cosAz));
    const decR = Math.asin(sinDec);
    const cosDecR = Math.cos(decR);
    // this is the dec in degrees xxx.yyyyy
    const dec = radiansToDegrees(decR); 

    // both these methods of computing hour angle come up with same value
    const hourAngleX = divide( multiply( multiply(-1, sinAz), cosAlt ), cosDecR);
    const hourAngleY = divide( subtract( sinAlt, multiply( sinDec, sinLat ) ),  multiply( cosDecR, cosLat ) );
    const hourAngle = radiansToDegrees(Math.atan2(hourAngleX, hourAngleY));
    // this method is occassionally off 
    // const hourAngle = radiansToDegrees(divide(subtract(sinAlt, multiply(sinLat, sinDec)), multiply(cosLat, cosDecR)));

    // now compute ra
    const ra = subtract(lst, hourAngle);

    const decInHMS = AstronomyMathUtilitiesInstance.decDegreesToHourMinutesSeconds( dec );
    const raInHMS = AstronomyMathUtilitiesInstance.raDegreesToHourMinutesSeconds( ra );
    
    return {
        dec,
        decInHMS,
        ra,
        hourAngle
    };
};
