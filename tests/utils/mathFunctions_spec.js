import MF from "utils/mathFunctions";

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

    it( "test square", function () {
        expect( MF.square( 3 ) ).toEqual( 9 );
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

    it( "test conversions", function () {
        expect( MF.convertFromBaseTenToBaseX( 16, 12 ) ).toEqual( 'C' );
        expect( MF.convertFromBaseTenToBaseX( 8, 12 ) ).toEqual( '14' );
        expect( MF.convertFromBaseXToBaseTen( 10, 'F' ) ).toEqual( 15 );
    } );

    it( "test computePerimeter", function () {
        expect( MF.computePerimeter( 0, 0, 10, 0, 10, 10, 0, 10, 2 ) ).toEqual( 40 );
        expect( MF.computePerimeterByLength( 10, 10, 10, 10 ) ).toEqual( 40 );
        expect( MF.computePerimeterOfSquare( 10 ) ).toEqual( 40 );
    } );

    it( "test areas", function () {
        expect( MF.areaOfTriangle( 10, 5 ).toPrecision( 5 ) ).toEqual( '25.000' );
        expect( MF.areaOfTrapizoid( 10, 8, 5 ).toPrecision( 5 ) ).toEqual( '65.000' );
        expect( MF.areaOfCircle( 10 ).toPrecision( 5 ) ).toEqual( '314.16' );
        expect( MF.surfaceAreaCone( 4, 5 ).toPrecision( 5 ) ).toEqual( '522.31' );
        expect( MF.surfaceAreaCylinder( 4, 5 ).toPrecision( 5 ) ).toEqual( '226.19' );
        expect( MF.surfaceAreaSphere( 5 ).toPrecision( 5 ) ).toEqual( '314.16' );
    } );

    it( 'pythagorean test', function () {
        var x = MF.pythagorean( 4, 3 );
        expect( x ).toEqual( 5 );
    } );

    it( 'circumferenceOfACircle test', function () {
        var x = MF.circumferenceOfACircle( 4 );
        expect( Math.floor(x) ).toEqual( 25 );
    } );

    it( 'volumeCone test', function () {
        var x = MF.volumeCone( 4, 5 );
        expect( Math.floor(x) ).toEqual( 83 );
    } );

    it( 'volumeCylinder test', function () {
        var x = MF.volumeCylinder( 4, 5 );
        expect( Math.floor(x) ).toEqual( 251 );
    } );

    it( 'volumeSphere test', function () {
        var x = MF.volumeSphere( 5 );
        expect( Math.floor(x) ).toEqual( 523 );
    } );

    it( 'degreesToRadians test', function () {
        var x = MF.degreesToRadians( 286 );
        // we use ceil here because it should be about 4.99
        expect( Math.ceil(x) ).toEqual( 5 );
    } );

    it( 'radiansToDegrees test', function () {
        var x = MF.radiansToDegrees( 5 );
        expect( Math.floor(x) ).toEqual( 286 );
    } );

    it( 'guid test', function () {
        var x = MF.generateGUID();
        expect( x ).not.toBe( undefined );
    } );
} );
