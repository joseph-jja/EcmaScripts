import fetcher from "client/net/fetcher";

describe( 'testing fetcher', () => {

    it( 'fetcher  test', () => {
        expect( fetcher ).toBeDefined();
    } );

    it( 'fetcher  test to get data', ( done ) => {

        async function waitforIt() {

            const data = await fetcher( '/' );

            expect( data ).toBeDefined();
            done();
        }
        waitforIt();
    } );
} );
