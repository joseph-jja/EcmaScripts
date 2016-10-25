// module for checking data types 
function typeCheck( o, s, input ) {
    return ( input instanceof o || ( typeof input ).toLowerCase() === s ) ? true : false;
};

// only exists if it is not undefined
function exists( x ) {
    var exists = false;
    try {
        exists = ( typeof x !== 'undefined' && x !== null );
    } catch ( e ) {
        exists = false;
    }
    return exists;
};

function isString( input ) {
    return typeCheck( String, "string", input );
};

function isNumber( input ) {
    return typeCheck( Number, "number", input );
};

function isArray( input ) {
    var yes = typeCheck( Array, "array", input );
    if ( !yes ) {
        yes = ( Object.prototype.toString.apply( input ).toLowerCase().indexOf( "collection" ) !== -1 );
    }
    if ( !yes ) {
        yes = ( Object.prototype.toString.apply( input ).toLowerCase().indexOf( "nodelist" ) !== -1 );
    }
    if ( !yes ) {
        yes = ( ( typeof input.length ).toLowerCase() === "number" );
    }
    return yes;
};

function isFunction( input ) {
    return typeCheck( Function, "function", input );
};

function isObject( input ) {
    return typeCheck( Object, "object", input );
};

function isRegExp( input ) {
    return typeCheck( RegExp, "regexp", input );
};

function isInput( input ) {
    var inp = typeof input,
        name = input.nodeName;
    name = ( name ? name : "" );
    return ( name.toLowerCase() === "input" || ( inp.toLowerCase() === "input" && typeof inp[ 'type' ] !== 'undefined' ) );
};

export {
    typeCheck,
    exists,
    isString,
    isNumber,
    isArray,
    isObject,
    isRegExp,
    isInput
};
