// simple stack that a caller can call new on
// this should just be a push pop and get type thing
function Stack() {
    this.index = 0;
    this.list = {};
};

Stack.prototype.add = function(key, obj) {
    this.list[key] = obj;
    this.index++;
};

Stack.prototype.remove = function(key) {
    this.list[key] = undefined;
    this.index--;
};

Stack.prototype.get = function(key) {
    return this.list[key];
};

Stack.prototype.clear = function() {
    // need to make sure we don't create any memory leaks
    for (let o in this.list) {
        if (o) {
            this.list[o] = undefined;
        }
    }
    this.index = 0;
};

export {
    Stack
};