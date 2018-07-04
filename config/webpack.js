var path = require( "path" ),
    webpack = require( "webpack" ),
    fs = require( 'fs' ),
    baseDir = process.cwd(),
    UglifyJsPlugin = require( 'uglifyjs-webpack-plugin' ),
    babelConfig = JSON.parse( fs.readFileSync( `${baseDir}/config/babel-config.json` ) );

const eslintConfig = fs.readFileSync( path.resolve( "./config/eslint.json" ) ).toString();

const esJSON = JSON.parse( eslintConfig );

module.exports = {
    "entry": {
        "canvasTest": "./src/client/pages/canvasTest",
        "emailForm": "./src/client/pages/emailForm",
        "fishLog": "./src/client/pages/fishLog",
        "fishPictures": "./src/client/pages/fishPictures",
        "index": "./src/client/pages/index",
        "myLinks": "./src/client/pages/myLinks",
        "helloWorld": "./src/client/pages/helloWorld",
        "indexDBTaskList": "./src/client/pages/indexDBTaskList",
        "performance": "./src/client/pages/performance",
        "programmingLanguages": "./src/client/pages/programmingLanguages",
        "programs": "./src/client/pages/programs",
        "resume": "./src/client/pages/resume",
        "rssEditor": "./src/client/pages/rssEditor",
        "textEditor": "./src/client/pages/textEditor",
        "tropicalFish": "./src/client/pages/tropicalFish"
    },
    "context": path.resolve( "." ),
    "devtool": "source-map",
    "output": {
        "filename": "js/[name].js",
        "chunkFilename": "[file].bundle.js",
        "sourceMapFilename": "[file].source.map"
    },
    "resolve": {
        "modules": [ path.join( __dirname, "src" ) ],
        "alias": {
            "db": path.resolve( "src/db" ),
            "utils": path.resolve( "src/utils" ),
            "client": path.resolve( "src/client" )
        }
    },
    "module": {
        "rules": [ {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader",
                options: babelConfig
            }
        }, {
            loader: "eslint-loader",
            exclude: /node_modules/,
            options: Object.assign( {}, {
                "parser": "babel-eslint"
            }, esJSON )
        } ]
    },
    plugins: [
        /*new UglifyJsPlugin( {
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
                    "warnings": false,
                    "side_effects": false
                }
            }
        } )*/
    ]
};
