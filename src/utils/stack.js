// simple stack that a caller can call new on
// this should just be a push pop and get type thing
function stack() {
    this.index = 0;
    this.list = {};
};

stack.prototype.push = function ( key, obj ) {
    this.list[ key ] = obj;
    this.index++;
};

stack.prototype.pop = function ( key ) {
    this.list[ key ] = null;
    this.index--;
};

stack.prototype.get = function ( key ) {
    return this.list[ key ];
};

stack.prototype.clear = function () {
    for ( let o in this.list ) {
        if ( o ) {
            this.list[ o ] = undefined;
        }
        this.index = 0;
    }
};

export {
    stack
};
