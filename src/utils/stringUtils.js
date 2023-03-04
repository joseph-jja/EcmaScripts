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

function isEmpty( inStr ) {
    return ( !inStr || inStr.trim() === "" );
};

export {
    reverse,
    removeDoubleSpaces,
    isEmpty
};
