import * as API from 'client/components/bart/api';

describe( 'bart api tests', () => {

    beforeAll( () => {
        spyOn( fetch ).and.callFake( ( url ) => {

            // switch on url and return different json data

        } );
    } );

    it( 'api should exist', () => {
        expect( api ).not.toBeUndefined();
    } );

} );
