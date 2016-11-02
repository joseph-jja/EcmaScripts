import * as ws from "client/utils/webStorage";

describe( "tests on web storage object", function () {

    it( "is sessionEnabled test", function () {
        expect( ws.sessionEnabled ).toEqual( true );
    } );

    it( "is localEnabled test", function () {
        expect( ws.localEnabled ).toEqual( true );
    } );

    it( "create store test", function () {
        var store = ws.createKeyStore();
        expect( store.getItem( 'empty' ) ).toEqual( undefined );

        store.setItem( "testData", "dunny" );
        expect( store.getItem( "testData" ) ).toEqual( "dunny" );

        expect( store.key( "testData" ) ).toEqual( "dunny" );
        expect( store.key( 'a' ) ).toBe( undefined );

        store.removeItem( "testData" );
        expect( store.getItem( "testData" ) ).toBe( null );
    } );

    it( "set and remove item from session test", function () {
        ws.sessionStore.setItem( "testData", "dunny" );
        expect( ws.sessionStore.getItem( "testData" ) ).toEqual( "dunny" );
        ws.sessionStore.removeItem( "testData" );
        expect( ws.sessionStore.getItem( "testData" ) ).toBe( null );
    } );

    it( "set and remove item from local test", function () {
        ws.localStore.setItem( "testData", "dunny" );
        expect( ws.localStore.getItem( "testData" ) ).toEqual( "dunny" );
        ws.localStore.removeItem( "testData" );
        expect( ws.localStore.getItem( "testData" ) ).toBe( null );
    } );
} );
