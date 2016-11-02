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

    it( "test cube", function () {
        expect( MF.cube( 3 ) ).toEqual( 27 );
    } );

    it( "test average", function () {
        expect( MF.average( 3, 4, 5, 6, 7 ) ).toEqual( 5 );
    } );

    it( "test factorial", function () {
        expect( MF.factorial( 5 ) ).toEqual( 120 );
    } );

    it( "test inverse and 1 over", function () {
        expect( MF.inverse( 3 ) ).toEqual( -3 );
        expect( MF.oneOver( 10 ) ).toEqual( 0.1 );
    } );

    it( "test computeLineLength", function () {
        var r;
        expect( MF.computeLineLength( 6, 2, 8, 2 ) ).toEqual( 2 );

        r = MF.computeLineLength( 6, 2, 8, 4 ).toPrecision( 2 );
        expect( +r ).toEqual( 2.8 );
    } );

    it( "test computePerimeter", function () {
        expect( MF.computePerimeter( 0, 0, 10, 0, 10, 10, 0, 10, 2 ) ).toEqual( 40 );
        expect( MF.computePerimeterByLength( 10, 10, 10, 10 ) ).toEqual( 40 );
        expect( MF.computePerimeterOfSquare( 10 ) ).toEqual( 40 );
    } );
} );
