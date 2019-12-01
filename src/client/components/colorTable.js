import {
    convertFromBaseTenToBaseX
} from 'utils/mathFunctions';

function getHexValues() {

    const rgbVal = [];
    for ( let i = 0; i < 16; i++ ) {
        //for ( let j = 0; j < 16; j++ ) {
        const left = convertFromBaseTenToBaseX( 16, i );
        //    right = convertFromBaseTenToBaseX( 16, j );
        // for simplicity instead of rrggbb we just do rgb 
        // so black is 000 not 000000 and we reduce the number of colors
        // rgbVal.push( `${left}${right}` );
        rgbVal.push( `${left}` );
        //}
    }
    return rgbVal;
}

// should return hex values from #000000 to ffffff
function getHex() {

    const results = [];
    const colors = getHexValues();
    const rlen = colors.length;
    for ( let a = 0; a < 10; a++ ) {
        const i = colors[ a ];
        for ( let b = 0; b < 10; b++ ) {
            const j = colors[ b ];
            for ( let c = 0; c < 10; c++ ) {
                const k = colors[ c ];
                results.push( `#${i}${j}${k}` );
            }
        }
    }
    for ( let a = 10; a < rlen; a++ ) {
        const i = colors[ a ];
        for ( let b = 10; b < rlen; b++ ) {
            const j = colors[ b ];
            for ( let c = 10; c < rlen; c++ ) {
                const k = colors[ c ];
                results.push( `#${i}${j}${k}` );
            }
        }
    }
    return results;
}

export {
    getHex
};
