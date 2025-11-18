import AstronomyDateUtilitiesInstance from 'client/components/space/AstronomyDateUtilities';

describe( 'testing AstronomyDateUtilitiesInstance', () => {

    const now = new Date();
    now.setFullYear(2025);
    now.setMonth(10);
    now.setDate(18);
    now.setHours(8);
    now.setMinutes(12);
    now.setSeconds(34);        
    now.setMilliseconds(0);    
    
    const utc = AstronomyDateUtilitiesInstance.toUTC(now);    

    // toJulian
    it ( 'toJulian: convert utc to julian', () => {
        const result = AstronomyDateUtilitiesInstance.toJulian( utc );
        expect( result ).toEqual( '2460998.175394' );
    } );

});
