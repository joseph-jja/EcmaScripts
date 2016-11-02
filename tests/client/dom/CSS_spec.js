import * as dom from "client/dom/DOM";
import * as css from "client/dom/CSS";

describe( "tests on CSS object", function () {

    it( "tests adding and removing css classes test", function () {
        var r, x = dom.createElement( 'div', undefined, {
            id: 'domCreateTest'
        } );

        dom.html( '#domCreateTest', 'hello world' );

        css.addClass( x, 'silly-puddy' );

        expect( css.hasClass( x, 'silly-puddy' ) ).toBe( true );

        css.removeClass( x, 'silly-puddy' );

        expect( css.hasClass( x, 'silly-puddy' ) ).toBe( false );
    } );
} );
