import {
    add,
    subtract,
    multiply,
    divide,
    convertFromBaseXToBaseTen,
    convertFromBaseTenToBaseX
} from 'utils/mathFunctions';

function alpha( r, g, b ) {
    return multiply( 0.5, subtract( multiply( 2, r ), g, b ) );
}

function beta( g, b ) {
    return ( divide( Math.sqrt( 3 ), 2 ) * subtract( g, b ) );
}

function hue( a, b ) {
    return Math.atan2( b, a );
}

function chroma( a, b ) {
    return Math.sqrt( add( ( a * a ), ( b * b ) ) );
}

function hcl( red, green, blue ) {

    const a = alpha( red, green, blue ),
        b = beta( green, blue );

    const h = hue( a, b ),
        c = chroma( a, b );

    return [ h, c ];
}

function sortColors( rgb1, rgb2 ) {

    const r1 = convertFromBaseXToBaseTen( 16, rgb1.substring( 1, 2 ) ),
        g1 = convertFromBaseXToBaseTen( 16, rgb1.substring( 2, 3 ) ),
        b1 = convertFromBaseXToBaseTen( 16, rgb1.substring( 3, 4 ) ),
        r2 = convertFromBaseXToBaseTen( 16, rgb2.substring( 1, 2 ) ),
        g2 = convertFromBaseXToBaseTen( 16, rgb2.substring( 2, 3 ) ),
        b2 = convertFromBaseXToBaseTen( 16, rgb2.substring( 3, 4 ) );

    const max1 = Math.max( r1, g1, b1 ),
        min1 = Math.min( r1, g1, b1 ),
        max2 = Math.max( r2, g2, b2 ),
        min2 = Math.min( r2, g2, b2 );

    // hue chroma
    const chroma1 = max1 - min1,
        chroma2 = max2 - min2;

    const _hcl1 = hcl( r1, g1, b1 ),
        _hcl2 = hcl( r2, g2, b2 );

    if ( chroma1 === 0 && chroma2 === 0 ) {
        // handle 000 vs 111
        return max1 - max2;
    } else if ( max1 < max2 ) {
        return -1;
    } else if ( max1 > max2 ) {
        return 1;
    } else if ( max1 === max2 ) {
        if ( r1 === max1 ) {
            return r1 - r2;
        } else if ( g1 === max1 ) {
            return g1 - g2;
        } else if ( b1 === max1 ) {
            return b1 - b2;
        }
    }

    // it does not seem like we get here
    return 0;
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
