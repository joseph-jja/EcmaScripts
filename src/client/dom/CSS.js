//css methods
import selector from 'client/dom/selector';
import * as typeCheck from 'utils/typeCheck';

let addClass = function ( obj, cls ) {
    var cssCls = obj.className;
    if ( cssCls.indexOf( cls ) === -1 ) {
        obj.className += " " + cls;
    }
};

let removeClass = function ( obj, cls ) {
    var i, ridx = -1,
        clen,
        cssClasses = obj.className.split( " " );

    clen = cssClasses.length;
    for ( i = 0; i < clen; i += 1 ) {
        if ( cssClasses[ i ] === cls ) {
            ridx = i;
            break;
        }
    }
    if ( ridx === -1 ) {
        return;
    }
    cssClasses.splice( i, 1 );
    obj.className = cssClasses.join( " " );
};

let replaceClass = function ( obj, ocls, ncls ) {
    removeClass( obj, ocls );
    addClass( obj, ncls );
};

let hasClass = function ( element, cssClass ) {
    var i, clen, cssClasses, eObj = element;
    if ( typeCheck.isString( element ) ) {
        eObj = document.getElementById( element );
    }
    if ( eObj && eObj.className ) {
        // now we have the object
        cssClasses = eObj.className.split( " " );
        clen = cssClasses.length;
        for ( i = 0; i < clen; i += 1 ) {
            if ( cssClasses[ i ] === cssClass ) {
                return true;
            }
        }
    }
    return false;
};

// need to get the JS style syntax instead of border-top it should be borderTop
let getComputedStyle = function ( el, styleProp ) {
    var y, x = el;
    if ( typeCheck.isString( el ) ) {
        x = selector( "#" + el ).get( 0 );
    }
    if ( !x ) {
        return '';
    }
    if ( x.currentStyle ) {
        y = x.currentStyle[ styleProp ];
    } else if ( window.getComputedStyle ) {
        y = document.defaultView.getComputedStyle( x, null ).getPropertyValue( styleProp );
    }
    return y;
};

export {
    addClass,
    removeClass,
    replaceClass,
    hasClass,
    getComputedStyle
};
