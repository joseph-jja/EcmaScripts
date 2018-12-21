import wbWindow from 'client/components/wbWindow';

describe( 'testing wbWindow', () => {

    let parent;

    beforeEach( () => {
        if ( !parent ) {
            parent = document.createElement( 'div' );
        }
        parent.id = 'container-for-webwindow';
        document.body.appendChild( parent );
    } );

    afterEach( () => {
        if ( parent ) {
            document.body.removeChild( parent );
        }
    } );

    it( 'wbWindow test', () => {
        expect( wbWindow ).toBeDefined();
    } );

    it( 'wbWindow create test', () => {
        const win = new wbWindow( parent.id );
        expect( win ).toBeDefined();
    } );

    it( 'wbWindow create test', () => {
        const win = new wbWindow( parent.id );
        spyOn( win, 'setTitle' );
        win.setTitle( 'This is a test' );
        expect( win.setTitle ).toHaveBeenCalled();
    } );

    it( 'wbWindow create test', () => {
        const win = new wbWindow( parent.id );
        spyOn( win, 'disableDrag' );
        win.disableDrag();
        expect( win.disableDrag ).toHaveBeenCalled();
    } );
} );
