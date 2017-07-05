import * as store from "utils/store";

describe( "store utils tests suite", function () {

    it( "store can be instantiated", function () {
        var x = new store.Store();
        expect( x ).toBeDefined();
    } );

    it( "setItem and getItem", function () {
        var x = new store.Store();
        x.setItem( 'bob', 'dole' );
        let y = x.getItem( 'bob' );
        expect( y ).toEqual( 'dole' );
    } );

    it( "setItem and removeItem", function () {
        var x = new store.Store();
        x.setItem( 'bob', 'dole' );
        x.removeItem( 'bob' );
        let y = x.getItem( 'bob' );
        expect( y ).toBeUndefined();
    } );

} );
