import * as Canvas from 'client/components/canvas';

describe( 'testing canvas', () => {

    let parent;

    beforeEach( () => {
        if ( !parent ) {
            parent = document.createElement( 'div' );
        }
        parent.id = 'container-for-canvas';
        document.body.appendChild( parent );
    } );

    afterEach( () => {
        if ( parent ) {
            document.body.removeChild( parent );
        }
    } );

    it( 'canvas test', () => {
        expect( Canvas ).toBeDefined();
    } );

    it( 'create canvas', () => {

        const cvs = Canvas.create( parent.id + 'cvs', parent.id, 100, 100 );
        expect( cvs ).toBeDefined();
    } );

} );
