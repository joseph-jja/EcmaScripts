import {
    add,
    subtract,
    multiply,
    divide
} from '/js/utils/mathFunctions';
import AstronomyMathUtilitiesInstance from '/js//client/components/space/AstronomyMathUtilities';
import AstronomyDateUtilitiesInstance from '/js//client/components/space/AstronomyDateUtilities';

export default altAzToRaDec(alt, az, lat, lon, localTime) {

  const lst = AstronomyDateUtilitiesInstance.calculateLST(localTime);
  

};
