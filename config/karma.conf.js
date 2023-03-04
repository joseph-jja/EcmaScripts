// Karma configuration
const fs = require( 'fs' ),
    webpack = require('webpack'), /* eslint-disable-line  */
    baseDir = process.cwd(),
    babelConfig = JSON.parse( fs.readFileSync( 'config/babel-config.json' ) ),
    webpackConfig = require( `${baseDir}/config/webpack` );

const files = [],
    excludeFiles = [];
files.push( {
    pattern: 'node_modules/**/**.js',
    included: false,
    nocache: true
} );
files.push( 'tests/**/**_spec*.js' );
files.push( {
    pattern: 'src/client/**/**.js',
    included: false,
    nocache: true
} );
files.push( {
    pattern: 'src/utils/**/**.js',
    included: false,
    nocache: true
} );
files.push( {
    pattern: 'src/polyfills/**/**.js',
    included: false,
    nocache: true
} );

module.exports = function ( config ) {

    config.set( {

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '..',

        // list of files / patterns to load in the browser
        files: files,

        // list of files to exclude
        exclude: excludeFiles,

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: [ 'jasmine' ],

        preprocessors: {
            'src/**/**.js': [ 'babel', 'webpack', 'coverage' ],
            'tests/**/**.js': [ 'webpack' ]
        },

        webpack: {
            mode: 'development',
            module: {
                rules: [ {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: babelConfig
                    }
                } ]
            },
            plugins: [],
            context: webpackConfig.context,
            resolve: webpackConfig.resolve
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
        reporters: [ 'spec', 'coverage' ],

        coverageReporter: {
            dir: 'coverage/',
            reporters: [ {
                type: 'html',
                subdir: 'report-html'
            } ]
        },

        /*coverageIstanbulReporter: {
            reports: [ 'text-summary' ],
            thresholds: {
                emitWarning: true,
                global: {
                    statements: 50,
                    lines: 50,
                    branches: 50,
                    functions: 50
                }
            }
        },*/

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || conGenerated on Mon Oct 24 2016 19:15:27 GMT-0700 (PDT)fig.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: [ 'ChromeHeadless' ],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true

        // Concurrency level
        // how many browser should be started simultaneous
        //concurrency: 5
    } );
};
