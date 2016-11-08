var path = require( "path" ),
    webpack = require( "webpack" );;

module.exports = {
    "entry": {
        "index": "./src/client/pages/index"
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
            "commonUtils": "utils",
            "client": "client"
        }
    },
    "module": {
        "loaders": [ {
            "loader": "babel",
            exclude: /node_modules/,
            "query": {
                "presets": [ "es2015" ]
            }
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
