if (!document.getElementsByClassName) {
    (function(document) {

        function cleanString(instr) {
            return instr.replace(/\s\s+/g, ' ');
        }

        var elem = (typeof Element !== 'undefined');

        if (document.querySelectorAll) {
            document.getElementsByClassName = function(classNames) {
                var slctr = '',
                    clsNms;

                clsNms = cleanString(classNames).split(" ");
                slctr = "." + clsNms.join(".");

                return this.querySelectorAll(slctr);
            };

        } else {
            // double space here is for the file parser to rename this method
            document.getElementsByClassName = function(classNames) {
                var clsNms, result = [],
                    i, j, clen, len, nodes, hasAll, results = [];
                // get all nodes in document :( unless this is not the document node
                nodes = this.getElementsByTagName("*");
                clsNms = cleanString(classNames).split(" ");
                clen = clsNms.length;
                len = nodes.length;
                // TODO O(N) this
                for (i = 0; i < len; i += 1) {
                    hasAll = true;
                    for (j = 0; j < clen; j += 1) {
                        if (nodes[i].className.indexOf(clsNms[j]) === -1) {
                            hasAll = false;
                        }
                    }
                    if (hasAll) {
                        results.push(nodes[i]);
                    }
                }
                return results;
            };
        } // end
        if (elem) {
            Element.prototype.getElementsByClassName = document.getElementsByClassName;
        } else {
            // so Element will be available when an element does not have the method getElementsByClassName
            window.Element = function(ieElement) {
                var setNodeElement, self = {}, nodeElement = ieElement;

                setNodeElement = function(node) {
                    if (typeof nodeElement !== 'undefined') {
                        nodeElement.getElementsByClassName = document.getElementsByClassName;
                    }
                };

                setNodeElement(ieElement);

                self.setNode = setNodeElement;

                self.getElementsByClassName = function(getElementsByClassName) {
                    return nodeElement.getElementsByClassName(getElementsByClassName);
                };

                return self;
            };
        }
    })(document);
}
