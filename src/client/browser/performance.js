import {
    exists
} from 'utils/typeCheck';

var copy, timings, startTime,
    getMetrics, metrics = {};

const hasPerformanceMetrics = ( ( exists( performance ) && exists( performance.timing ) ) ? true : false );

if ( hasPerformanceMetrics ) {

    timings = performance.timing;
    startTime = timings.navigationStart;

    copy = function () {
        var prop;

        // now copy over the metrics
        for ( prop in timings ) {
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
