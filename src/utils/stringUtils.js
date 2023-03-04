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
    removeDoubleSpaces,
    ltrim,
    rtrim,
    trim,
    isEmpty
};
