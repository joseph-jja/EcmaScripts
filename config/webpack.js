var path = require( "path" ),
    webpack = require( "webpack" );;

module.exports = {
    "eslint": {
        "configFile": path.resolve( "./config/eslint.cfg" )
    },
    "context": path.resolve( "." ),
    "entry": {
        "footer": "./src/client/components/footer"
    },
    "output": {
        "filename": "[name].js"
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
        /*new webpack.optimize.UglifyJsPlugin( {
            compress: {
                warnings: false
            }
        } )*/
    ]
};
