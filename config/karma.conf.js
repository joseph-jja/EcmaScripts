// Karma configuration
// Generated on Mon Oct 24 2016 19:15:27 GMT-0700 (PDT)

var path = require( "path" );

module.exports = function ( config ) {
    config.set( {

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '..',

        // list of files / patterns to load in the browser
        files: [
            'tests/**/**_spec*.js', {
                pattern: 'work/**/**.js',
                included: false,
                nocache: true
            }
        ],


        // list of files to exclude
        exclude: [],


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: [ 'jasmine' ],

        preprocessors: {
            'src/**/**.js': [ 'webpack' ],
            'tests/**/**.js': [ 'webpack' ]
        },

        webpack: {
            module: {
                preLoaders: [ {
                    test: /\.js$/,
                    include: /tests/,
                    exclude: /(node_modules|src)/,
                    loader: 'babel',
                    query: {
                        presets: [ 'es2015' ]
                    }
                }, {
                    test: /\.js$/,
                    include: /src/,
                    exclude: /(node_modules|tests)/,
                    loader: 'babel-istanbul',
                    query: {
                        presets: [ 'es2015' ]
                    }
                }, ]
            }
        },

        webpackMiddleware: {
            // webpack-dev-middleware configuration
            // i.e.
            noInfo: true,
            // and use stats to turn off verbose output
            stats: {
                // options i.e. 
                chunks: false
            }
        },

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: [ 'spec', 'coverage', 'threshold' ],

        coverageReporter: {
            dir: 'coverage/',
            reporters: [ {
                type: 'html',
                subdir: 'report-html'
            } ]
        },

        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: [ 'PhantomJS' ],
        phantomjsLauncher: {
            // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
            exitOnResourceError: true
        },


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    } );
}
