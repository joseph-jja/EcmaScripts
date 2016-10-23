// simple stack that a caller can call new on
var stack = function() {
    this.index = 0;
    this.list = {};
};

stack.push = (key, obj, cb) => {
        this.list[key] = { data: obj, callback: cb };
        this.index++;
};

stack.pop = (key) => {
        this.list[key] = null;
        this.index--;
};

stack.clear () => {
    for ( let o this.list ) {
       if ( o && this.list[o] ) {
          let obj = this.list[o];
          try { 
            obj.callback && obj.callback( obj );
            obj.data && obj.data = undefined; 
          } catch (e) { 
              // do somehting with the exception?
          }  
       }
       this.index = 0;
    }
export stack;
