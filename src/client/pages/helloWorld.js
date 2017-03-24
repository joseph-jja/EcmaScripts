import * as events from 'client/dom/events';

import selector from 'client/dom/selector';

import footer from 'client/components/footer';
import * as menu from 'client/components/menu';

import alphabet7by9 from "client/components/letters/alphabet7by9";
import Character from "client/components/letters/Character";

// any letter can be described as a series of 5 numbers
// those number will represent a binary number up to 111 1111
// this gives us a 7x5 character
var letters = [];
letters.push( alphabet7by9[ "H" ] );
letters.push( alphabet7by9[ "E" ] );
letters.push( alphabet7by9[ "L" ] );
letters.push( alphabet7by9[ "L" ] );
letters.push( alphabet7by9[ "O" ] );
letters.push( alphabet7by9[ "W" ] );
letters.push( alphabet7by9[ "O" ] );
letters.push( alphabet7by9[ "R" ] );
letters.push( alphabet7by9[ "L" ] );
letters.push( alphabet7by9[ "D" ] );

function pageLoadFN() {

    menu.basicMenu();
    footer( 'footer' );

    // build them all
    for ( var x = 0; x < letters.length; x += 1 ) {
        var t = new Character( "container", 'tbl' + x );
        t.build();
        t.matrix = letters[ x ];
        t.render();
    }
    // these next two lines are for a bug in IE6
    // when you do appendChild, it does not show the child
    // this gets the element content of the web window area
    // then it sets its inner HTML to that, nice huh!
    var r = selector( "#container" );
    if ( r ) {
        var y = r.get( 0 ).innerHTML;
        r.get( 0 ).innerHTML = y;
    }
}

function reload() {

    // build them all
    for ( var x = 0; x < letters.length; x += 1 ) {
        var t = new Character( "container", 'tbl' + x );
        t.matrix = letters[ x ];
        t.reset();
    }
    // build them all
    for ( var x = 0; x < letters.length; x += 1 ) {
        var t = new Character( "container", 'tbl' + x );
        t.matrix = letters[ x ];
        t.render();
    }
}

events.addOnLoad( pageLoadFN );
events.addEvent( '#reloadAnimation', 'click', reload );
