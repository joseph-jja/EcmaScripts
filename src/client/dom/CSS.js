//css methods
import {
    byId
} from '/js/client/dom/shortcuts';
import selector from '/js/client/dom/selector';
import { isString } from '/js/utils/typeCheck';

const hasClass = function ( element, cssClass ) {
    let eObj = element;
    if ( isString( element ) && element.startsWith('#')) {
        eObj = byId( element );
    }
    // now we have the object
    return eObj?.className?.split( " " )?.includes(cssClass);
};

const addClass = function ( obj, cls ) {
    if ( !hasClass(obj, cls ) ) {
        obj.className += " " + cls;
    }
};

const removeClass = function ( obj = {}, cls ) {
    let ridx = -1,
        i,
        cssClasses = obj.className?.split( " " );

    const classes = (cssClasses ?? []).filter( clsName => {
        return (clsName !== cls);
    });
    obj.className = classes.join( " " );
};

const replaceClass = function ( obj, ocls, ncls ) {
    removeClass( obj, ocls );
    addClass( obj, ncls );
};

// need to get the JS style syntax instead of border-top it should be borderTop
const getComputedStyle = function ( el, styleProp ) {
    let y, x = el;
    if ( isString( el ) ) {
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
