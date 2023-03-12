import base from 'client/browser/base';

const addEvent = (obj = window, eventType, fn, capture = false) => {
    if (window.attachEvent && !window.addEventListener ) {
        const result = obj.attachEvent( 'on' + eventType, fn );
        if ( !result ) {
            throw ( 'Event ' + eventType + ' could not be added!' );
        }
        return result;
    } else {
        return obj.addEventListener( eventType, fn, capture );
    }
};

const removeEvent = (obj = window, eventType, fn, capture = false ) => {
    if (window.detachEvent && !window.removeEventListener ) {
        const result = obj.detachEvent( 'on' + eventType, fn );
        if ( !result ) {
            throw ( 'Event ' + eventType + ' could not be removed!' );
        }
        return result;
    } else {
        return obj.removeEventListener( eventType, fn, capture );
    }
};

const isTouchEnabled = () => {
    return ( document.documentElement && ( 'ontouchstart' in document.documentElement || 'touchstart' in document.documentElement ) );
};

const getEvent = ( evt ) => {
    return ( window.event ? window.event : evt );
};

const getTarget = ( evt ) => {
    const eventObj = getEvent( evt );
    let result;
    if ( eventObj.srcElement ) {
        result = eventObj.srcElement;
    } else if ( eventObj.target ) {
        result = eventObj.target;
    }
    return result;
};

const getEventPosX = ( evt ) => {
    const eventObj = getEvent( evt );
    let result = 0;
    if ( eventObj.pageX ) {
        result = eventObj.pageX;
    } else if ( eventObj.clientX ) {
        result = eventObj.clientX;
    }
    return result;
};

const getEventPosY = ( evt ) => {
    const eventObj = getEvent( evt );
    let result = 0;
    if ( eventObj.pageY ) {
        result = eventObj.pageY;
    } else if ( eventObj.clientY ) {
        result = eventObj.clientY;
    }
    return result;
};

let createEvent,
    fireEvent;
if ( document.createEvent ) {
    createEvent = ( name, obj, options ) => {
        let evt = document.createEvent( 'Event' );
        if ( !evt ) {
            return undefined;
        }
        if ( !options ) {
            options = {};
        }
        if ( !options.canBubble ) {
            options.canBubble = true;
        }
        if ( !options.cancellable ) {
            options.cancellable = true;
        }
        evt[ 'initEvent' ]( 'Event', options.canBubble, options.cancellable );
        return evt;
    };

    fireEvent = function ( evt ) {
        document.dispatchEvent( evt );
    };
}

//call this to add an onload event handler
const addOnLoad = function ( fn ) {
    base.onLoadEventStack.push( fn );
};

//here we do our detault onload event handler
const doOnLoad = function () {
    // call all the onload functions in the stack
    let stackSize, olFN, wboles = base.onLoadEventStack;
    stackSize = wboles.length;
    for ( let s = 0; s < stackSize; s += 1 ) {
        olFN = wboles[ s ];
        if ( olFN && ( typeof olFN ).toLowerCase() === 'function' ) {
            olFN();
        }
    }
};

//default onload event handler
addEvent( window, 'load', doOnLoad, false );

export {
    addEvent,
    removeEvent,
    getEventPosX,
    getEventPosY,
    getTarget,
    getEvent,
    createEvent,
    fireEvent,
    addOnLoad,
    doOnLoad,
    isTouchEnabled
};
