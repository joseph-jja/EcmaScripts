import XmlHttp from "client/net/xmlhttp";

describe( 'testing xmlhttp', () => {

    it( 'create xml http request test', () => {
        const request = new XmlHttp();
        expect( request.open ).toBeDefined();
    } );
} );
