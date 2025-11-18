import AstronomyMathUtilitiesInstance from 'client/components/space/AstronomyMathUtilities';

describe( 'testing AstronomyMathUtilitiesInstance', () => {

    // raDegreesToHourMinutesSeconds
    it ( 'raDegreesToHourMinutesSeconds: should convert right ascension in degrees to hours, minutes, and seconds', () => {
        const result = AstronomyMathUtilitiesInstance.raDegreesToHourMinutesSeconds( 120.5356 );
        expect( result ).toEqual( { hours: 8, minutes: 2, seconds: 8.54 } );
    } );

    //decDegreesToHourMinutesSeconds
    /*it ( 'decDegreesToHourMinutesSeconds: should convert declination in degrees to hours, minutes, and seconds', () => {
        const result = AstronomyMathUtilitiesInstance.decDegreesToHourMinutesSeconds( -45.7625 );
        expect( result ).toEqual( { hours: -45, minutes: 45, seconds: 45.0 } );
    } );

    //hoursMinutesSeconds
    it ( 'hoursMinutesSecondsToDegrees: should convert hours, minutes, and seconds to degrees', () => {
        const result = AstronomyMathUtilitiesInstance.hoursMinutesSecondsToDegrees( 8, 2, 8.544 );
        expect( result ).toBeCloseTo( 120.5356, 4 );
    } );
*/
    //degreeHHMMSSToDegrees
    it ( 'degreeHHMMSSToDegrees: should convert degree in HH:MM:SS format to degrees', () => {
        const result = AstronomyMathUtilitiesInstance.degreeHHMMSSToDegrees( 8, 2, 8.544 );
        expect( result ).toBeCloseTo( 8.03567, 4 );
    } );
    
    //mapTo24Hour
    it ( 'mapTo24Hour: should map hours to 24-hour format test 1', () => {
        const result = AstronomyMathUtilitiesInstance.mapTo24Hour( 15 );
        expect( result ).toBe( 15 );
    });

    it ( 'mapTo24Hour: should map hours to 24-hour format test 2', () => {
        const result2 = AstronomyMathUtilitiesInstance.mapTo24Hour( 27 );
        expect( result2 ).toBe( 3 );
    });

    it ( 'mapTo24Hour: should map hours to 24-hour format test 3', () => {
        const result3 = AstronomyMathUtilitiesInstance.mapTo24Hour( -5 );
        expect( result3 ).toBe( 19 );
    });

    //getFraction
    it ( 'getFraction: should return the fractional part of a number', () => {
        const result = AstronomyMathUtilitiesInstance.getFraction( 5.75 );
        expect( result ).toBeCloseTo( 0.75, 4 );
    });
});
