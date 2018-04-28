import * as cookie from "utils/cookie";

describe( "cookie functions tests", function () {

    it( "test set and get functions", function () {

        cookie.set( 'hello', 'world' );
        const val = cookie.get( 'hello' );
        expect( val ).toEqual( 'world' );

    } );

    it( "test remove and get functions", function () {

        cookie.remove( 'hello' );
        const xval = cookie.get( 'hello' );
        expect( xval ).toBe( undefined );

    } );

} );
