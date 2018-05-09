var path = require( "path" ),
    webpack = require( "webpack" ),
    fs = require( 'fs' ),
    baseDir = process.cwd(),
    UglifyJsPlugin = require( 'uglifyjs-webpack-plugin' ),
    babelConfig = JSON.parse( fs.readFileSync( `${baseDir}/config/babel-config.json` ) );

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
    "eslint": {
        "configFile": path.resolve( "./config/eslint.cfg" )
    },
    "output": {
        "filename": "[name].js",
        "chunkFilename": "bundle.js",
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
        "loaders": [ {
            "loader": "babel-loader",
            exclude: /node_modules/,
            "query": babelConfig
        }, {
            loader: "eslint-loader",
            exclude: /node_modules/,
            "query": {
                "parser": "babel-eslint"
            }
        } ]
    },
    plugins: [
        new UglifyJsPlugin( {
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
        } )
    ]
};
