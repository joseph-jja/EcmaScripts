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
			return this.data.store[key];
		};
		self.removeItem = function(key) { 
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
		self.key = function(index) { 
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
		self.clear = function() { 
			store = [];
			keys = [];
			self.length = keys.length;
		};
		return self;
	};
