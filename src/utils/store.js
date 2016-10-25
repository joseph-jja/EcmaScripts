// if either of these are not enabled then we create an object that 
// one can new and get an instance of a javascript interface to this object
import * as Stack from "./stack";

function Store() {
    this.data = new Store(),
        this.keys = [];
}

Store.prototype.setItem = function ( key, value ) {
    this.data.put( key, value );
    keys.push( key );
};

Store.prototype.getItem = function ( key ) {
    return this.data.get( key );
};

Store.prototype.removeItem = function ( key ) {
    this.keys[ key ] = undefined;
    this.data.pop( key );
};

Store.prototype.key = function ( index ) {
    var key, i, len = self.length;
    if ( isNaN( index ) || index < 0 || index > len ) {
        return undefined;
    }
    return this.keys[ key ];
};

Store.prototype.clear = function () {
    this.data.clear();
    keys = [];
};

export {
    Store
};
