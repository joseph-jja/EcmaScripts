// support for IE8 and above
// simple module to select elements based on css style selectors
// internally calls documenet.getElementById or querySelectorAll based on regex
// this is done in a UMD format
import {
    isString,
    isObject
} from 'utils/typeCheck';

const rquickExpr = /^#(?:([\w-]+)|(\w+)|\.([\w-]+))$/;

export default function selector( expr, parent = document ) {

    // if it is not a string and it is an object
    if ( !isString( expr ) && isObject( expr ) &&
        expr.hasOwnProperty( 'objectName' ) && expr.objectName === 'selector' ) {
        // can't select a selector object
        return expr;
    }

    let qEle = expr;

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

    let result;
    if ( rquickExpr.test( qEle ) ) {
        // remove the leading # and return array of 1 or 0
        result = parent.querySelector( qEle );
        result = ( result ? [ result ] : [] );
    } else {
        result = parent.querySelectorAll( qEle );
        result = ( result && result.length > 0 ? result : [] );
    }

    const selection = {
        length: result.length,
        objectName: 'selector'
    };

    selection.get = function ( i ) {
        return result[ i ];
    };

    selection.toArray = function () {
        return Array.from( result );
    };

    selection.each = function ( fn ) {
        selection.toArray().forEach( fn );
    };

    for ( let y = 0; y < selection.length; y++ ) {
        selection[ y ] = result[ y ];
    }
    return selection;
}
