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
        win.setTitle( 'This is a test' );
        const ele = win.titleBar.querySelectorAll( 'span' )[ 0 ];
        expect( ele.innerHTML ).toEqual( 'This is a test' );
    } );

    it( 'wbWindow create test', () => {
        const win = new wbWindow( parent.id );
        const dnd = win.dragndrop;
        spyOn( dnd, 'setNONDragable' );
        win.disableDrag();
        expect( dnd.setNONDragable ).toHaveBeenCalled();
    } );

    it( 'wbWindow enableDrag test', () => {
        const win = new wbWindow( parent.id );
        const dnd = win.dragndrop;
        spyOn( dnd, 'setDragable' );
        win.enableDrag();
        expect( dnd.setDragable ).toHaveBeenCalled();
    } );
} );
