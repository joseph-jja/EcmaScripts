{
    "context": ".",
    "output": {
        "filename": "wbScripts.js"
    },
    "resolve": {
        "root": "./src",
        "modulesDirectories": [ "node_modules" ],
        "alias": {
            "commonUtils": "utils",
            "client": "client"
        }
    },
    "modules": {
        "loaders": [ {
            "loader": "babel",
            "query": {
                "presets": [ "es2015" ]
            }
        } ]
    }
}
