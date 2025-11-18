import AstronomyDateUtilitiesInstance from 'client/components/space/AstronomyDateUtilities';

describe( 'testing AstronomyDateUtilitiesInstance', () => {

    const now = new Date();
    now.setFullYear( 2025 );
    now.setMonth( 10 );
    now.setDate( 18 );
    now.setHours( 8 );
    now.setMinutes( 12 );
    now.setSeconds( 34 );
    now.setMilliseconds( 0 );

    const utc = AstronomyDateUtilitiesInstance.toUTC( now );

    const longitude = 37.75060;

    // toJulian
    it( 'toJulian: convert utc to julian', () => {
        const result = AstronomyDateUtilitiesInstance.toJulian( utc );
        expect( result ).toEqual( '2460998.175394' );
    } );

    // toJulianLT
    it( 'toJulianLT: convert local time to julian', () => {
        const result = AstronomyDateUtilitiesInstance.toJulianLT( now );
        expect( result ).toEqual( '2460998.175394' );
    } );

    // toGMST
    it( 'toGMST: convert julian to GMST', () => {
        const result = AstronomyDateUtilitiesInstance.toGMST( '2460998.175394' );
        expect( result ).toEqual( '301.099915' );
    } );

    // gmstToLST
    it( 'gmstToLST: convert GMST to LST', () => {
        const result = AstronomyDateUtilitiesInstance.gmstToLST( '301.099915', longitude );
        expect( result ).toEqual( '338.850515' );
    } );

    // utcToLST
    it( 'toGMST: convert utc to LST', () => {
        const result = AstronomyDateUtilitiesInstance.utcToLST( utc, longitude );
        expect( result ).toEqual( '338.850515' );
    } );

} );
