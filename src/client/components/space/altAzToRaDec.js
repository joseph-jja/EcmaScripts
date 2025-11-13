import {
    add,
    subtract,
    multiply,
    divide
} from '/js/utils/mathFunctions';
import AstronomyMathUtilitiesInstance from '/js//client/components/space/AstronomyMathUtilities';
import AstronomyDateUtilitiesInstance from '/js//client/components/space/AstronomyDateUtilities';

// alt, az, lat, long are in degrees
export default function altAzToRaDec(alt, az, lat, lon, localTime) {

    // more accurate method
    const utcTime = AstronomyDateUtilitiesInstance.toUTC(localTime);
    const lst = AstronomyDateUtilitiesInstance.utcToLST(utcTime, lon);

    // need radians
    const latR = degreesToRadians(lat);
    const longR = degreesToRadians(lon);
    const azR = degreesToRadians(az);
    const altR = degreesToRadians(alt);
    
    const sinLat = Math.sin(latR);
    const cosLat = Math.cos(latR);
    const sinAlt = Math.sin(altR);
    const cosAlt = Math.cos(altR);
    const cosAz = Math.cos(azR);

    const sinDec = add(multiply(sinAlt, sinLat), multiply(cosAlt, cosLat, cosAz));
    const decR = Math.asin(sinDec);
    const cosDecR = Math.cos(decR);
    const hourAngleR = divide(subtract(sinAlt, multiply(sinLat, sinDec)), multiply(cosLat, cosDecR));
    const hourAngle = Math.asin(hourAngleR);

    const dec = add(radiansToDegrees(decR), 0);//0.6666666666666666);
    const ra = add(subtract(lst, hourAngle), 0);
  
    return {
        dec,
        ra
    };
};
