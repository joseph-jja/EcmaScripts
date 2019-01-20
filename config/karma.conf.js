// Karma configuration
const path = require( "path" ),
    os = require( 'os' ),
    fs = require( 'fs' ),
    babelConfig = JSON.parse( fs.readFileSync( 'config/babel-config.json' ) );

const platform = os.platform();

const isAndroid = ( platform === 'android' );

module.exports = function ( config ) {

    var source = path.resolve( "./src" ),
        tests = path.resolve( "./tests" );

    config.set( {

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '..',

        // list of files / patterns to load in the browser
        files: [
            'tests/**/**_spec*.js', {
                pattern: 'src/**/**.js',
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
            'src/**/**.js': [ 'babel', 'webpack' ],
            'tests/**/**.js': [ 'webpack' ]
        },

        webpack: {
            module: {
                rules: [ {
                    test: /\.js$/,
                    exclude: /(node_modules)/,
                    loader: 'babel-loader',
                    query: babelConfig
                }, {
                    test: /\.js$/,
                    exclude: /(node_modules|tests)/,
                    loader: 'babel-istanbul-loader',
                    query: babelConfig
                } ]
            },
            resolve: {
                modules: [ path.join( __dirname, "src" ) ],
                alias: {
                    db: path.resolve( "src/db" ),
                    utils: path.resolve( "src/utils" ),
                    client: path.resolve( "src/client" )
                }
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
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || conGenerated on Mon Oct 24 2016 19:15:27 GMT-0700 (PDT)fig.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: [ ( isAndroid ? 'jsdom' : 'ChromeHeadless' ) ],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true

        // Concurrency level
        // how many browser should be started simultaneous
        //concurrency: 5
    } );
}
