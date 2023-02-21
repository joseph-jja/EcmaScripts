import * as dom from "client/dom/DOM";

describe( "tests on DOM object", function () {

    it( "maxx and maxy function tests", function () {
        expect( dom.screen.maxx() ).toBeGreaterThan( 0 );
        expect( dom.screen.maxy() ).toBeGreaterThan( 0 );
    } );

    it( "create element test", function () {
        var x = dom.createElement( 'div', undefined, {
            id: 'domCreateTest'
        } );

        expect( x ).not.toBe( undefined );

        dom.html( '#domCreateTest', '' );
        expect( x.innerHTML ).toBe( '' );

        dom.html( '#domCreateTest', 'hello world' );
        expect( x.innerHTML ).toBe( 'hello world' );

        dom.toggleDisplay( 'domCreateTest' );
        expect( x.innerHTML ).toBe( 'hello world' );
    } );

    it( "find parent node test", function () {
        var r, x = dom.createElement( 'div', undefined, {
            id: 'domCreateTest'
        } );

        r = dom.createElement( 'div', x, {
            id: 'domDivNode'
        } );

        x = r;
        r = dom.createElement( 'span', x, {
            id: 'domSpanNode'
        } );

        expect( dom.findParent( r, 'div' ) ).not.toBe( undefined );

        x = r;
        r = dom.createElement( 'b', x, {
            className: 'sillyClass'
        } );

        expect( dom.findParent( r, 'div' ) ).not.toBe( undefined );
    } );

    // TODO test this
    xit( 'tests on input fields', function () {

        var i, r;

        r = dom.createElement( 'input', "domCreateTest", {
            id: 'domThingNode',
            className: 'someClass',
            size: 30,
            name: 'domThingNode'
        } );

        r = dom.createElement( 'textarea', "domCreateTest", {
            id: 'textFieldTest',
            className: 'someClass',
            size: 30,
            name: 'textFieldTest'
        } );

        dom.html( r, 'hello world' );

        dom.setTextFieldCursorPosition( r, 5, 6 );
        i = dom.getTextFieldCursorPosition( r );

        expect( i ).toBe( 5 );
    } );
} );
