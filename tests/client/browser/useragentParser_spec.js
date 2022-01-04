import detect from 'client/browser/detect';
import useragentParser from 'client/browser/useragentParser';

describe( 'browser tests', function () {

    it( 'detect tests', () => {
        var d = detect();
        expect( d ).toBeDefined();
    } );

    // FYI phantomjs is all over the place, so we just make sure we get values
    it( 'useragent tests', () => {
        var d = useragentParser;
        expect( d ).toBeDefined();
        expect( d.uaOS ).toBeDefined();
        expect( d.uaName ).toBeDefined();
        expect( d.uaOSVersion ).toBeDefined();
        expect( d.uaAppVersion ).toBeDefined();
    } );
} );
