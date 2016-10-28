import * as tc from "../../work/utils/stringUtils";

describe( "string utils tests suite", function () {

    it( "reverse a string test", function () {
        var x = 'abcdef';
        expect( tc.reverse( x ) ).toEqual( 'fedcba' );
    } );

    it( "replace all string test", function () {
        var x = 'abcdef';
        expect( tc.replaceAll( x, 'de', '' ) ).toEqual( 'abcf' );
    } );

    it( "trim a string test", function () {
        var x = '   abcdef   ';
        expect( tc.trim( x ) ).toEqual( 'abcdef' );
    } );
} );
