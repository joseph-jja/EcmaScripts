/*import altAzToRaDec from 'client/components/space/altAzToRaDec';
import AstronomyMathUtilitiesInstance from '/js/client/components/space/AstronomyMathUtilities';

describe( 'testing altAzToRaDec', () => {

    const now = new Date(2025, 11 -1 , 18, 20, 47, 48);

    const lat = 38.38620;
    const long = -121.99100;

    // 057°05'45.6"   +38°28'05.7" => 05h 18m38.3s   +46°01'23.6"
    // 094°22'01.4"   +46°34'35.3" => 03h 48m34.2s   +24°11'55.2"
    // 000°29'57.6"   +38°53'21.1" => 03h 07m17.4s   +89°22'27.1"
    
    it( 'dec ra calculation 1', () => {
        // 301°46'26.2"   +23°37'15.7" => 18h 37m47.6s   +38°48'36.1"
        const az = AstronomyMathUtilitiesInstance.degreeHHMMSSToDegrees(301, 46, 26.2);
        const alt = AstronomyMathUtilitiesInstance.degreeHHMMSSToDegrees(23, 37, 15.7); 
        const result = altAzToRaDec( alt, az, latitude, longitude, now );
        const results = altAzToRaDec(alt, az, lat, long, now);
        const decHours = result.decInHMS.hours;
        const raHours = result.raInHMS.hours;
        expect( decHours ).toEqual( 38 );
        expect( raHours ).toEqual( 18 );        
    } );

} );*/
