import * as tc from "../../work/utils/typeCheck";
//var tc = require( "../../work/utils/typeCheck" );

describe( "type check utils tests suite", function () {

    it( "exists method test", function () {
        var x;
        expect( tc.exists( x ) ).toBe( false );
        x = "3d movies";
        expect( tc.exists( x ) ).toBeDefined();
    } );

} );
