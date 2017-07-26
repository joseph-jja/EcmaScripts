var path = require( "path" ),
    webpack = require( "webpack" ),
    fs = require( 'fs' ),
    babelConfig = JSON.parse( fs.readFileSync( 'config/babel-config.json' ) );

module.exports = {
    "entry": {
        "canvasTest": "./src/client/pages/canvasTest",
        "emailForm": "./src/client/pages/emailForm",
        "fishLog": "./src/client/pages/fishLog",
        "fishPictures": "./src/client/pages/fishPictures",
        "index": "./src/client/pages/index",
        "helloWorld": "./src/client/pages/helloWorld",
        "myLinks": "./src/client/pages/myLinks",
        "performance": "./src/client/pages/performance",
        "programmingLanguages": "./src/client/pages/programmingLanguages",
        "programs": "./src/client/pages/programs",
        "resume": "./src/client/pages/resume",
        "rssEditor": "./src/client/pages/rssEditor",
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
        "root": [ path.resolve( "./src" ) ],
        "alias": {
            "utils": "utils",
            "client": "client"
        }
    },
    "module": {
        "loaders": [ {
            "loader": "babel",
            exclude: /node_modules/,
            "query": babelConfig
        }, {
            loader: "eslint",
            exclude: /node_modules/,
            "query": {
                "parser": "babel-eslint"
            }
        } ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin( {
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
                "cascade": false,
                "warnings": false,
                "side_effects": false
            }
        } )
    ]
};
