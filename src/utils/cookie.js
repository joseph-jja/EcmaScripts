const decode = ( typeof decodeURIComponent !== "undefined" ) ? decodeURIComponent : unescape;
const encode = ( typeof encodeURIComponent !== "undefined" ) ? encodeURIComponent : escape;

function findCookieByName( cookieName, cookieData ) {
    let ck, ckidx, name, value;

    // this will throw if in server mode and there is no document object :) 
    const dc = ( cookieData || document.cookie ),
        cookies = dc.split( ";" ),
        dclen = cookies.length;
    for ( let x = 0; x < dclen; x += 1 ) {
        ck = cookies[ x ].match( /([^=]+)=/i );
        if ( ck instanceof Array ) {
            try {
                name = decode( ck[ 1 ] );
                value = decode( cookies[ x ].substring( ck[ 1 ].length + 1 ) );
            } catch ( ex ) {
                // ignore
            }
        } else {
            name = decode( cookies[ x ] );
            value = "";
        }
        if ( name === cookieName ) {
            break;
        }
    }
    return value;
};

// can be used both server side or client side
function get( name, cookieData ) {
    return findCookieByName( name, cookieData );
};

function checkOption( options, opt, useVal ) {

    var result = '';

    if ( typeof options !== 'undefined' && options[ opt ] ) {
        result = ";" + opt + ( useVal ? "=" + options[ opt ] : '' );
    }
    return result;
}

function set( name, value, options ) {
    var ename, evalue, data,
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
    var exists, now = new Date();
    exists = findCookieByName( name );
    now.setFullYear( 1970 );
    set( name, "", {
        expires: now
    } );
};

function count( cookieData ) {
    return ( cookieData || document.cookie ).split( ";" ).length;
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
