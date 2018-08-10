import * as performance from 'client/browser/performance';

describe( 'performance tests', () => {

    it( 'hasPerformanceMetrics test', () => {
        expect( performance.hasPerformanceMetrics ).toBeTruthy();
    } );

    it( 'getMetrics and metrics tests', ( done ) => {
        performance.getMetrics( () => {
            expect( performance.metrics.domContentLoadedEventStart ).toBeGreaterThan( 0 );
            done();
        } );
    } );
} );
