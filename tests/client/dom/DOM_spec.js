import * as dom from "client/dom/DOM";

describe( "tests on DOM object", function () {

    it( "maxx and maxy function tests", function () {
        expect( dom.screen.maxx() ).toBeGreaterThan( 0 );
        expect( dom.screen.maxy() ).toBeGreaterThan( 0 );
    } );

    it( "create element test", function () {
        var r, x = dom.createElement( 'div', undefined, {
            id: 'domCreateTest'
        } );

        expect( x ).not.toBe( undefined );

        dom.html( '#domCreateTest', 'hello world' );
        expect( x.innerHTML ).toBe( 'hello world' );

        dom.toggleDisplay( 'domCreateTest' );
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
    } );
} );
