const decode = decodeURIComponent;
const encode = encodeURIComponent;

const COOKIE_MATCH = /([^=]+)=/i,
    SPLIT_COOKIES = /; /g;

const decodeKeyValue = ( cookie ) => {
    const ck = cookie.match( COOKIE_MATCH );
    const result = {};
    if ( ck instanceof Array ) {
        try {
            result[ 'name' ] = decode( ck[ 1 ] );
            result[ 'value' ] = decode( cookie.substring( ck[ 1 ].length + 1 ) );
        } catch ( ex ) {
            // ignore
        }
    } else {
        result[ 'name' ] = decode( cookie );
    }
    return result;
};

function findCookieByName( cookieName, cookieData ) {

    // this will throw if in server mode and there is no document object :) 
    const dc = ( cookieData || document.cookie || '' ),
        cookies = dc.split( SPLIT_COOKIES );

    const result = cookies.map( cookie => {
        const {
            name,
            value
        } = decodeKeyValue( cookie );
        return {
            name,
            value
        };
    } ).filter( cookie => {
        const {
            name
        } = cookie;
        return ( name === cookieName );
    } ).map( cookie => {
        const {
            value
        } = cookie;
        return value;
    } );
    return result[ 0 ];
};

// can be used both server side or client side
function get( name, cookieData ) {
    return findCookieByName( name, cookieData );
};

function checkOption( options, opt, useVal ) {

    let result = '';

    if ( typeof options !== 'undefined' && options[ opt ] ) {
        result = ";" + opt + ( useVal ? "=" + options[ opt ] : '' );
    }
    return result;
}

function set( name, value, options ) {
    let ename, evalue, data,
        isServer;

    ename = encode( name );
    evalue = encode( value );

    data = ename + "=" + evalue;

    data += checkOption( options, 'path', true );
    data += checkOption( options, 'domain', true );

    isServer = ( ( checkOption( options, 'server' ) !== '' ) ? true : false );

    data += checkOption( options, 'expires', true );
    data += checkOption( options, 'Max-Age', true );

    data += checkOption( options, 'Secure', false );
    data += checkOption( options, 'HttpOnly', false );
    data += checkOption( options, 'SameSite', true );

    if ( !isServer ) {
        document.cookie = data;
    }
    return data;
};

function remove( name ) {
    const now = new Date(),
        exists = findCookieByName( name );
    if ( exists ) {
        now.setFullYear( 1970 );
        set( name, undefined, {
            expires: now
        } );
    }
};

function count( cookieData ) {
    return ( cookieData || document.cookie ).split( SPLIT_COOKIES ).length;
};

function length( cookieData ) {
    return ( cookieData || document.cookie ).length;
};

export {
    get,
    set,
    remove,
    count,
    length
};
