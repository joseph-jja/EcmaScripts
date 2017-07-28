import * as xml from 'client/browser/xml';
import * as stringUtils from 'utils/stringUtils';
import * as dom from 'client/dom/DOM';

import MF from "utils/mathFunctions";
import selector from 'client/dom/selector';

let jsonDATA = {},
    lastUpdated = -1,
    count = -1;

const elements = [ "titleID", "descriptionID", "guidID", "pubDateID" ];
const elementLen = elements.length;

let clearAll = function () {
    for ( let i = 0; i < elementLen; i += 1 ) {
        let o = selector( "#" + elements[ i ] );
        if ( o.length > 0 ) {
            o.get( 0 ).innerHTML = '';
        }
    }
};

let processJSON = function ( json ) {

    let items = json.rss.channel.item,
        result = '<ul>',
        i = 0;
    for ( let t in items ) {
        result += '<li onclick="getRSSItem(' + i + ');" >';
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

    item.title.text = selector( "#titleID" ).html();
    item.description.text = selector( "#descriptionID" ).html();

    item.guid.text = selector( "#guidID" ).html();
    x = new Date().getTime();
    y = MF.convertFromBaseTenToBaseX( 16, x );

    p = dom.html( "#pubDateID" );
    if ( p !== "" ) {
        item.pubDate.text = p;
    } else {
        item.pubDate.text = new Date();
    }

    processJSON( jsonDATA );
};

let insertRecord = function () {

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

let saveData = function () {

    let xmlData = '',
        c,
        wbStringRA = stringUtils.replaceAll;

    xmlData = xml.jsonToXML( jsonDATA );
    xmlData = wbStringRA( xmlData, "&", "&amp;amp;" );
    xmlData = wbStringRA( xmlData, "><", ">\n<" );
    xmlData = wbStringRA( xmlData, "<", "&lt;" );
    xmlData = wbStringRA( xmlData, ">", "&gt;" );
    c = document.getElementById( "feedOutput" );
    c.innerHTML = '&lt;?xml version="1.0" encoding="utf-8"?&gt;' + xmlData;
};

let getRSSItem = function ( index ) {

    var item;
    lastUpdated = index;
    item = jsonDATA.rss.channel.item[ index ];

    dom.html( "#titleID", item.title.text, 0 );
    dom.html.html( "#descriptionID", item.description.text );
    dom.html( "#guidID", item.guid.text );
    dom.html( "#pubDateID", item.pubDate.text );

};

function processData( data ) {
    // now we have a JSON object
    let xmlDoc = xml.getAsXMLDocument( data );
    let parsedJSON = xml.simpleRSSToJSON( xmlDoc )
    processJSON( parsedJSON );
}

export {
    processData,
    clearAll,
    updateRecord,
    insertRecord,
    saveData
};
