import AstronomyMathUtilitiesInstance from 'client/components/space/AstronomyMathUtilities';

describe( 'testing AstronomyMathUtilitiesInstance', () => {

    // raDegreesToHourMinutesSeconds
    it ( 'raDegreesToHourMinutesSeconds: should convert right ascension in degrees to hours, minutes, and seconds', () => {
        const result = AstronomyMathUtilitiesInstance.raDegreesToHourMinutesSeconds( 120.5356 );
        expect( result ).toEqual( { hours: 8, minutes: 2, seconds: 8.544 } );
    } );

    //decDegreesToHourMinutesSeconds


    //hoursMinutesSeconds

    //degreeHHMMSSToDegrees

    //mapTo24Hour

    //getFraction

});
