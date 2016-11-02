// support for IE8 and above
// simple module to select elements based on css style selectors
// internally calls documenet.getElementById or querySelectorAll based on regex 
// this is done in a UMD format
import * as typeCheck from "commonUtils/typeCheck"; 

var rquickExpr = /^#(?:([\w-]+)|(\w+)|\.([\w-]+))$/;

export default function selector( expr, parent ) {

    var result, y, self = {}, pObj = parent;

    self.length = 0; 
    
    if ( ! typeCheck.exists( parent ) ) {
    	pObj = document;
    }
    
    if ( rquickExpr.test( expr ) ) {
        // remove the leading # and return array of 1 or 0
        result = pObj.getElementById( expr.substring( 1 ) );
        result = ( result ? [ result ] : [] );
    } else {
        result = pObj.querySelectorAll( expr );
    }

    self.get = function ( i ) {
        return result[ i ];
    };

    if ( result && result.length ) {
        self.length = result.length;
    } else if ( result ) {
    	self.length = 1;
    }
    for ( y = 0; y < self.length; y++ ) {
    	self[y] = result[y];
    }
    return self;
};

