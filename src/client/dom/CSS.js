//css methods
import selector from 'client/dom/selector';
import * as typeCheck from 'utils/typeCheck';

const addClass = function ( obj, cls ) {
    if ( obj.className.indexOf( cls ) === -1 ) {
        obj.className += " " + cls;
    }
};

const removeClass = function ( obj, cls ) {
    let ridx = -1, i,
        cssClasses = obj.className.split( " " );

    const clen = cssClasses.length;
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

const replaceClass = function ( obj, ocls, ncls ) {
    removeClass( obj, ocls );
    addClass( obj, ncls );
};

const hasClass = function ( element, cssClass ) {
    let eObj = element;
    if ( typeCheck.isString( element ) ) {
        eObj = document.getElementById( element );
    }
    if ( eObj && eObj.className ) {
        // now we have the object
        const cssClasses = eObj.className.split( " " );
        const clen = cssClasses.length;
        for ( let i = 0; i < clen; i += 1 ) {
            if ( cssClasses[ i ] === cssClass ) {
                return true;
            }
        }
    }
    return false;
};

// need to get the JS style syntax instead of border-top it should be borderTop
const getComputedStyle = function ( el, styleProp ) {
    let y, x = el;
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
