var path = require( "path" ),
    webpack = require( "webpack" ),
    fs = require( 'fs' ),
    baseDir = process.cwd(),
    UglifyJsPlugin = require( 'uglifyjs-webpack-plugin' ),
    babelConfig = JSON.parse( fs.readFileSync( `${baseDir}/config/babel-config.json` ) );

const eslintConfig = fs.readFileSync( path.resolve( "./config/eslint.json" ) ).toString();

const esJSON = JSON.parse( eslintConfig ),
    esJSONWP = Object.keys( esJSON.globals );

esJSON.globals = esJSONWP;

module.exports = {
    "mode": "production",
    "entry": {
        "animatedFish": "./src/client/workers/animatedFish",
        "asciiTable": "./src/client/pages/asciiTable",
        "calculatorExamples": "./src/client/pages/calculatorExamples",
        "calendarExamples": "./src/client/pages/calendarExamples",
        "canvasTest": "./src/client/pages/canvasTest",
        "earthquakes": "./src/client/pages/earthquakes",
        "colorTable": "./src/client/pages/colorTable",
        "index": "./src/client/pages/index",
        "simpleBARTAPI": "./src/client/pages/simpleBARTAPI",
        "starSystem": "./src/client/workers/starSystem",
        "taskManager": "./src/client/pages/taskManager",
        "textEditor": "./src/client/pages/textEditor",
        "rssEditor": "./src/client/pages/rssEditor",
        "webEditor": "./src/client/pages/webEditor",
        // deprecated?
        "emailForm": "./src/client/pages/emailForm",
        "emailThankYou": "./src/client/pages/emailThankYou",
        "fishLog": "./src/client/pages/fishLog",
        "fishPictures": "./src/client/pages/fishPictures",
        "index-old": "./src/client/pages/index-old",
        "local": "./src/client/pages/local",
        "myLinks": "./src/client/pages/myLinks",
        "helloWorld": "./src/client/pages/helloWorld",
        "performance": "./src/client/pages/performance",
        "programmingLanguages": "./src/client/pages/programmingLanguages",
        "programs": "./src/client/pages/programs",
        "resume": "./src/client/pages/resume",
        "tropicalFish": "./src/client/pages/tropicalFish"
    },
    context: path.resolve( "." ),
    devtool: "none",
    output: {
        "path": `${baseDir}/js`,
        "filename": "[name].js",
        "chunkFilename": "[file].bundle.js",
        "sourceMapFilename": "[file].source.map"
    },
    optimization: {},
    resolve: {
        modules: [
            "node_modules",
            path.join( __dirname, "src" )
        ],
        alias: {
            "db": path.resolve( "src/db" ),
            "utils": path.resolve( "src/utils" ),
            "client": path.resolve( "src/client" ),
            "@babel": path.resolve( "node_modules/@babel" )
        }
    },
    module: {
        rules: [ {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader",
                options: babelConfig
            }
        }, {
            loader: "eslint-loader",
            exclude: /node_modules/,
            options: esJSON
        } ]
    },
    plugins: [
        new UglifyJsPlugin( {
            sourceMap: true,
            uglifyOptions: {
                maxLineLen: 10000,
                compress: {
                    "sequences": false,
                    "properties": false,
                    "dead_code": true,
                    "drop_debugger": true,
                    "unsafe": false,
                    "conditionals": false,
                    "comparisons": false,
                    "evaluate": false,
                    "booleans": false,
                    "loops": false,
                    "unused": false,
                    "hoist_funs": false,
                    "hoist_vars": true,
                    "if_return": false,
                    "join_vars": true,
                    "side_effects": false
                }
            }
        } )
    ]
};
