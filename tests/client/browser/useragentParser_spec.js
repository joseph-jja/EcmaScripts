import detect from 'client/browser/detect';
import useragentParser from 'client/browser/useragentParser';

describe( 'browser tests', function () {

    it( 'detect tests', () => {
        var d = detect();
        expect( d ).not.toBe( undefined );
    } );

    // FYI phantomjs is all over the place, so we just make sure we get values
    it( 'useragent tests', () => {
        var d = useragentParser;
        expect( d ).not.toBe( undefined );
        expect( d.uaOS ).not.toBe( undefined );
        expect( d.uaName ).not.toBe( undefined );
        expect( d.uaOSVersion ).not.toBe( undefined );
        expect( d.uaAppVersion ).not.toBe( undefined );
    } );
} );
