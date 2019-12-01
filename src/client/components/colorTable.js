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

function renderThrees( results, colors, start, end ) {

    for ( let a = start; a < end; a++ ) {
        const i = colors[ a ];
        for ( let b = start; b < end; b++ ) {
            const j = colors[ b ];
            for ( let c = start; c < end; c++ ) {
                const k = colors[ c ];
                results.push( `#${i}${j}${k}` );
            }
        }
    }
}

// should return hex values from #000000 to ffffff
function getHex() {

    const results = [];
    const colors = getHexValues();
    const rlen = colors.length;

    for ( let i = 0; i < 16; i++ ) {
        renderThrees( results, colors, i, i + 1 );
    }
    return results;
}

export {
    getHex
};
