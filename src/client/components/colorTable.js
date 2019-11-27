import {
    convertFromBaseTenToBaseX
} from 'utils/mathFunctions';

function getHexValues() {

    const rgbVal = [];
    for ( let i = 0; i < 16; i++ ) {
        for ( let j = 0; j < 16; j++ ) {
            rgbVal.push( `${convertFromBaseTenToBaseX(j, 16)}${convertFromBaseTenToBaseX(i)}` );
        }
    }
    return rgbVal;
}

// should return hex values from #000000 to ffffff
function getHex() {

    const results = [];
    const redVal = getHexValues();
    for ( const i of redVal ) {
        const greenVal = getHexValues();
        for ( const j of greenVal ) {
            const blueVal = getHexValues();
            for ( const k of blueVal ) {
                results.push( `#${i}${j}${k}` );
            }
        }
    }
    return results;
}

export {
    getHex
};
