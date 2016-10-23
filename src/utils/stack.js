// simple stack that a caller can call new on
function stack() {
    this.index = 0;
    this.list = {};
};

stack.prototype.push = function (key, obj, cb) {
    this.list[key] = {
        data: obj,
        callback: cb
    };
    this.index++;
};

stack.prototype.pop = function (key) {
    this.list[key] = null;
    this.index--;
};

stack.prototype.clear = function () {
    for (let o in this.list) {
        if (o && this.list[o]) {
            let obj = this.list[o];
            try {
                obj.callback && obj.callback(obj);
                if (obj.data) {
                    obj.data = undefined;
                }
            } catch (e) {
                // do somehting with the exception?
            }
        }
        this.index = 0;
    }
};

export {
    stack
};
