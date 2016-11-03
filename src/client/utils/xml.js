//functions for xml processing
import * as stringUtils from 'commonUtils/stringUtils';

var self = {},
    tAttributes = "attributes";

function isTextNode( inStr ) {
    return ( inStr === "#text" );
};

function hasSameChildNodeName( node ) {
    var res = false,
        j, tot, fname, sameNode = [];
    if ( node.hasChildNodes() ) {
        tot = node.childNodes.length;
        for ( j = 0; j < tot; j += 1 ) {
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
    var json = [],
        len, i, aname, aval;
    if ( node.attributes && node.attributes.length > 0 ) {
        len = node.attributes.length;
        for ( i = 0; i < len; i += 1 ) {
            aname = node.attributes[ i ].nodeName;
            aval = node.attributes[ i ].nodeValue;
            json[ aname ] = aval;
        }
        return json;
    }
    return null;
};

// this has been updated to handle attributes, but that does not work right now
self.simpleRSSToJSON = function ( obj ) {
    var jdata = {},
        i, j, cName, nodeCT, cNode,
        name, attrs, val, setAttrs, checkNode;

    setAttrs = function ( jdata, val, name ) {
        if ( val && stringUtils.trim( val ) !== '' ) {
            jdata[ name ][ 'text' ] = val;
            attrs = processAttributes( obj.childNodes[ j ] );
            if ( attrs ) {
                jdata[ name ][ tAttributes ] = attrs;
            }
        }
    };
    checkNode = function ( j, nodeCT, obj, name ) {
        var result = ( ( j + 1 < nodeCT && obj.childNodes[ j + 1 ].nodeName === name ) || ( j > 0 && j < nodeCT && obj.childNodes[ j - 1 ].nodeName === name ) || ( j + 2 < nodeCT && obj.childNodes[ j + 2 ].nodeName === name ) || ( j > 1 && j < nodeCT && obj.childNodes[ j - 2 ].nodeName === name ) );
        return result;
    };
    if ( obj && obj.hasChildNodes() ) {
        j = 0;
        i = 0;
        // current node name, although we don't use this
        // it is not used because the top level node is #document in an xml document 
        // we don't care about the #document node, we want the rss and on down the line
        cName = obj.nodeName;
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
                    jdata[ name ][ i ] = self.simpleRSSToJSON.call( this, cNode );
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
                    jdata[ name ] = self.simpleRSSToJSON.call( this, cNode );
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
self.jsonToXML = function ( json, pNode ) {
    var string = '',
        i, j, attrs, wbs = WebBrowser.string,
        idx = 0,
        childNodeType, r, h,
        ct = 0,
        makeXMLtag;

    makeXMLtag = function ( name, value, attrs ) {
        var abute = ( attrs ? ' ' + attrs : '' );
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
            r = wbs.rtrim( r ); // remove trailing space
            string += makeXMLtag( i, self.jsonToXML( json[ i ], i ), r );
        } else if ( childNodeType === 'object' ) {
            if ( isNaN( i ) ) {
                string += makeXMLtag( i, self.jsonToXML( json[ i ], i ) );
            } else if ( pNode ) {
                string += self.jsonToXML( json[ i ], i );
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
self.xml2json = function ( xmlNode ) {
    var j, nodeCT, nodeContent,
        hscn, node, name, value,
        attrs, cnodes, wb = WebBrowser.string;

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
                cnodes = self.xml2json( node );
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
            } else if ( !stringUtils.empty( value ) ) {
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

self.transformXML = function ( xmlURL, xsltURL, resultObj ) {

    // get the XML Document and the XSLT Document
    var xmlStr = getXMLHttpData( xmlURL ),
        xsltStr = getXMLHttpData( xsltURL ),
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

    // if the web browser is IE then we will fall here
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



export default self;
