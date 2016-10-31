import * as ws from "../../../src/client/utils/webStorage";

describe( "tests on web storage object", function () {

    it( "is sessionEnabled test", function () {
        expect( ws.sessionEnabled ).toEqual( true );
    } );

    it( "is localEnabled test", function () {
        expect( ws.localEnabled ).toEqual( true );
    } );
} );
