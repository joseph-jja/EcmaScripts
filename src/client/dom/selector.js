// support for IE8 and above
// simple module to select elements based on css style selectors
// internally calls documenet.getElementById or querySelectorAll based on regex 
// this is done in a UMD format
import * as typeCheck from 'utils/typeCheck';

var rquickExpr = /^#(?:([\w-]+)|(\w+)|\.([\w-]+))$/;

export default function selector( expr, parent ) {

    var result, y, self = {},
        pObj, qEle = expr;

    self.length = 0;
    self.objectName = 'selector';

    pObj = parent || document;

    // if it is not a string and it is an object
    if ( !typeCheck.isString( qEle ) && typeCheck.isObject( qEle ) ) {
        if ( qEle.hasOwnProperty( 'objectName' ) && qEle.objectName === 'selector' ) {
            // can't select a selector object
            return qEle;
        }
    }

    // html element so lets figure out what it is    
    if ( expr instanceof HTMLElement ) {
        if ( expr.id ) {
            qEle = "#" + expr.id;
        } else {
            qEle = expr.nodeName.toLowerCase();
            if ( expr.className.length > 0 ) {
                qEle += "." + expr.className.split( " " ).join( " ." );
            }
        }
    }

    if ( rquickExpr.test( qEle ) ) {
        // remove the leading # and return array of 1 or 0
        result = ( pObj.nodeName.toLowerCase() !== 'document' ) ? pObj.querySelector( qEle ) : pObj.getElementById( qEle.substring( 1 ) );
        result = ( result ? [ result ] : [] );
    } else {
        result = pObj.querySelectorAll( qEle );
        result = ( result && result.length > 0 ? result : [] );
    }

    self.length = result.length;

    self.get = function ( i ) {
        return result[ i ];
    };

    for ( y = 0; y < self.length; y++ ) {
        self[ y ] = result[ y ];
    }
    return self;
}
