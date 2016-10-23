import * as XmlHttp from "./xmlhttp";
import * as Stack from "../utils/stack";

// one stack for all instances
var stack = new Stack();

export makeRequest = function(type, cbFN, url, data, async, headers) {
	var h, ajaxObj, 
	    xmlhttp = new XmlHttp(), 
	    index = stack.index;
	
     xmlhttp.open(type, url, async);
    ajaxObj = this;
    if ( headers ) { 
    	for ( h in headers ) {
    		xmlhttp.setRequestHeader(h, headers[h]);
    	} 
    }
    xmlhttp.onreadystatechange = function() {
        // the call asigns this callback to our ajax object
        // so the call can use this in it
    	cbFN.call(ajaxObj);
        if ( ajaxObj.xmlhttp.readyState === 4 ) {
            stack.pop('AJAX_' + index);
        }
    }
    if ( data == null ) { data = ""; }
    ajaxObj.index = index;
    ajaxObj.xmlhttp = xmlhttp; 
	
    xmlhttp.send(data);
    stack.push('AJAX_' + index, { data: ajaxObj } );
	
    return ajaxObj; 
};

//send a post request, which creates the object
//takes callback function, url and any data 
export post = function(callbackFN, url, postData) {	
	var headers = {"Content-Type": "application/x-www-form-urlencoded"};
   return makeRequest("POST", callbackFN, url, postData, true, headers);
};


//do a get request, good for getting a file
//takes callback function and  url 
export get = function(callbackFN, url, getData) {	
    return makeRequest("GET", callbackFN, url + ( ( getData ) ? "?" + getData : "" ), null, true);
};

//this allows us to cancel this ajax request
export cancelRequest = function(ajaxObj) {
    ajaxObj.xmlhttp.abort();
    stack.pop('AJAX_' + ajaxObj.index);
}

export cancelAll = function() {
    var i;
    for ( i =0; i < stack.
    stack.pop('AJAX_' + ajaxObj.index);
}
