import * as tc from "utils/typeCheck";

describe( "type check utils tests suite", function () {

    it( "exists method test to return false", function () {
        let x;
        expect( tc.exists( x ) ).toBe( false );
    } );

    it( "exists method test to return true", function () {
        let x = "3d movies";
        expect( tc.exists( x ) ).toBeDefined();
    } );

    it( "string method test to return false", function () {
        let x = 123;
        expect( tc.isString( x ) ).toBe( false );
    } );

    it( "string method test to return true", function () {
        let x = "123";
        expect( tc.isString( x ) ).toBe( true );
    } );

    it( "number method test to return false", function () {
        let x = "123";
        expect( tc.isNumber( x ) ).toBe( false );
    } );

    it( "number method test to return true", function () {
        let x = 123;
        expect( tc.isNumber( x ) ).toBe( true );
    } );

    it( "array method test to return false", function () {
        let x = 123;
        expect( tc.isArray( x ) ).toBe( false );
    } );

    it( "array method test to return true", function () {
        let x = [ "123" ];
        expect( tc.isArray( x ) ).toBe( true );
    } );

    it( "function method test to return false", function () {
        let x = 123;
        expect( tc.isFunction( x ) ).toBe( false );
    } );

    it( "function method test to return true", function () {
        let x = function () {
            return 1;
        };
        expect( tc.isFunction( x ) ).toBe( true );
    } );

    it( "object method test to return false", function () {
        let x = 123;
        expect( tc.isObject( x ) ).toBe( false );
    } );

    it( "object method test to return true", function () {
        let x = {
            "s": "123"
        };
        expect( tc.isObject( x ) ).toBeDefined();
    } );

    it( "regexp method test to return false", function () {
        let x = 123;
        expect( tc.isRegExp( x ) ).toBe( false );
    } );

    it( "regexp method test to return true", function () {
        let x = /^a/;
        expect( tc.isRegExp( x ) ).toBe( true );
    } );
} );
