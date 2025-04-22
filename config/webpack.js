var path = require( "path" ),
    fs = require( 'fs' ),
    baseDir = process.cwd(),
    TerserPlugin = require( 'terser-webpack-plugin' ),
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
        "fishAnalyzer": "./src/client/pages/fishAnalyzer",
        "histogramCanvas": "./src/client/pages/histogramCanvas",
        "earthquakes": "./src/client/pages/earthquakes",
        "colorTable": "./src/client/pages/colorTable",
        "index": "./src/client/pages/index",
        "polarisScope": "./src/client/pages/polarisScope",
        "simpleBARTAPI": "./src/client/pages/simpleBARTAPI",
        "starSystem": "./src/client/workers/starSystem",
        "triStarSystem": "./src/client/workers/triStarSystem",
        "taskManager": "./src/client/pages/taskManager",
        "textEditor": "./src/client/pages/textEditor",
        "rssEditor": "./src/client/pages/rssEditor",
        "webEditor": "./src/client/pages/webEditor",
        "soundPlayer": "./src/client/pages/soundPlayer",
        // deprecated?
        "emailForm": "./src/client/pages/emailForm",
        "emailThankYou": "./src/client/pages/emailThankYou",
        "fishLog": "./src/client/pages/fishLog",
        "fishPictures": "./src/client/pages/fishPictures",
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
    devtool: "cheap-source-map",
    output: {
        "path": `${baseDir}/js`,
        "filename": "[name].js",
        "chunkFilename": "[file].bundle.js",
        "sourceMapFilename": "[file].source.map"
    },
    optimization: {

        minimize: true,
        minimizer: [ new TerserPlugin() ]
    },
    resolve: {
        modules: [
            "node_modules",
            path.join( __dirname, "src" )
        ],
        alias: {
            "/js/utils": path.resolve( "src/utils" ),
            "/js/client": path.resolve( "src/client" ),
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
    plugins: []
};
