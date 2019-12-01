import {
    convertFromBaseTenToBaseX
} from 'utils/mathFunctions';

function getHexValues() {

    const rgbVal = [];
    for ( let i = 0; i < 16; i++ ) {
        for ( let j = 0; j < 16; j++ ) {
            const left = convertFromBaseTenToBaseX( 16, i ),
                right = convertFromBaseTenToBaseX( 16, j );
            rgbVal.push( `${left}${right}` );
        }
    }
    return rgbVal;
}

// should return hex values from #000000 to ffffff
function getHex() {

    const results = [];
    const redVal = getHexValues(),
        greenVal = getHexValues(),
        blueVal = getHexValues();
    for ( let a = 0; a < redVal.length; a++ ) {
        const i = redVal[ a ];
        for ( let b = 0; b < greenVal.length; b++ ) {
            const j = greenVal[ b ];
            for ( let c = 0; c < blueVal.length; c++ ) {
                const k = blueVal[ c ];
                results.push( `#${i}${j}${k}` );
            }
        }
    }
    return results;
}

export {
    getHex
};
