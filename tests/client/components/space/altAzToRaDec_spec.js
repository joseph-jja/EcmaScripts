//import altAzToRaDec from 'client/components/space/altAzToRaDec';
//import AstronomyMathUtilitiesInstance from '/js/client/components/space/AstronomyMathUtilities';

/*describe( 'testing altAzToRaDec', () => {

    const now = new Date();
    now.setFullYear( 2025 );
    now.setMonth( 10 );
    now.setDate( 18 );
    now.setHours( 8 );
    now.setMinutes( 19 );
    now.setSeconds( 4 );
    now.setMilliseconds( 0 );

    const latitude = 37.75060;
    const longitude = -122.41210;
    
    // LST 180° 19' 1'' = 180.3170°

    it( 'vega: ra and dec', () => {
        // 291°45'2.9" +41°51'54.5"
        const az = AstronomyMathUtilitiesInstance.degreeHHMMSSToDegrees(291, 42, 2.9);
        const alt = AstronomyMathUtilitiesInstance.degreeHHMMSSToDegrees(41, 51, 54.5); 
        console.log(az, alt);
        const result = altAzToRaDec( alt, az, latitude, longitude, now );
        const decHours = result.decInHMS.hours;
        const raHours = result.raInHMS.hours;
        expect( decHours ).toEqual( 38 );
        expect(raHours ).toEqual( 18 );
        
        // hour angle coming as 62.57175631777128, hourAngle2: 26.39257737195739
        console.log(result);
    } );

    //it( 'vega: ra and dec', () => {
    // 291°42'2.9" +41°51'54.5"
    // const result = altAzToRaDec( utc );
    //expect( result ).toEqual( '2460998.175394' );
    //} );

} );*/
