import * as tc from "../../src/utils/stringUtils";

describe( "string utils tests suite", function () {

    it( "reverse a string test", function () {
        var x = 'abcdef';
        expect( tc.reverse( x ) ).toEqual( 'fedcba' );
    } );

    it( "replace all string test", function () {
        var x = 'abcdef';
        expect( tc.replaceAll( x, 'de', '' ) ).toEqual( 'abcf' );
    } );

    it( "remove double spaces string test", function () {
        var x = '  ab  cd  ef  ';
        expect( tc.removeDoubleSpaces( x ) ).toEqual( ' ab cd ef ' );
    } );

    it( "trim a string test", function () {
        var x = '   abcdef   ';
        expect( tc.trim( x ) ).toEqual( 'abcdef' );
    } );

    it( "empty string test", function () {
        var x = '     ';
        expect( tc.isEmpty( x ) ).toEqual( true );
    } );
} );
