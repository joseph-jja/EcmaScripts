// support for IE8 and above
// simple module to select elements based on css style selectors
// internally calls documenet.getElementById or querySelectorAll based on regex 
// this is done in a UMD format
var rquickExpr = /^#(?:([\w-]+)|(\w+)|\.([\w-]+))$/;

export default function selector( expr, parent ) {

    var result, y, self = {},
        pObj = parent;

    self.length = 0;

    pObj = parent || document;

    if ( rquickExpr.test( expr ) ) {
        // remove the leading # and return array of 1 or 0
        result = pObj.getElementById( expr.substring( 1 ) );
        result = ( result ? [ result ] : [] );
    } else {
        let qEle = expr;
        if ( expr instanceof HTMLElement ) {
            qEle = expr.nodeName.toLowerCase();
        }
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
