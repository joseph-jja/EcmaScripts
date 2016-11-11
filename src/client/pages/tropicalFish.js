// libs first 
import * as dom from 'client/dom/DOM';
import * as css from 'client/dom/CSS';
import * as events from 'client/dom/events';
import * as ajax from 'client/net/ajax';
import selector from 'client/dom/selector';
import * as xml from 'client/browser/xml';

// components
import footer from 'client/components/footer';
import * as menu from 'client/components/menu';


var jsonData = {};

function clickCallBack() {
    var ih, xitem, g, anchorTags, xlen;

    ih = this.innerHTML;
    xitem = jsonData[ 'tropical_fish' ][ 'fish_data' ];
    xlen = xitem.length;
    for ( g = 0; g < xlen; g += 1 ) {
        if ( xitem[ g ].name[ '#text' ] === ih ) {
            selector( "#fishdataContentArea" ).get( 0 ).innerHTML = xitem[ g ].comment[ '#text' ];
        }
    }
    anchorTags = selector( '#container span.selected' );
    xlen = anchorTags.length;
    for ( g = 0; g < xlen; g += 1 ) {
        css.removeClass( anchorTags.get( g ), 'selected' );
    }
    this.className += " selected";
}

function processJSON() {
    var i, name, data, parent,
        li, anchor, fish,
        anchorTags, len;

    parent = selector( "#fish_tabs" ).get( 0 );
    parent.innerHTML = '';
    fish = jsonData[ 'tropical_fish' ][ 'fish_data' ];
    len = fish.length;
    for ( i = 0; i < len; i += 1 ) {
        name = fish[ i ][ 'name' ][ '#text' ];
        data = fish[ i ][ 'comment' ][ '#text' ];
        li = dom.createElement( 'li', parent );
        anchor = dom.createElement( 'span', li, {
            "className": "toplevel collapsed",
            "id": name.toLowerCase()
        } );
        anchor.innerHTML = name;
        anchor.onclick = clickCallBack;
    }
    dom.html( "#fishdataContentArea", jsonData[ 'tropical_fish' ][ 'fish_data' ][ 0 ].comment[ '#text' ] );
    anchorTags = selector( 'span.toplevel' );
    css.addClass( anchorTags.get( 0 ), 'selected' );
}

function getXMLDocument() {
    var xmlDOC;
    if ( this.xmlhttp.readyState === 4 ) {
        xmlDOC = xml.getAsXMLDocument( this.xmlhttp.responseText );
        jsonData = xml.xml2json( xmlDOC );
        processJSON();
    }
}

function doPageLoad() {
    ajax.get( getXMLDocument, "tropical_fish.xml", null );

    menu.basicMenu();
    footer( 'footer' );
}

events.addOnLoad( doPageLoad );
