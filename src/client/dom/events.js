import base from 'client/utils/base';

var addEvent,
    removeEvent,
    getEventPosX,
    getEventPosY,
    getTarget,
    getEvent,
    createEvent,
    fireEvent;

if ( window.attachEvent && !window.addEventListener ) {
    addEvent = function ( obj, eventType, fn, capture ) {
        var result;
        result = obj.attachEvent( "on" + eventType, fn );
        if ( !result ) {
            throw ( "Event " + eventType + " could not be added!" );
        }
    };
} else if ( window.addEventListener ) {
    addEvent = function ( obj, eventType, fn, capture ) {
        var cap = ( capture ) ? capture : false;
        obj.addEventListener( eventType, fn, cap );
    };
}

if ( window.detachEvent && !window.removeEventListener ) {
    removeEvent = function ( obj, eventType, fn, capture ) {
        var result = obj.detachEvent( "on" + eventType, fn );
        if ( !result ) {
            throw ( "Event " + eventType + " could not be removed!" );
        }
    };
} else if ( window.removeEventListener ) {
    removeEvent = function ( obj, eventType, fn, capture ) {
        obj.removeEventListener( eventType, fn, capture );
    };
}

getEvent = function ( evt ) {
    var eventObj = ( window.event ) ? window.event : evt;
    return eventObj;
};

getTarget = function ( evt ) {
    var eventObj = getEvent( eventObj ),
        result;
    if ( eventObj.srcElement ) {
        result = eventObj.srcElement;
    } else if ( eventObj.target ) {
        result = eventObj.target;
    }
    return result;
};

getEventPosX = function ( evt ) {
    var eventObj = getEvent( eventObj ),
        result = 0;
    if ( eventObj.pageX ) {
        result = eventObj.pageX;
    } else if ( eventObj.clientX ) {
        result = eventObj.clientX;
    }
    return result;
};

getEventPosY = function ( evt ) {
    var eventObj = getEvent( eventObj ),
        result = 0;
    if ( eventObj.pageY ) {
        result = eventObj.pageY;
    } else if ( eventObj.clientY ) {
        result = eventObj.clientY;
    }
    return result;
};

if ( document.createEvent ) {
    createEvent = function ( name, obj, options ) {
        var evt;
        evt = document.createEvent( "Event" );
        if ( !event ) {
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
let addOnLoad = function ( fn ) {
        base.onLoadEventStack.push( fn );
    };

    //here we do our detault onload event handler
let doOnLoad = function () {
        // call all the onload functions in the stack
        var s, stackSize, olFN, wboles = base.onLoadEventStack;

        stackSize = wboles.length;
        for ( s = 0; s < stackSize; s += 1 ) {
            olFN = wboles[ s ];
            if ( olFN && ( typeof olFN ).toLowerCase() === 'function' ) {
                olFN();
            }
        }
    };

    //default onload event handler
let addEvent( window, 'load', self.doOnLoad, false );

export {
    addEvent,
    removeEvent,
    getEventPosX,
    getEventPosY,
    getTarget,
    getEvent,
    createEvent,
    fireEvent, addOnLoad, doOnLoad, addEvent
};
