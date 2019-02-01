import * as events from "client/dom/events";

describe( "tests on events object", function () {

    it( "tests for is touch", function () {

        const gotTouch = events.isTouchEnabled();

        expect( gotTouch ).not.toBeUndefined();
    } );
} );
