import MF from "commonUtils/mathFunctions";

describe( "math functions tests", function () {

    it( "test add", function () {
        expect( MF.add( 2, 2, 2 ) ).toEqual( 6 );
    } );

    it( "test subtract", function () {
        expect( MF.subtract( 6, 2 ) ).toEqual( 4 );
    } );

    it( "test multiply", function () {
        expect( MF.multiply( 6, 2 ) ).toEqual( 12 );
    } );

    it( "test divide", function () {
        expect( MF.divide( 6, 2 ) ).toEqual( 3 );
    } );

    it( "test computeLineLength", function () {
        var r;
        expect( MF.computeLineLength( 6, 2 , 8, 2) ).toEqual( 2 );

        r = MF.computeLineLength( 6, 2 , 8, 4).toPrecision( 2 );
        expect( r ).toEqual( 2.8 );
    } );
} );
