import XmlHttp from "client/net/xmlhttp";

describe( 'testing xmlhttp', () => {

    it( 'BinaryClock  test', () => {
        const request = new XmlHttp();
        expect( request.open ).toBeDefined();
    } );
} );
