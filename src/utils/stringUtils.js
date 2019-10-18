//string utility functions
//some string functions
function reverse( inStr ) {
    // js does not allow us to change the string passed in so 
    // reverse in place is dumb!
    let outStr = '';
    const ilen = inStr.length;
    for ( let i = ilen - 1; i >= 0; i -= 1 ) {
        outStr += inStr.charAt( i );
    }
    return outStr;
};

function replaceAll( inStr, oStr, nStr ) {
    // js does not allow us to change the string passed in
    let outStr = inStr,
        idx = inStr.indexOf( oStr ),
        olen = oStr.length,
        found = ( idx !== -1 );
    while ( found ) {
        outStr = outStr.substring( 0, idx ) + nStr + outStr.substring( idx + olen );
        const sStr = outStr.substring( idx + olen );
        idx = sStr.indexOf( oStr );
        found = ( idx !== -1 );
        idx += outStr.length - sStr.length;
    }
    return outStr;
};

function removeDoubleSpaces( instr ) {
    let out = instr;
    while ( out && out.match( /\s\s/ ) ) {
        out = out.replace( /\s\s/g, ' ' );
    }
    return out;
};

function ltrim( instr ) {
    return ( instr ? instr.replace( /^\s+/g, '' ) : instr );
};


function rtrim( instr ) {
    return ( instr ? instr.replace( /\s+$/g, '' ) : instr );
};

function trim( inStr ) {
    return ltrim( rtrim( inStr ) );
};

function isEmpty( inStr ) {
    return ( !inStr || trim( inStr ) === "" );
};

export {
    reverse,
    replaceAll,
    removeDoubleSpaces,
    ltrim,
    rtrim,
    trim,
    isEmpty
};
