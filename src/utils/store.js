// if either of these are not enabled then we create an object that 
	// one can new and get an instance of a javascript interface to this object
import * as Stack from "./stack";

function Store() {
		this.data = new Store(),
		this.keys = [];
}

Store.prototype.setItem = function(key, value) { 
			this.data.put(key, value);
			keys.push(key);
};

Store.prototype.getItem = function(key) { 
			return this.data.get(key);
		};

		Store.prototype.removeItem = function(key) { 
			var i, len = self.length, idx; 
			for ( i =0; i < len; i+=1 ) {
				if ( keys[i] === key ) {
					idx = i;
					break;
				}
			}
			if ( typeof idx  !== 'undefined' ) {
				keys.splice(idx,1);
				store[key] = undefined;
				self.length = keys.length;
			}
		};
		
Store.prototype.key = function(index) { 
			var key, i, len = self.length; 
			if ( isNaN(index) || index < 0 || index > len ) { 
				return undefined; 
			}
			for ( i =0; i < len; i+=1 ) { 
				if ( i === index ) {
					key = keys[index];
					break;
				}
			}
			return key;
		};

Store.prototype.clear = function() { 
			this.data.clear();
			keys = [];
		};

export { Store };
