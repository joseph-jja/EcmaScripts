import AstronomyDateUtilitiesInstance from 'client/components/space/AstronomyDateUtilities';

describe( 'testing AstronomyDateUtilitiesInstance', () => {

    const now = new Date( 2025, 10, 18, 8, 12, 34 );

    const utc = AstronomyDateUtilitiesInstance.toUTC( now );

    const longitude = -122.41210;

    // toJulian
    it( 'toJulian: convert utc to julian', () => {
        const result = AstronomyDateUtilitiesInstance.toJulian( utc );
        expect( Number( result ).toFixed( 0 ) ).toEqual( '2460998' );
    } );

    // toJulianLT
    it( 'toJulianLT: convert local time to julian', () => {
        const result = AstronomyDateUtilitiesInstance.toJulianLT( now );
        expect( Number( result ).toFixed( 0 ) ).toEqual( '2460998' );
    } );

    // toGMST
    it( 'toGMST: convert julian to GMST', () => {
        const result = AstronomyDateUtilitiesInstance.toGMST( '2460998.175394' );
        expect( result ).toEqual( '301.099915' );
    } );

    // gmstToLST
    it( 'gmstToLST: convert GMST to LST', () => {
        const result = AstronomyDateUtilitiesInstance.gmstToLST( '301.099915', longitude );
        expect( result ).toEqual( '178.687815' );
    } );

    // utcToLST
    it( 'toGMST: convert utc to LST', () => {
        const result = AstronomyDateUtilitiesInstance.utcToLST( utc, longitude );
        expect( result ).toEqual( '178.687815' );
    } );

    // calculateLST
    it( 'calculateLST: convert now to LST', () => {
        const result = AstronomyDateUtilitiesInstance.calculateLST( now, longitude );
        expect( Number( result ).toFixed( 0 ) ).toEqual( '11' );
    } );
} );
