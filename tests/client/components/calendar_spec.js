import Calendar from 'client/components/calendar';

describe( 'testing calendar', () => {

    it( 'calendar test', () => {
        const mycal = new Calendar(document.body);
        expect( mycal ).toBeDefined();
    } );
} );
