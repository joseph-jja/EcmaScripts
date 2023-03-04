//functions for xml processing
import isEmpty from 'utils/stringUtils';

let tAttributes = "attributes";

function isTextNode( inStr ) {
    return ( inStr === "#text" );
};

function hasSameChildNodeName( node ) {
    let res = false,
        tot, fname, sameNode = [];
    if ( node.hasChildNodes() ) {
        tot = node.childNodes.length;
        for ( let j = 0; j < tot; j += 1 ) {
            fname = node.childNodes[ j ].nodeName;
            if ( sameNode[ fname ] && !isTextNode( fname ) ) {
                res = true;
                break;
            }
            sameNode[ fname ] = true;
        }
    }
    return res;
};

function processAttributes( node ) {
    let json = [],
        len, aname, aval;
    if ( node.attributes && node.attributes.length > 0 ) {
        len = node.attributes.length;
        for ( let i = 0; i < len; i += 1 ) {
            aname = node.attributes[ i ].nodeName;
            aval = node.attributes[ i ].nodeValue;
            json[ aname ] = aval;
        }
        return json;
    }
    return null;
};

// this has been updated to handle attributes, but that does not work right now
export function simpleRSSToJSON( obj ) {
    let jdata = {},
        i, j, nodeCT, cNode,
        name, attrs, val, setAttrs, checkNode;

    setAttrs = function ( jdata, val, name ) {
        if ( val && val.trim() !== '' ) {
            jdata[ name ][ 'text' ] = val;
            attrs = processAttributes( obj.childNodes[ j ] );
            if ( attrs ) {
                jdata[ name ][ tAttributes ] = attrs;
            }
        }
    };
    checkNode = function ( j, nodeCT, obj, name ) {
        let result = ( ( j + 1 < nodeCT && obj.childNodes[ j + 1 ].nodeName === name ) || ( j > 0 && j < nodeCT && obj.childNodes[ j - 1 ].nodeName === name ) || ( j + 2 < nodeCT && obj.childNodes[ j + 2 ].nodeName === name ) || ( j > 1 && j < nodeCT && obj.childNodes[ j - 2 ].nodeName === name ) );
        return result;
    };
    if ( obj && obj.hasChildNodes() ) {
        j = 0;
        i = 0;
        // current node name, although we don't use this
        // it is not used because the top level node is #document in an xml document
        // we don't care about the #document node, we want the rss and on down the line
        nodeCT = obj.childNodes.length;
        while ( j < nodeCT ) {
            // name of the current node
            cNode = obj.childNodes[ j ];
            name = cNode.nodeName;
            if ( !jdata[ name ] ) {
                jdata[ name ] = {};
            }
            // our node has child nodes
            if ( cNode.hasChildNodes() ) {
                // here we properly identify duplicate nodes, there could be a text node between two identical nodes
                // this happens when you have a carriage return, tab or space between a closing tag and opening tag
                if ( checkNode( j, nodeCT, obj, name ) ) {
                    // duplicately named child nodes, in the case of RSS this would be the item elements
                    jdata[ name ][ i ] = simpleRSSToJSON.call( this, cNode );
                    i += 1;
                    attrs = processAttributes( cNode );
                    if ( attrs ) {
                        jdata[ name ][ i ][ tAttributes ] = attrs;
                    }
                } else if ( cNode.childNodes.length === 1 && isTextNode( cNode.childNodes[ 0 ].nodeName ) ) {
                    // just one node and it is a text node so dump the value out
                    val = cNode.childNodes[ 0 ].nodeValue;
                    setAttrs( jdata, val, name );
                } else {
                    jdata[ name ] = simpleRSSToJSON.call( this, cNode );
                    attrs = processAttributes( cNode );
                    if ( attrs ) {
                        jdata[ name ][ tAttributes ] = attrs;
                    }
                }
            } else {
                // the child node is a text node and we want that text data
                val = cNode.nodeValue;
                setAttrs( jdata, val, name );
            }
            j += 1;
        }
    }
    return jdata;
};

// creates an XML document fragment given a JSON object
// json lists such as items[0] .. items[1] will be converted to <items></items>... <items></items>
export function jsonToXML( json, pNode ) {
    let string = '',
        i, attrs,
        idx = 0,
        childNodeType, r, h,
        ct = 0,
        makeXMLtag;

    makeXMLtag = function ( name, value, attrs ) {
        const abute = ( attrs ? ' ' + attrs : '' );
        return '<' + name + abute + '>' + value + '</' + name + '>';
    };

    for ( i in json ) {
        ct += 1;
    }
    for ( i in json ) {
        childNodeType = new String( typeof json[ i ] ).toLowerCase();
        if ( isTextNode( i ) || i === tAttributes ) {
            // filter out empty text nodes, as they should contain nothing
            // skip this node it is handled in the next condition better
        } else if ( i === 'text' ) {
            // handle text nodes
            string += json[ i ];
        } else if ( json[ i ][ tAttributes ] ) {
            // handle attributes
            attrs = json[ i ][ tAttributes ];
            r = '';
            for ( h in attrs ) {
                r += h + '="' + attrs[ h ] + '" ';
            }
            r = r.trimRight(); // remove trailing space
            string += makeXMLtag( i, jsonToXML( json[ i ], i ), r );
        } else if ( childNodeType === 'object' ) {
            if ( isNaN( i ) ) {
                string += makeXMLtag( i, jsonToXML( json[ i ], i ) );
            } else if ( pNode ) {
                string += jsonToXML( json[ i ], i );
                if ( idx + 1 < ct ) {
                    string += makeXMLtag( pNode, '' );
                }
            }
        } else {
            string += makeXMLtag( i, json[ i ] );
        }
        idx += 1;
    }
    return string;
};

// this parses any XML document into a JSON object
// it puts the attributes for a node in an object called attributes
export function xml2json( xmlNode ) {
    let j, nodeCT, nodeContent,
        hscn, node, name, value,
        attrs, cnodes;

    if ( xmlNode.hasChildNodes() ) {
        j = 0;
        nodeCT = xmlNode.childNodes.length;
        nodeContent = {};
        hscn = hasSameChildNodeName( xmlNode );
        while ( j < nodeCT ) {
            node = xmlNode.childNodes[ j ];
            name = node.nodeName;
            value = node.nodeValue;
            attrs = processAttributes( node );
            if ( node.hasChildNodes() ) {
                cnodes = xml2json( node );
                if ( !nodeContent[ name ] ) {
                    nodeContent[ name ] = ( hscn ) ? [] : {};
                }
                if ( hscn ) {
                    if ( attrs ) {
                        cnodes[ tAttributes ] = attrs;
                    }
                    nodeContent[ name ].push( cnodes );
                } else if ( isTextNode( name ) && nodeContent[ name ] ) {
                    // may or may not hit this code
                    nodeContent[ name ] += value;
                    if ( attrs ) {
                        nodeContent[ name ][ tAttributes ] = attrs;
                    }
                } else {
                    nodeContent[ name ] = cnodes;
                    if ( attrs ) {
                        nodeContent[ name ][ tAttributes ] = attrs;
                    }
                }
            } else if ( !isEmpty( value ) ) {
                if ( isTextNode( name ) && nodeContent[ name ] ) {
                    nodeContent[ name ] += value;
                } else {
                    nodeContent[ name ] = value;
                }
                if ( attrs ) {
                    nodeContent[ name ][ tAttributes ] = attrs;
                }
            }
            j += 1;
        }
        return nodeContent;
    } else {
        name = xmlNode.nodeName;
        value = xmlNode.nodeValue;
        // what do we do with attributes?
        attrs = processAttributes( xmlNode );
        return {
            name: value
        };
    }
};

function isDOMParserCapable() {
    try {
        return ( DOMParser ) ? true : false;
    } catch ( e ) {
        return false;
    }
}

export function getAsXMLDocument( xmlString ) {

    let xmlDocument = null,
        xmlInput = xmlString,
        parser;

    if ( isDOMParserCapable() ) {
        // then try this
        try {
            parser = new DOMParser();
            xmlDocument = parser.parseFromString( xmlInput, "text/xml" );
        } catch ( e ) {
            if ( document.implementation && document.implementation.createDocument ) {
                xmlDocument = document.implementation.createDocument( "", "", xmlInput );
            }
        }
    } else if ( typeof ActiveXObject !== 'undefined' ) {
        // IE and active X reject browsers
        /*@cc_on @*/
        /*@if (@_jscript_version >= 5)
        // JScript gives us Conditional compilation, we can cope with old IE versions.
        // and security blocked creation of the objects.
        // because MS keeps adding XML implementations
        // we loop through to find one
        var ARR_ACTIVEX = [ "MSXML.DOMDocument.6.0", "MSXML.DOMDocument.3.0", "MSXML2.DOMDocument", "Microsoft.XmlDom"];

                // bFound is false because we have not found one
        bFound = false;
        for (i=0; i < ARR_ACTIVEX.length && !bFound; i++) {
            try {
                //try to create the object, it will cause an
                //error if it doesn't work
                objXML = new ActiveXObject(ARR_ACTIVEX[i]);

                //if it gets to this point, the string worked,
                //so save it
                xmlParserStr = ARR_ACTIVEX[i];
                bFound = true;
            } catch (objException) {
                // do nothing
            }
        }
        // we found our XML parser
        if ( bFound ) {
            // create the active x object
            xmlDocument = new ActiveXObject(ARR_ACTIVEX[i]);
            xmlDocument.async = false;
            // actually load the XML string using loadXML
            xmlDocument.loadXML(xmlInput);
        }
        @end @*/
    }
    return xmlDocument;

}

export function transformXML( xmlString, xsltString, resultObj ) {

    // get the XML Document and the XSLT Document
    let xmlStr = getAsXMLDocument( xmlString ),
        xsltStr = getAsXMLDocument( xsltString ),
        completed = false,
        domParser, xmlDomDoc,
        xsltDomDoc, xmlxslt, doc;

    // gecko based browser support this
    // safari, and konqueror, and opera support some of this
    // but only gecko supportis all of this
    if ( ( typeof XSLTProcessor !== 'undefined' ) && ( typeof DOMParser !== 'undefined' ) ) {
        // get the xml and xsl
        if ( xmlStr && xsltStr ) {
            // create a new dom parser to convert this
            // string data into a DOMDocument
            domParser = new DOMParser();
            xmlDomDoc = domParser.parseFromString( xmlStr, "text/xml" );
            xsltDomDoc = domParser.parseFromString( xsltStr, "text/xml" );

            // create xslt parser and transform document
            xmlxslt = new XSLTProcessor();
            xmlxslt.importStylesheet( xsltDomDoc );
            doc = xmlxslt.transformToFragment( xmlDomDoc, document );

            // create the document as the body
            resultObj.appendChild( doc );
            completed = true;
        }
    }

    // if the web brselfowser is IE then we will fall here
    if ( !completed ) {
        /*@cc_on @*/
        /*@if (@_jscript_version >= 5)
	   // JScript gives us Conditional compilation, we can cope with old IE versions.
	   // and security blocked creation of the objects.
	   var ARR_ACTIVEX = ["MSXML4.DOMDocument", "MSXML3.DOMDocument",
                            "MSXML2.DOMDocument", "MSXML.DOMDocument", "Microsoft.XmlDom"]
            var xmlParserStr = "";
            var bFound = false;
            for (var i=0; i < ARR_ACTIVEX.length && !bFound; i++) {
                try {
                        //try to create the object, it will cause an
                        //error if it doesn't work
                        var objXML = new ActiveXObject(ARR_ACTIVEX[i]);

                        //if it gets to this point, the string worked,
                        //so save it
                        xmlParserStr = ARR_ACTIVEX[i];
                        bFound = true;
                } catch (objException) {
                        // do nothing
                }
            }
            // so we have found the xml parser string name
            if ( bFound ) {
                // create objects, make them async comm, and then load documents
                var xmlxslt = new ActiveXObject(ARR_ACTIVEX[i]);
                var xmldata = new ActiveXObject(ARR_ACTIVEX[i]);
                xmldata.async = false;
                xmlxslt.async = false;
                xmldata.loadXML(xmlStr);
                xmlxslt.loadXML(xsltStr);

                // transform the documents
                var doc = xmldata.transformNode(xmlxslt);
                resultObj.innerHTML = doc;
                completed = true;
            }
            @end @*/
    }
    return completed;
};
