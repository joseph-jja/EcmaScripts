// support for IE8 and above
// simple module to select elements based on css style selectors
// internally calls documenet.getElementById or querySelectorAll based on regex 
// this is done in a UMD format
var rquickExpr = /^#(?:([\w-]+)|(\w+)|\.([\w-]+))$/;

export selector function(expr, parent) {

        var result, len;

        if (arguments.length < 2 || typeof parent === 'undefined') {
            parent = d;
        }

        if (rquickExpr.test(expr)) {
            // remove the leading # and return array of 1 or 0
            result = parent.getElementById(expr.substring(1));
            result = (result ? [result] : []);
        } else {
            result = parent.querySelectorAll(expr);
        }

        this.get = function(i) {
            return result[i];
        };

        if (result && result.length) {
            this.length = result.length;
        } else if (result) {
            this.length = 1;
        }
        return this;
    };

    
