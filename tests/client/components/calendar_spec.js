import Calendar from 'client/components/calendar';

describe( 'testing calendar', () => {

    let parent;

    beforeEach( () => {
        if ( !parent ) {
            parent = document.createElement( 'div' );
        }
        parent.id = 'container-for-calendar';
        document.body.appendChild( parent );
    } );

    afterEach( () => {
        if ( parent ) {
            document.body.removeChild( parent );
        }
    } );

    it( 'calendar test', () => {
        const mycal = new Calendar( parent.id );
        expect( mycal ).toBeDefined();
    } );

    it( 'calendar test handleclick ylarrow', () => {
        const mycal = new Calendar( parent.id );
        mycal.render();

        const td = parent.querySelector( '.ylarrow' );
        spyOn( mycal, 'handleClick' );
        td.click();
        expect( mycal.handleClick ).toHaveBeenCalled();
    } );

    it( 'calendar test handleclick mlarrow', () => {
        const mycal = new Calendar( parent.id );
        mycal.render();

        const td = parent.querySelector( '.mlarrow' );
        spyOn( mycal, 'handleClick' );
        td.click();
        expect( mycal.handleClick ).toHaveBeenCalled();
    } );

    it( 'calendar test handleclick yrarrow', () => {
        const mycal = new Calendar( parent.id );
        mycal.render();

        const td = parent.querySelector( '.yrarrow' );
        spyOn( mycal, 'handleClick' );
        td.click();
        expect( mycal.handleClick ).toHaveBeenCalled();
    } );

    it( 'calendar test handleclick mrarrow', () => {
        const mycal = new Calendar( parent.id );
        mycal.render();

        const td = parent.querySelector( '.mrarrow' );
        spyOn( mycal, 'handleClick' );
        td.click();
        expect( mycal.handleClick ).toHaveBeenCalled();
    } );

    it( 'calendar date test', () => {
        const mycal = new Calendar( parent.id );
        mycal.render();
        mycal.setCalendarDate( 5, 12, 2012 );
        const mdate = mycal.getCalendarDate();
        expect( mdate ).toEqual( 'June 12, 2012' );
    } );
} );
