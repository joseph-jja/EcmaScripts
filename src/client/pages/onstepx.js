// these are to export to play with 
import mathFunctions from '/js/utils/mathFunctions';
import AstronomyMathUtilitiesInstance from '/js/client/components/space/AstronomyMathUtilities';
import AstronomyDateUtilitiesInstance from '/js/client/components/space/AstronomyDateUtilities';
import altAzToRaDec from '/js/client/components/space/altAzToRaDec';

window.AMU = AstronomyMathUtilitiesInstance;
window.ADU = AstronomyDateUtilitiesInstance;
window.altAzToRaDec = altAzToRaDec;
window.mathFunctions = mathFunctions;
