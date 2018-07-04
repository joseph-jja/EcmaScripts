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

function onFishTabsChanged() {
    const spanTags = selector( "#fishdataContentArea span.selection-tied" ),
        selectOption = selector( "#fish_tabs" ).get( 0 );

    let optionsindex, sloc, optn, selectedSpan;

    for ( let i = 0, end = spanTags.length; i < end; i++ ) {
        spanTags.get( i ).style.display = 'none';
    }

    optionsindex = selectOption.selectedIndex;
    optn = selectOption[ optionsindex ];
    sloc = optn.value;

    selectedSpan = selector( '#' + sloc ).get( 0 );
    selectedSpan.style.display = 'block';
}

function processJSON() {
    let i, name, data, parent,
        fish,
        anchorTags, len,
        container;

    parent = selector( "#fish_tabs" ).get( 0 );
    container = selector( '#fishdataContentArea' ).get( 0 );
    parent.innerHTML = '';
    fish = jsonData[ 'tropical_fish' ][ 'fish_data' ];
    len = fish.length;
    for ( i = 0; i < len; i += 1 ) {
        name = fish[ i ][ 'name' ][ '#text' ];
        data = fish[ i ][ 'comment' ][ '#text' ];
        const option = dom.createElement( 'option', parent );
        option.value = name.toLowerCase().replace( /\ /g, '-' );
        option.text = name;
        const span = dom.createElement( 'span', container, {
            "id": name.toLowerCase().replace( /\ /g, '-' ),
            'innerHTML': data,
        } );
        css.addClass( span, 'selection-tied' );
        if ( i > 0 ) {
            span.style.display = 'none';
        }
    }
    events.addEvent( parent, 'change', onFishTabsChanged );
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
