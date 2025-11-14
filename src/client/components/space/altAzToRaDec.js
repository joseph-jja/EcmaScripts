import {
    add,
    subtract,
    multiply,
    divide,
    degreesToRadians,
    radiansToDegrees
} from '/js/utils/mathFunctions';
import AstronomyDateUtilitiesInstance from '/js//client/components/space/AstronomyDateUtilities';

// alt, az, lat, long are in degrees
export default function altAzToRaDec(alt, az, lat, lon, localTime) {

    // more accurate method
    const utcTime = AstronomyDateUtilitiesInstance.toUTC(localTime);
    const julianDate = AstronomyDateUtilitiesInstance.toJulian(utcTime);
    const gmst = AstronomyDateUtilitiesInstance.toGMST2(julianDate);
    const lst = AstronomyDateUtilitiesInstance.gmstToLST2(gmst, lon); 

    // need radians
    const latR = degreesToRadians(lat);
    const azR = degreesToRadians(az);
    const altR = degreesToRadians(alt);
    
    const sinLat = Math.sin(latR);
    const cosLat = Math.cos(latR);
    const sinAlt = Math.sin(altR);
    const cosAlt = Math.cos(altR);
    const cosAz = Math.cos(azR);

    // now calculate the declination 
    const sinDec = add(multiply(sinAlt, sinLat), multiply(cosAlt, cosLat, cosAz));
    const decR = Math.asin(sinDec);
    const cosDecR = Math.cos(decR);
    const dec = radiansToDegrees(decR); // this is the dec in degrees xxx.yyyyy
    
    const hourAngleR = divide(subtract(sinAlt, multiply(sinLat, sinDec)), multiply(cosLat, cosDecR));
    let hourAngle = radiansToDegrees(Math.acos(hourAngleR));
    if (hourAngle < 180) {
        hourAngle = multiply( -1, hourAngle);
    }

    const ra = subtract(lst, hourAngle);
    
    return {
        dec,
        ra
    };
};
