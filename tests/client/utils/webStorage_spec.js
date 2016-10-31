import * as ws from "../../../src/client/utils/webStorage";

describe( "tests on web storage object", function () {

    it( "is sessionEnabled test", function () {
        expect( ws.sessionEnabled ).toEqual( true );
    } );

    it( "is localEnabled test", function () {
        expect( ws.localEnabled ).toEqual( true );
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
