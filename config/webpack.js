var path = require( "path" ),
    webpack = require( "webpack" );;

module.exports = {
    "eslint": {
        "configFile": path.resolve( "./config/eslint.cfg" )
    },
    "context": path.resolve( "." ),
    "entry": {
        "footer": "./src/client/components/footer",
        "navigation": "./src/client/components/navigation"
    },
    "output": {
        "filename": "[name].js",
        "chunkFilename": "bundle.js"
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
