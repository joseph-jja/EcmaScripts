var path = require( "path" );

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
            "query": {
                "presets": [ "es2015" ]
            }
        } ],
        "postLoaders": [ {
            loader: "eslint",
            exclude: /node_modules/
        } ]
    }
}
