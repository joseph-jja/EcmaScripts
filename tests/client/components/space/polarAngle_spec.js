import PolarisCalculatorInstance from '/js/client/components/space/PolarScopeCalculator';
import AstronomyMathUtilitiesInstance from '/js/client/components/space/AstronomyMathUtilities';

const AMU = AstronomyMathUtilitiesInstance;

describe( 'testing polaris hour angle calculations', () => {

    it('polar hour angle test 1', () => {

        const latitude = 38.20;
        const longitude = -121.991;

        const now = new Date();
        now.setFullYear(2025);
        now.setMonth(10);
        now.setDate(21);
        now.setHours(10);
        now.setMinutes(53);
        now.setSeconds(19);
        now.setMilliseconds(0);

        //const polarisRA = 2 + (31/60) + (49.09/3600); // 2.5303027777777777
        const polarisRA2 = 3.1208056;

        const { correctHourAngle } = PolarisCalculatorInstance.calculateHourAngle(now, polarisRA2, longitude);

        expect( +Number(correctHourAngle).toFixed(0) ).toEqual(4);
        //expect(AMU.hoursMinutesSecondsTo24(hourAngle)).toEqual('3:42:12');

    });

    /*it('polar hour angle test 2', () => {

        const latitude = 38.20;
        const longitude = -121.991;

        const now = new Date();
        now.setFullYear(2025);
        now.setMonth(10);
        now.setDate(25);
        now.setHours(19);
        now.setMinutes(38);
        now.setSeconds(50);
        now.setMilliseconds(0);

        const polarisRA = 2 + (31/60) + (49.09/3600); // 2.5303027777777777
        const polarisRA2 = 3.1208056;

        const hourAngle = PolarisCalculatorInstance.calculateHourAngle(now, polarisRA, longitude);

        expect( +Number(hourAngle).toFixed(0) ).toEqual(5);
        expect(AMU.hoursMinutesSecondsTo24(hourAngle)).toEqual('5:03:17');

    });*/
});

