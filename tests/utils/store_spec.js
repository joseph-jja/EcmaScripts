import * as store from "utils/store";

describe( "type check utils tests suite", function () {

    it( "exists method test", function () {
        var x = new store.Store();
        expect( x ).toBeDefined();
    } );

} );
