//string utility functions
//some string functions
export reverse = function ( inStr ) {
        // js does not allow us to change the string passed in so 
        // reverse in place is dumb!
        var i, ilen, outStr = '';
        ilen = inStr.length;
        for ( i = ilen - 1; i >= 0; i -= 1 ) {
            outStr += inStr.charAt( i );
        }
        return outStr;
    };
    
export replaceAll = function ( inStr, oStr, nStr ) {
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
    
export removeDoubleSpaces = function ( instr ) {
        while ( instr.match( /\s\s/ ) ) {
            instr = instr ? instr.replace( /\s\s/g, ' ' ) : instr;
        }
        return instr;
    };
    
export ltrim = function ( instr ) {
        return ( instr ? instr.replace( /^\s+/g, '' ) : instr );
    };
    
    
export rtrim = function ( instr ) {
        return ( instr ? instr.replace( /\s+$/g, '' ) : instr );
    };
    
export trim = function ( inStr ) {
        return self.ltrim( self.rtrim( inStr ) );
    };
    
export isEmpty = function ( inStr ) {
        return ( self.trim( inStr ) === "" );
    };
    
