// module for checking data types 

export typeCheck = function ( o, s, input ) {
        return ( input instanceof o || ( typeof input ).toLowerCase() === s ) ? true : false;
    };

    // only exists if it is not undefined
export exists = function ( x ) {
        var exists = false;
        try {
            exists = ( typeof x !== 'undefined' && x !== null );
        } catch ( e ) {
            exists = false;
        }
        return exists;
    };

export isString = function ( input ) {
        return typeCheck( String, "string", input );
    };

export isNumber = function ( input ) {
        return typeCheck( Number, "number", input );
    };

export isArray = function ( input ) {
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

export isFunction = function ( input ) {
        return typeCheck( Function, "function", input );
    };

export isObject = function ( input ) {
        return typeCheck( Object, "object", input );
    };

export isRegExp = function ( input ) {
        return typeCheck( RegExp, "regexp", input );
    };

export isInput = function ( input ) {
        var inp = typeof input,
            name = input.nodeName;
        name = ( name ? name : "" );
        return ( name.toLowerCase() === "input" || ( inp.toLowerCase() === "input" && typeof inp[ 'type' ] !== 'undefined' ) );
    };

