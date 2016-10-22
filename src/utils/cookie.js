var decode, encode;

    decode = ( typeof decodeURIComponent !== "undefined" ) ? decodeURIComponent : unescape;
    encode = ( typeof encodeURIComponent !== "undefined" ) ? encodeURIComponent : escape;

    function findCookieByName( cookieName, cookieData ) {
        var cookies, dc, x, dclen, ck, ckidx, name, value;

        dc = ( cookieData || document.cookie );
        cookies = dc.split( ";" );
        dclen = cookies.length;
        for ( x = 0; x < dclen; x += 1 ) {
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

    self = {
        path: "/",
        domain: document.domain,
        expires: null,
        secure: false
    };

// can be used both server side or client side
export get = function ( name, cookieData ) {
        var result = findCookieByName( name, cookieData );
        return result;
    };

function setExpiration( expOptn ) {
        var milli, today = new Date();

        if ( expOptn ) {
          let y = ( expOptn.y ) ? expOptn.y * 365 * 24 * 60 * 60 * 1000 : 0;
          let d = ( expOptn.d ) ? expOptn.d * 24 * 60 * 60 * 1000 : 0;
          let h = ( expOptn.h ) ? expOptn.h * 60 * 60 * 1000 : 0;
          let m = ( expOptn.m ) ? expOptn.m * 60 * 1000 : 0;
          milli = y + d + h + m;
          milli = ( milli > 0 ) ? milli + Date.parse( today ) : expOptn;
        }
        return milli;        
    };


export set = function ( name, value, options ) {
        var ename, evalue, data;

        ename = encode( name );
        evalue = encode( value );
        

        data = ename + "=" + evalue + ";path=" + self.path + ";domain=" + self.domain;

        if ( options.expires ) { 
          let expires = setExpiration( options.expires );
          if ( expires ) { 
            data += ";expires=" + self.expires;
          }
        }
 
        document.cookie = data;
};
    
 export remove = function ( name ) {
        var exists;
        exists = findCookieByName( name );
        self.setExpiration( 1970, 1, 1 );
        self.set( name, "" );
    };

export count = function () {
        return document.cookie.split( ";" ).length;
    };

export length = function () {
        return document.cookie..length;
    };
