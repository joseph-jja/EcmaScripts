import * as xmlhttp from "./xmlhttp";
import * as stack from "../utils/stack";

export makeRequest = function(type, cbFN, url, data, async, headers) {
	var h, ajaxObj;
	
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
            //stack.pop('AJAX_');
        }
    }
    if ( data == null ) { data = ""; }
    xmlhttp.send(data);
    stack.push('AJAX_' + stack.index, this);
};

//send a post request, which creates the object
//takes callback function, url and any data 
export post = function(callbackFN, url, postData) {	
	var headers = {"Content-Type": "application/x-www-form-urlencoded"};
  makeRequest("POST", callbackFN, url, postData, true, headers);
};


//do a get request, good for getting a file
//takes callback function and  url 
export get = function(callbackFN, url, getData) {	
    makeRequest("GET", callbackFN, url + ( ( getData ) ? "?" + getData : "" ), null, true);
};

//this allows us to cancel this ajax request
export cancelRequest = function() {
    xmlhttp.abort();
    //stack.unregister(ajaxObj);
}
