//
//
//DOM methods 
import selector from 'client/dom/selector';
import * as typeCheck from 'commonUtils/typeCheck';
import * as CSS from 'client/dom/CSS';

let createElement = function ( type, parent, options ) {
    var obj, pObj;

    pObj = document.body;
    if ( parent && typeCheck.isString( parent ) ) {
        // must be an id 
        pObj = document.getElementById( parent );
    } else if ( parent ) {
        // assume node
        pObj = parent;
    }

    if ( !type ) {
        return pObj;
    }

    // try to get the element by id in case it exists
    if ( options && options.id ) {
        obj = document.getElementById( options.id );
    }

    if ( !obj ) {
        obj = document.createElement( type );
    }

    if ( !obj ) {
        return obj;
    }

    pObj.appendChild( obj );

    if ( obj && options ) {
        // here we add in any options, but we don't check to make sure they are value
        var optn;
        for ( optn in options ) {
            try {
                obj[ optn ] = options[ optn ];
            } catch ( e ) {
                // do nothing, IE does not allow setting some options and will error out :(
            }
        }
    }
    if ( options[ 'className' ] ) {
        CSS.addClass( obj, options.className );
    }
    return obj;
};

let html = function ( ele, content, index ) {
    var ele, name, x = selector( ele );

    if ( x.length <= 0 ) {
        return;
    }
    if ( !index ) {
        index = 0;
    }
    if ( index >= x.length || !x[ index ] ) {
        return;
    }
    ele = x[ index ];

    name = new String( ele.tagName ).toLowerCase();
    if ( content || content === "" ) {
        ( function ( content, ele ) {
            if ( typeCheck.isString( content ) || typeCheck.isNumber( content ) ) {
                if ( typeCheck.isInput( name ) || typeCheck.isInput( ele ) ) {
                    ele.value = content;
                } else {
                    // assume innerHTML will work
                    ele.innerHTML = content;
                }
            } else if ( ele && typeCheck.isObject( content ) ) {
                ele.appendChild( content );
            }
        } )( content, ele );
    }
    if ( typeCheck.isInput( name ) || typeCheck.isInput( ele ) ) {
        return ele.value;
    } else if ( typeCheck.isString( ele.innerHTML ) ) {
        return ele.innerHTML;
    }

};

/////////////////////////////////////////////////////////////////////
//Function:             getTextFieldCursorPosition
//Purpose:              get the cursor position in a text field
//Parameter:    obj - input text object
//Returns:              -1 if it is not a text field or the browser
//                              does not support getting the position, otherwise it
//                              return the position of the cursor in a text field
/////////////////////////////////////////////////////////////////////
let getTextFieldCursorPosition = function ( obj ) {
    var textFieldRange, bookmark, doc;
    doc = document;
    // only work with text fields
    if ( obj.type !== "text" ) {
        return -1;
    }

    // try and get the postion in the text field, mostly works too!
    if ( doc.selection ) {
        // IE
        textFieldRange = doc.selection.createRange();
        bookmark = textFieldRange.getBookmark().charCodeAt( 2 ) - 2;
        return bookmark;
    } else if ( obj.selectionStart && obj.selectionEnd ) {
        return obj.selectionStart;
    } else {
        // must be at the start ?
        return 0;
    }
};

/////////////////////////////////////////////////////////////////////
//Function:             setTextFieldCursorPosition
//Purpose:              set the cursor position in a text field
//Parameter:    obj - input text object
//Parameter:    pos - the new position to set the cursor in this field to
//Returns:              nada
/////////////////////////////////////////////////////////////////////
let setTextFieldCursorPosition = function ( obj, pos ) {
    var textFieldRange;
    // only work with text fields
    if ( obj.type !== "text" ) {
        return;
    }

    if ( obj.createTextRange ) {
        textFieldRange = obj.createTextRange();
        textFieldRange.collapse( true );
        textFieldRange.moveStart( "character", pos );
        textFieldRange.select();
    } else if ( obj.selectionStart ) {
        obj.selectionStart = pos;
        obj.selectionEnd = pos;
    } else {
        // do nothing ?createElement
        throw ( "Unsupported browser!" );
    }
    obj.focus();
};

//options can contain
//id: id of script
//callback: callback function after onload
let loadScript = function ( scriptURL, options, jsonpOptions ) {
    var body = document.body,
        script, remove, abort, scriptList = [];
    if ( !scriptURL ) {
        return;
    }
    script = createElement( "script", body, options );
    if ( script ) {
        if ( jsonpOptions ) {
            script.async = ( jsonpOptions.async ) ? jsonpOptions.async : "true";
            script.id = ( script.id ) ? script.id : script.src.substring( scriptURL.lastIndexOf( "/" ) + 1 ).replace( ".", "_" );
            remove = function () {
                // in case this is called twice
                if ( !script ) {
                    return;
                }
                script.onload = script.onreadycreateElementstatechange = null;
                // Remove the script
                if ( script.parentNode ) {
                    script.parentNode.removeChild( script );
                }
                // Dereference the script
                script = null;
            };
            if ( jsonpOptions.callback ) {
                abort = function () {
                    if ( script ) {
                        script.onload( undefined, true );
                    }
                };
                // taken in part from jquery
                script.onload = script.onreadystatechange = function ( x, isAbort ) {
                    if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {
                        remove();
                        if ( !isAbort ) {
                            if ( scriptList[ this.id ] ) {
                                clearTimeout( scriptList[ this.id ] );
                                scriptList[ this.id ] = undefined;
                            }
                            jsonpOptions.callback( 200, 'success' );
                        }
                    }
                };
            }
            if ( jsonpOptions.timeout ) {
                var r = setTimeout( function () {
                    if ( !scriptList[ script.id ] ) {
                        return;
                    }
                    scriptList[ script.id ] = undefined;
                    remove();
                    if ( jsonpOptions.error ) {
                        jsonpOptions.error( "500", 'fail' );
                    } else if ( jsonpOptions.callback ) {
                        jsonpOptions.callback( "500", 'fail' );
                    }
                }, jsonpOptions.timeout );
                scriptList[ script.id ] = r;
            }
        }
        script.type = "text/javascript";
        script.src = scriptURL;
    }
    return script;
};

//ok now we get an idea about the width and height of the browser window
let screen = {
    maxx: function () {
        return window.innerWidth || ( document.documentElement && document.documentElement.clientWidth ) || ( document.documentElement && document.documentElement.offsetWidth ) || ( document.body && document.body.clientWidth ) || ( document.body && document.body.offsetWidth ) || 0;
    },
    maxy: function () {
        return window.innerHeight || ( document.documentElement && document.documentElement.clientHeight ) || ( document.documentElement && document.documentElement.offsetHeight ) || ( document.body && document.body.clientHeight ) || ( document.body && document.body.offsetHeight ) || 0;
    }
};

let toggleDisplay = function ( objName ) {
    var state, obj = objName;
    if ( typeCheck.isString( objName ) ) {
        obj = selector( "#" + objName ).get( 0 );
    }
    if ( obj ) {
        state = CSS.getComputedStyle( objName, 'display' );
        if ( state === "block" ) {
            obj.style.display = "none";
        } else if ( state === "none" ) {
            obj.style.display = "block";
        } else {
            obj.style.display = "none";
        }
    }
};

export {
    createElement,
    html,
    getTextFieldCursorPosition,
    setTextFieldCursorPosition,
    loadScript,
    screen,
    toggleDisplay
};
