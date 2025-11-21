/*import altAzToRaDec from 'client/components/space/altAzToRaDec';
import AstronomyMathUtilitiesInstance from '/js/client/components/space/AstronomyMathUtilities';
import AstronomyDateUtilitiesInstance from '/js/client/components/space/AstronomyDateUtilities';

const ADU = AstronomyDateUtilitiesInstance;
const AMU = AstronomyMathUtilitiesInstance;

describe( 'testing polaris hour angle calculations', () => {

    fit('get LST right', () => {

        const latitude = 38.3862;
        const longitude = -121.991;

        const now = new Date();
        now.setFullYear(2025);
        now.setMonth(10);
        now.setDate(20);
        now.setHours(21);
        now.setMinutes(30);
        now.setSeconds(43);
        now.setMilliseconds(0);
        const localTime = new Date(now.getTime());

        const utcTime = ADU.toUTC( localTime );
        const julianDate = ADU.toJulian( utcTime );
        const gmst = ADU.toGMST( julianDate );
        const lst = ADU.gmstToLST( gmst, longitude );

        //expect(lst).toEqual('4.367991043177');//'353.459038204435');
        const hourAngle = 14 + (7/60) + (50/360); 
        const ha = ((lst - 3.1208056));// * 24) % 15;
        //const ra = lst - hourAngle;
        expect( ha ).toEqual(hourAngle);
        //expect( ra ).toEqual(12.420156195565028);
        //expect(AMU.hoursMinutesSecondsTo24(ha2)).toEqual('12:15');
        //expect(AMU.hoursMinutesSecondsTo24(12.420156195565028)).toEqual('12:25:13');

    });
});
*/
