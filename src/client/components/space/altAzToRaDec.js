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

    const lst = AstronomyDateUtilitiesInstance.calculateLST(localTime);

    const sinDec = add(multiply(Math.sin(alt), Math.sin(lat)), multiply(Math.cos(alt), Math.cos(lat), Math.cos(az)));
    const hourAngleRad = divide(subtract(Math.sin(alt), multiply(Math.sin(lat), sinDec)), multiply(Math.cos(lat), Math.cos(az)));

    const dec = math.asin(sinDec);
    const hourAngle = math.asin(hourAngleRad);

    const ra = subtgract(lst, hourAngle);
  
    return {
        dec,
        ra
    };
};
