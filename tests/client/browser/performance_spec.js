import * as perf from 'client/browser/performance';

describe( 'performance tests', () => {

    it( 'hasPerformanceMetrics test', () => {
        expect( perf.hasPerformanceMetrics ).toBeTruthy();
    } );

    it( 'getMetrics and metrics tests', ( done ) => {
        perf.getMetrics( () => {
            expect( perf.metrics.domContentLoadedEventStart ).toBeGreaterThan( 0 );
            done();
        } );
    } );
} );
