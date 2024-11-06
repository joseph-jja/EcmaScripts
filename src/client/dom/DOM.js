//
//
//DOM methods
import selector from '/js/client/dom/selector';
import * as typeCheck from '/js/utils/typeCheck';
import * as CSS from '/js/client/dom/CSS';

const createElement = function ( type, parent, options ) {
    let obj;

    let pObj = document.body;
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
        let optn;
        for ( optn in options ) {
            try {
                obj[ optn ] = options[ optn ];
            } catch ( e ) {
                // do nothing, IE does not allow setting some options and will error out :(
            }
        }
        if ( options[ 'className' ] ) {
            CSS.addClass( obj, options.className );
        }
    }
    return obj;
};

const html = function ( ele, content, index ) {
    let lele, name, x = selector( ele );

    if ( x.length <= 0 ) {
        return;
    }
    if ( !index ) {
        index = 0;
    }
    if ( index >= x.length || !x[ index ] ) {
        return;
    }
    lele = x.get( index );

    name = new String( lele.tagName ).toLowerCase();
    if ( content || content === "" ) {
        ( function ( content, nele ) {
            if ( typeCheck.isString( content ) || typeCheck.isNumber( content ) ) {
                if ( typeCheck.isInput( name ) || typeCheck.isInput( nele ) ) {
                    nele.value = content;
                } else if ( typeCheck.isTextarea( nele ) ) {
                    nele.value = content;
                } else {
                    // assume innerHTML will work
                    nele.innerHTML = content;
                }
            } else if ( nele && typeCheck.isObject( content ) ) {
                nele.appendChild( content );
            }
        } )( content, lele );
    }
    if ( typeCheck.isInput( name ) || typeCheck.isInput( lele ) ) {
        return lele.value;
    } else if ( typeCheck.isTextarea( lele ) ) {
        return lele.value;
    } else if ( typeCheck.isString( lele.innerHTML ) ) {
        return lele.innerHTML;
    }
};

// allow pslctr to be a selector object
const findParent = function ( slctr, pslctr, i ) {
    let node,
        cElmnt,
        getParent, pNode;

    // this will be all the siblings of the same type and the element
    // so if this is a div and there are siblings divs we get
    // all the sibling divs assuming slctr = div
    cElmnt = selector( slctr );
    if ( cElmnt.length <= 0 ) {
        return undefined;
    }

    // this will get us the first in the list unless an index has been passed
    node = cElmnt.get( 0 );
    if ( i && i < cElmnt.length ) {
        node = cElmnt.get( i );
    }

    if ( !node ) {
        return undefined;
    }

    getParent = function ( node, pNodeName ) {
        let prnt;

        // no node :(
        if ( !node ) {
            pNode = null;
            return;
        }
        prnt = node.parentNode;
        if ( prnt ) {
            if ( prnt.nodeName.toLowerCase() !== pNodeName ) {
                getParent( prnt, pNodeName );
            } else {
                pNode = prnt;
            }
        }
        return;
    };

    getParent( node, pslctr );

    return pNode;
};

/////////////////////////////////////////////////////////////////////
//Function:             getTextFieldCursorPosition
//Purpose:              get the cursor position in a text field
//Parameter:    obj - input text object
//Returns:              -1 if it is not a text field or the browser
//                              does not support getting the position, otherwise it
//                              return the position of the cursor in a text field
/////////////////////////////////////////////////////////////////////
const getTextFieldCursorPosition = function ( obj ) {
    let textFieldRange, bookmark;
    const doc = document;
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
const setTextFieldCursorPosition = function ( obj, pos, epos ) {
    let textFieldRange;
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
        obj.selectionEnd = ( epos || pos );
    } else {
        // do nothing ?createElement
        throw ( "Unsupported browser!" );
    }
    obj.focus();
};

//options can contain
//id: id of script
//callback: callback function after onload
const loadScript = function ( scriptURL, options, jsonpOptions ) {
    let body = document.body,
        script, remove, scriptList = [];
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
                let r = setTimeout( function () {
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
const screen = {
    maxx: function () {
        return window.innerWidth || ( document.documentElement && document.documentElement.clientWidth ) || ( document.documentElement && document.documentElement.offsetWidth ) || ( document.body && document.body.clientWidth ) || ( document.body && document.body.offsetWidth ) || 0;
    },
    maxy: function () {
        return window.innerHeight || ( document.documentElement && document.documentElement.clientHeight ) || ( document.documentElement && document.documentElement.offsetHeight ) || ( document.body && document.body.clientHeight ) || ( document.body && document.body.offsetHeight ) || 0;
    }
};

const toggleDisplay = function ( objName ) {
    let state, obj = objName;
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
    findParent,
    getTextFieldCursorPosition,
    setTextFieldCursorPosition,
    loadScript,
    screen,
    toggleDisplay
};
