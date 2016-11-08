var copy, timings, startTime,
    hasPerformanceMetrics,
    metrics;

hasPerformanceMetrics = ( typeof performance !== 'undefined' && performance.timing ) ? true : false;

if ( hasPerformanceMetrics ) {

    timings = performance.timing;
    startTime = timings.navigationStart;
    metrics = {};

    function copy() {
        var prop;

        // now copy over the metrics
        for ( prop in timings ) {
            metrics[ prop ] = timings[ prop ] - startTime;
            if ( metrics[ prop ] < 0 ) {
                metrics[ prop ] = 0;
            }
        }
    };

    function getMetrics( callback ) {
        var mem;

        copy();
        if ( metrics[ 'loadEventEnd' ] <= 0 ) {
            setTimeout( function () {
                getMetrics( callback );
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
                callback();
            }
        }
    };
}

export {
    hasPerformanceMetrics,
    metrics,
    getMetrics
};
