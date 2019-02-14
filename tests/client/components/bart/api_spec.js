import * as API from 'client/components/bart/api';

describe( 'bart api tests', () => {

    it( 'api should exist', () => {
        expect( API ).not.toBeUndefined();
    } );

    it( 'call getStations', () => {

        spyOn(window, 'fetch').and.callFake(() => {

            return {
                response: {
                    stations: {
                        root: {
                            stations: {
                                station: [{
                                    name: 'foo',
                                    abbr: 'bar'
                                },
                                {
                                    name: 'meh',
                                    abbr: 'lovely'
                                }]
                            }
                        }
                    }
                }
            };
        });

        const result = API.getStations();
        expect( result ).not.toBeUndefined();
    });
} );
