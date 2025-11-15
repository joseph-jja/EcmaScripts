// these are to export to play with 
import mathFunctions from '/js/utils/mathFunctions';
import AstronomyMathUtilitiesInstance from '/js/client/components/space/AstronomyMathUtilities';
import AstronomyDateUtilitiesInstance from '/js/client/components/space/AstronomyDateUtilities';
import altAzToRaDec from '/js/client/components/space/altAzToRaDec';

const AstronomyMath = {
    AMU: AstronomyMathUtilitiesInstance,
    ADU: AstronomyDateUtilitiesInstance,
    altAzToRaDec: altAzToRaDec,
    mathFunctions: mathFunctions
};

export default AstronomyMath;
