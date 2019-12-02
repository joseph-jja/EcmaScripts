import {
    convertFromBaseXToBaseTen,
    convertFromBaseTenToBaseX
} from 'utils/mathFunctions';

function rgbToHsl( r, g, b ) {
    const max = Math.max( r, g, b ),
        min = Math.min( r, g, b );
    let h, s, l = ( max + min ) / 2;

    if ( max === min ) {
        h = s = 0; // achromatic
    } else {
        let d = max - min;
        s = l > 0.5 ? d / ( 2 - max - min ) : d / ( max + min );
        switch ( max ) {
        case r:
            h = ( g - b ) / d + ( g < b ? 6 : 0 );
            break;
        case g:
            h = ( b - r ) / d + 2;
            break;
        case b:
            h = ( r - g ) / d + 4;
            break;
        }
        h /= 6;
    }
    return new Array( h * 360, s * 100, l * 100 );
}

function sortColors( rgb1, rgb2 ) {
    const r1 = convertFromBaseXToBaseTen( 16, rgb1.substring( 1, 2 ) ),
        g1 = convertFromBaseXToBaseTen( 16, rgb1.substring( 2, 3 ) ),
        b1 = convertFromBaseXToBaseTen( 16, rgb1.substring( 3, 4 ) ),
        r2 = convertFromBaseXToBaseTen( 16, rgb2.substring( 1, 2 ) ),
        g2 = convertFromBaseXToBaseTen( 16, rgb2.substring( 2, 3 ) ),
        b2 = convertFromBaseXToBaseTen( 16, rgb2.substring( 3, 4 ) );

    const hsl1 = rgbToHsl( ( r1 * 17) / 255, ( g1 * 17) / 255, ( b1 * 17) / 255 )[ 0 ],
        hsl2 = rgbToHsl( ( r2 * 17) / 255, ( g2 * 17) / 255, ( b2 * 17) / 255)[ 0 ];

    const res1 = ( +r1 + +g1 + +b1), 
        res2 = ( +r2 + +g2 + +b2);

    const max1 = Math.max( r1, g1, b1 ),
        min1 = Math.min( r1, g1, b1 ), 
        max2 = Math.max( r2, g2, b2 ),
        min2 = Math.min( r2, g2, b2 );

    return hsl2 - hsl1;
}

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

    renderThrees( results, colors, 0, rlen );
    return results.sort( sortColors );
}

export {
    getHex
};
