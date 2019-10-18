import {
    exists
} from 'utils/typeCheck';

let copy, timings, startTime,
    getMetrics, metrics = {};

const hasPerformanceMetrics = ( ( exists( window.performance ) && exists( window.performance.timing ) ) ? true : false );

if ( hasPerformanceMetrics ) {

    timings = performance.timing;
    startTime = timings.navigationStart;

    copy = function () {
        // now copy over the metrics
        for ( let prop in timings ) {
            metrics[ prop ] = timings[ prop ] - startTime;
            if ( metrics[ prop ] < 0 ) {
                metrics[ prop ] = 0;
            }
        }
    };

    getMetrics = function ( callback, cbOptns ) {
        copy();
        if ( metrics[ 'loadEventEnd' ] <= 0 ) {
            setTimeout( function () {
                getMetrics( callback, cbOptns );
            }, 100 );
        } else {

            // setup some alias
            metrics.domContentLoadStart = metrics[ 'domContentLoadedEventStart' ];
            metrics.domContentLoadTime = ( metrics[ 'domContentLoadedEventEnd' ] - metrics[ 'domContentLoadedEventStart' ] );

            metrics.domInteractive = metrics[ 'domInteractive' ];

            metrics.domLoadStart = metrics[ 'loadEventStart' ];
            metrics.domLoadTime = ( metrics[ 'loadEventEnd' ] - metrics[ 'domContentLoadedEventStart' ] );

            metrics.networkLatency = ( metrics[ 'responseEnd' ] - metrics[ 'fetchStart' ] );
            metrics.pageLoadTime = metrics[ 'loadEventEnd' ];

            if ( callback ) {
                callback( cbOptns );
            }
        }
    };
}

export {
    hasPerformanceMetrics,
    getMetrics,
    metrics
};
