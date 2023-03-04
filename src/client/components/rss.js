import * as xml from 'client/browser/xml';
import * as stringUtils from 'utils/stringUtils';
import * as dom from 'client/dom/DOM';

import MathFunctions from "utils/mathFunctions";

let jsonDATA = {},
    lastUpdated = -1,
    count = -1;

const elements = [ "titleID", "descriptionID", "guidID", "pubDateID" ];
const elementLen = elements.length;

let clearAll = function () {
    for ( let i = 0; i < elementLen; i += 1 ) {
        dom.html( "#" + elements[ i ], '' );
    }
};

let getRSSItem = function ( index ) {

    let item;

    lastUpdated = index;
    item = jsonDATA.rss.channel.item[ index ];

    dom.html( "#titleID", item.title.text, 0 );
    dom.html( "#descriptionID", item.description.text );
    dom.html( "#guidID", item.guid.text );
    dom.html( "#pubDateID", item.pubDate.text );

    return item;
};

let processJSON = function ( json ) {

    let items = json.rss.channel.item,
        result = '<ul id="rssfeedItemElements">',
        i = 0;

    for ( let t in items ) {
        result += `<li  id="rssFeedItem_${i}">`;
        result += items[ t ].title.text + '</li>';
        i += 1;
    }
    count = i;
    result += '</ul>';
    dom.html( "#feedData", result );
};

let updateRecord = function () {
    let item, p, x, y;

    if ( lastUpdated < 0 ) {
        return;
    }

    item = jsonDATA.rss.channel.item[ lastUpdated ];

    item.title.text = dom.html( "#titleID" );
    item.description.text = dom.html( "#descriptionID" );

    x = new Date().getTime();
    y = MathFunctions.convertFromBaseTenToBaseX( 16, x );
    y = ( y + '' ).repeat( 5 );
    let guidID = '{' + y.substring( 0, 8 ) + '-' +
        y.substring( 8, 12 ) + '-' + y.substring( 12, 15 ) +
        '-' + y.substring( 15, 19 ) + '-' +
        y.substring( 15, 19 ) + '-' + y.substring( 20, 30 ) + '}';
    item.guid.text = dom.html( "#guidID", guidID );

    p = dom.html( "#pubDateID" );
    if ( p !== "" ) {
        item.pubDate.text = p;
    } else {
        item.pubDate.text = new Date();
    }

    processJSON( jsonDATA );
};

let insertRecord = function () {

    let title = dom.html( "#titleID" );
    let description = dom.html( "#descriptionID" );
    let pubDate = dom.html( "#pubDateID" );

    if ( stringUtils.isEmpty( title ) || stringUtils.isEmpty( description ) || stringUtils.isEmpty( pubDate ) ) {
        return;
    }

    // all this needs to exist
    if ( !jsonDATA.rss ) {
        jsonDATA.rss = {};
    }
    if ( !jsonDATA.rss.channel ) {
        jsonDATA.rss.channel = {};
    }
    if ( !jsonDATA.rss.channel.item ) {
        jsonDATA.rss.channel.item = [];
    }

    // move all the items
    for ( let i = count; i > 0; i -= 1 ) {
        jsonDATA.rss.channel.item[ i ] = jsonDATA.rss.channel.item[ i - 1 ];
    }

    // increment counter as we are adding one in 
    count += 1;
    lastUpdated = 0;
    jsonDATA.rss.channel.item[ lastUpdated ] = {
        "title": {
            "text": ''
        },
        "description": {
            "text": ''
        },
        "guid": {
            "text": '',
            "attributes": {
                "isPermaLink": "false"
            }
        },
        "pubDate": {
            "text": ''
        }
    };

    updateRecord();
};

const saveData = function () {

    const xmlData = xml.jsonToXML( jsonDATA )
        .replaceAll( "&", "&amp;amp;" )
        .replaceAll( "><", ">\n<" )
        .replaceAll( "<", "&lt;" )
        .replaceAll( ">", "&gt;" );
    cont c = document.getElementById( "feedOutput" );
    c.innerHTML = '&lt;?xml version="1.0" encoding="utf-8"?&gt;' + xmlData;
};

function processData( data ) {
    // now we have a JSON object
    let xmlDoc = xml.getAsXMLDocument( data );
    jsonDATA = xml.simpleRSSToJSON( xmlDoc );
    processJSON( jsonDATA );
}

export {
    processData,
    clearAll,
    updateRecord,
    insertRecord,
    saveData,
    getRSSItem
};
