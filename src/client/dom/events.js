import base from 'client/browser/base';

let addEvent,
    removeEvent,
    createEvent,
    fireEvent;

if ( window.attachEvent && !window.addEventListener ) {
    addEvent = function ( obj, eventType, fn, capture ) {
        const result = obj.attachEvent( "on" + eventType, fn );
        if ( !result ) {
            throw ( "Event " + eventType + " could not be added!" );
        }
    };
} else if ( window.addEventListener ) {
    addEvent = function ( obj, eventType, fn, capture ) {
        const cap = ( capture ) ? capture : false;
        obj.addEventListener( eventType, fn, cap );
    };
}

if ( window.detachEvent && !window.removeEventListener ) {
    removeEvent = function ( obj, eventType, fn, capture ) {
        const result = obj.detachEvent( "on" + eventType, fn );
        if ( !result ) {
            throw ( "Event " + eventType + " could not be removed!" );
        }
    };
} else if ( window.removeEventListener ) {
    removeEvent = function ( obj, eventType, fn, capture ) {
        obj.removeEventListener( eventType, fn, capture );
    };
}

function isTouchEnabled() {
    const doc = document;
    return ( doc.documentElement && ( 'ontouchstart' in doc.documentElement || 'touchstart' in doc.documentElement ) );
}

const getEvent = function ( evt ) {
    return ( window.event ? window.event : evt );
};

const getTarget = function ( evt ) {
    const eventObj = getEvent( eventObj );
    let result;
    if ( eventObj.srcElement ) {
        result = eventObj.srcElement;
    } else if ( eventObj.target ) {
        result = eventObj.target;
    }
    return result;
};

const getEventPosX = function ( evt ) {
    const eventObj = getEvent( eventObj );
    let result = 0;
    if ( eventObj.pageX ) {
        result = eventObj.pageX;
    } else if ( eventObj.clientX ) {
        result = eventObj.clientX;
    }
    return result;
};

const getEventPosY = function ( evt ) {
    const eventObj = getEvent( eventObj );
    let result = 0;
    if ( eventObj.pageY ) {
        result = eventObj.pageY;
    } else if ( eventObj.clientY ) {
        result = eventObj.clientY;
    }
    return result;
};

if ( document.createEvent ) {
    createEvent = function ( name, obj, options ) {
        let evt = document.createEvent( "Event" );
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
        evt[ "initEvent" ]( "Event", options.canBubble, options.cancellable );
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
