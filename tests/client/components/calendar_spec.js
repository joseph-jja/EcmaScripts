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

    it( 'calendar date test', () => {
        const mycal = new Calendar( parent.id );
        mycal.render();
        mycal.setCalendarDate( 5, 12, 2012 );
        const mdate = mycal.getCalendarDate();
        expect( mdate ).toEqual( 'June 12, 2012' );
    } );
} );
