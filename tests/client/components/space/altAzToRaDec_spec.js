import altAzToRaDec from 'client/components/space/altAzToRaDec';
import AstronomyMathUtilitiesInstance from '/js/client/components/space/AstronomyMathUtilities';

describe( 'testing altAzToRaDec', () => {

    // setting date needs to be done using timestamp
    // as using new date does not get the right offset
    // which causes small changes in julian date
    // which causes small changes in all calculations
    // so this wont work const now = new Date( 2025, 10, 18, 20, 47, 48 );
    // and this does
    const now = new Date( 1763527668000 );

    const latitude = 38.38620;
    const longitude = -121.99100;

    // 094°22'01.4"   +46°34'35.3" => 03h 48m34.2s   +24°11'55.2"
    // 000°29'57.6"   +38°53'21.1" => 03h 07m17.4s   +89°22'27.1"
    
    it( 'dec ra calculation 1', () => {
        // Vega: 301°46'24.7"   +23°37'17.6" => 18h 37m47.6s   +38°48'36.0"
        const az = AstronomyMathUtilitiesInstance.degreeHHMMSSToDegrees(301, 46, 24.7);
        const alt = AstronomyMathUtilitiesInstance.degreeHHMMSSToDegrees(23, 37, 17.6); 
        const result = altAzToRaDec( alt, az, latitude, longitude, now );
        const results = altAzToRaDec(alt, az, latitude, longitude, now);
        const decHours = result.decInHMS.hours;
        const raHours = result.raInHMS.hours;
        expect( decHours ).toEqual( 38 );
        expect( raHours ).toEqual( 18 );        
    } );

    it( 'dec ra calculation 2', () => {
        // Capella: 057°05'44.3"   +38°28'02.8" => 05h 18m38.3s   +46°01'23.6"
        const az = AstronomyMathUtilitiesInstance.degreeHHMMSSToDegrees(57, 5, 44.3);
        const alt = AstronomyMathUtilitiesInstance.degreeHHMMSSToDegrees(38, 28, 2.8); 
        const result = altAzToRaDec( alt, az, latitude, longitude, now );
        const results = altAzToRaDec(alt, az, latitude, longitude, now);
        const decHours = result.decInHMS.hours;
        const raHours = result.raInHMS.hours;
        expect( decHours ).toEqual( 46 );
        expect( raHours ).toEqual( 5 );        
    } );

     it( 'dec ra calculation 3', () => {
        // Pleiades 094°21'58.4"   +46°34'31.8" => 03h 48m34.1s   +24°11'55.2"
        const az = AstronomyMathUtilitiesInstance.degreeHHMMSSToDegrees(94, 21, 58.4);
        const alt = AstronomyMathUtilitiesInstance.degreeHHMMSSToDegrees(46, 34, 31.8); 
        const result = altAzToRaDec( alt, az, latitude, longitude, now );
        const results = altAzToRaDec(alt, az, latitude, longitude, now);
        const decHours = result.decInHMS.hours;
        const raHours = result.raInHMS.hours;
        expect( decHours ).toEqual( 24 );
        expect( raHours ).toEqual( 3 );        
    } );

    it( 'dec ra calculation 3', () => {
        // 000°29'57.6"   +38°53'21.3" => 03h 07m16.3s   +89°22'27.0"
        const az = AstronomyMathUtilitiesInstance.degreeHHMMSSToDegrees(0, 29, 57.6);
        const alt = AstronomyMathUtilitiesInstance.degreeHHMMSSToDegrees(38, 53, 21.3); 
        const result = altAzToRaDec( alt, az, latitude, longitude, now );
        const results = altAzToRaDec(alt, az, latitude, longitude, now);
        const decHours = result.decInHMS.hours;
        const raHours = result.raInHMS.hours;
        expect( decHours ).toEqual( 89 );
        expect( raHours ).toEqual( 3 );        
    } );
} );
