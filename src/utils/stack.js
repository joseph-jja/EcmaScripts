// simple stack that a caller can call new on
// this should just be a push pop and get type thing
function Stack() {
    this.index = 0;
    this.list = {};
};

Stack.prototype.push = function ( key, obj ) {
    this.list[ key ] = obj;
    this.index++;
};

Stack.prototype.pop = function ( key ) {
    this.list[ key ] = undefined;
    this.index--;
};

Stack.prototype.get = function ( key ) {
    return this.list[ key ];
};

Stack.prototype.clear = function () {
    for ( let o in this.list ) {
        if ( o ) {
            this.list[ o ] = undefined;
            this.index--;
        }
    }
};

export {
    Stack
};
