//string utility functions
//some string functions
function reverse( inStr ) {
    // js does not allow us to change the string passed in so 
    // reverse in place is dumb!
    var i, ilen, outStr = '';
    ilen = inStr.length;
    for ( i = ilen - 1; i >= 0; i -= 1 ) {
        outStr += inStr.charAt( i );
    }
    return outStr;
};

function replaceAll( inStr, oStr, nStr ) {
    // js does not allow us to change the string passed in
    var sStr, ilen, idx, olen, nlen, found, outStr = inStr;
    ilen = inStr.length;
    idx = inStr.indexOf( oStr );
    olen = oStr.length;
    nlen = nStr.length;
    found = ( idx !== -1 );
    while ( found ) {
        outStr = outStr.substring( 0, idx ) + nStr + outStr.substring( idx + olen );
        sStr = outStr.substring( idx + olen );
        idx = sStr.indexOf( oStr );
        found = ( idx !== -1 );
        idx += outStr.length - sStr.length;
    }
    return outStr;
};

function removeDoubleSpaces( instr ) {
    while ( instr && instr.match( /\s\s/ ) ) {
        instr = instr.replace( /\s\s/g, ' ' );
    }
    return instr;
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
    return ( trim( inStr ) === "" );
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
