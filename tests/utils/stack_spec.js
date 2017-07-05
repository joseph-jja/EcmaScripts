import * as stack from "utils/stack";

describe( "stack utils tests suite", function () {

    it( "exists method test", function () {
        var x = new stack.Stack();
        expect( x ).toBeDefined();
    } );

} );
