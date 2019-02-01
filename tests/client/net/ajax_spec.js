import * as ajax from "client/net/ajax";

describe( 'testing ajax', () => {

    it( 'ajax test', () => {
        expect( ajax ).toBeDefined();
    } );

    it( 'cancel request', ( done ) => {

        const get = ajax.get,
            cancel = ajax.cancelRequest;

        const request = get( ( data ) => {

        }, './data.json' );

        spyOn( request.xmlhttp, 'abort' );

        setTimeout( () => {
            cancel( request );
            expect( request.xmlhttp.abort ).toHaveBeenCalled();
            done();
        }, 1 );

    } );

    it( 'cancel POST request', ( done ) => {

        const post = ajax.post,
            cancel = ajax.cancelRequest;

        const request = post( ( data ) => {

        }, './bob' );

        spyOn( request.xmlhttp, 'abort' );

        setTimeout( () => {
            cancel( request );
            expect( request.xmlhttp.abort ).toHaveBeenCalled();
            done();
        }, 1 );

    } );
} );
