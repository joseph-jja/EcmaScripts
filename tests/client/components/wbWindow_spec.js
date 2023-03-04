import WebWindow from 'client/components/wbWindow';

describe( 'testing WebWindow', () => {

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

    it( 'WebWindow test', () => {
        expect( WebWindow ).toBeDefined();
    } );

    it( 'WebWindow create test', () => {
        const win = new WebWindow( parent.id );
        expect( win ).toBeDefined();
    } );

    it( 'WebWindow create test', () => {
        const win = new WebWindow( parent.id );
        win.setTitle( 'This is a test' );
        const ele = win.titleBar.querySelectorAll( 'span' )[ 0 ];
        expect( ele.innerHTML ).toEqual( 'This is a test' );
    } );

    it( 'WebWindow create test', () => {
        const win = new WebWindow( parent.id );
        const dnd = win.dragndrop;
        spyOn( dnd, 'setNONDragable' );
        win.disableDrag();
        expect( dnd.setNONDragable ).toHaveBeenCalled();
    } );

    it( 'WebWindow enableDrag test', () => {
        const win = new WebWindow( parent.id );
        const dnd = win.dragndrop;
        spyOn( dnd, 'setDragable' );
        win.enableDrag();
        expect( dnd.setDragable ).toHaveBeenCalled();
    } );
} );
