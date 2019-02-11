import * as events from "client/dom/events";

describe( "tests on events object", function () {

    let parent;

    beforeEach( () => {
        if ( !parent ) {
            parent = document.createElement( 'div' );
        }
        parent.id = 'container-for-events-tests';
        document.body.appendChild( parent );
    } );

    afterEach( () => {
        if ( parent ) {
            document.body.removeChild( parent );
        }
    } );

    it( "tests for is touch", function () {

        const gotTouch = events.isTouchEnabled();

        expect( gotTouch ).not.toBeUndefined();
    } );

    it( "tests for get event", function () {

        events.addEvent( parent, 'click', ( e ) => {

            const evt = events.getEvent( e );
            expect( evt ).not.toBeUndefined();

        } );
        parent.click();
    } );

    it( "tests for get event target", function () {

        events.addEvent( parent, 'click', ( e ) => {

            const evt = events.getEvent( e );
            const tgt = events.getTarget( evt );
            expect( tgt ).not.toBeUndefined();

        } );
        parent.click();
    } );

    it( "tests for get event x", function () {

        events.addEvent( parent, 'click', ( e ) => {

            const evt = events.getEvent( e );
            const tgt = events.getEventPosX( evt );
            expect( tgt ).toEqual( jasmine.any( Number ) );

        } );
        parent.click();
    } );

    it( "tests for get event y", function () {

        events.addEvent( parent, 'click', ( e ) => {

            const evt = events.getEvent( e );
            const tgt = events.getEventPosY( evt );
            expect( tgt ).toEqual( jasmine.any( Number ) );

        } );
        parent.click();
    } );
} );
