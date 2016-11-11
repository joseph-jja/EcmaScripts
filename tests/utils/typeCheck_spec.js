import * as tc from "utils/typeCheck";

describe( "type check utils tests suite", function () {

    it( "exists method test", function () {
        var x;
        expect( tc.exists( x ) ).toBe( false );
        x = "3d movies";
        expect( tc.exists( x ) ).toBeDefined();
    } );

    it( "string method test", function () {
        var x = 123;
        expect( tc.isString( x ) ).toBe( false );
        x = "123";
        expect( tc.isString( x ) ).toBe( true );
    } );

    it( "number method test", function () {
        var x = 123;
        expect( tc.isNumber( x ) ).toBe( true );
        x = "123";
        expect( tc.isNumber( x ) ).toBe( false );
    } );

    it( "array method test", function () {
        var x = 123;
        expect( tc.isArray( x ) ).toBe( false );
        x = [ "123" ];
        expect( tc.isArray( x ) ).toBe( true );
    } );

    it( "function method test", function () {
        var x = 123;
        expect( tc.isFunction( x ) ).toBe( false );
        x = function () {
            return 1;
        };
        expect( tc.isFunction( x ) ).toBe( true );
    } );

    it( "object method test", function () {
        var x = 123;
        expect( tc.isObject( x ) ).toBe( false );
        x = {
            "s": "123"
        };
        expect( tc.isObject( x ) ).toBeDefined();
    } );

    it( "regexp method test", function () {
        var x = 123;
        expect( tc.isRegExp( x ) ).toBe( false );
        x = /^a/;
        expect( tc.isRegExp( x ) ).toBe( true );
    } );
} );
