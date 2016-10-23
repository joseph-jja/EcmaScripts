//this is for all the requests 
var stack = () => {
    this.index = 0;
    this.list = [];
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
