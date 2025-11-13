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

    const lst = AstronomyDateUtilitiesInstance.calculateLST(localTime, lon);
    const lstt = AstronomyDateUtilitiesInstance.utcToLST(AstronomyDateUtilitiesInstance.toUTC(localTime), lon);

    const sinDec = add(multiply(Math.sin(alt), Math.sin(lat)), multiply(Math.cos(alt), Math.cos(lat), Math.cos(az)));
    const hourAngleRad = divide(subtract(Math.sin(alt), multiply(Math.sin(lat), sinDec)), multiply(Math.cos(lat), Math.cos(az)));

    const dec = Math.asin(sinDec);
    const hourAngle = Math.asin(hourAngleRad);

    const ra = subtract(lst, hourAngle);
  
    return {
        dec,
        ra
    };
};
