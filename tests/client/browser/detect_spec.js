import detect from "client/browser/detect.js";

describe( 'detect js', () => {

    it( 'exists', () => {
        expect( detect ).toBeDefined();
    } );

    it( 'pretend to be nn4 document layers exists', () => {
        document.layers = {};
        const r = detect();
        expect( r.name ).toEqual( 'Netscape Navigator' );
        delete document.layers;
    } );

    it( 'pretend to be opera exists', () => {
        window.opera = {};
        const r = detect();
        expect( r.name ).toEqual( 'Opera' );
        delete window.opera;
        delete document.all;
    } );

    it( 'pretend to be Gecko exists', () => {
        navigator.taintEnabled = true;
        const r = detect();
        expect( r.name ).toEqual( 'Gecko' );
        navigator.taintEnabled = undefined;
    } );
} );
