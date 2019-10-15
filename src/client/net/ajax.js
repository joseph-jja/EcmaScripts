import xmlHttp from "client/net/xmlhttp";
import * as Stack from "utils/stack";

let stack = new Stack.Stack();

export function makeRequest(type, cbFN, url, data, async, headers = {}) {
    let h, ajaxObj = {};

    ajaxObj.xmlhttp = xmlHttp();
    ajaxObj.index = stack.index;

    ajaxObj.xmlhttp.open(type, url, async);
    for (h in headers) {
        ajaxObj.xmlhttp.setRequestHeader(h, headers[h]);
    }
    ajaxObj.xmlhttp.onreadystatechange = function() {
        // the call asigns this callback to our ajax object
        // so the call can use this in it
        cbFN.call(ajaxObj);
        if (ajaxObj.xmlhttp.readyState === 4) {
            stack.get('AJAX_' + ajaxObj.index);
        }
    };

    if (data === null) {
        data = "";
    }

    ajaxObj.xmlhttp.send(data);
    stack.add('AJAX_' + ajaxObj.index, {
        data: ajaxObj
    });

    return ajaxObj;
};

//send a post request, which creates the object
//takes callback function, url and any data
export function post(callbackFN, url, postData) {
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    };
    return makeRequest("POST", callbackFN, url, postData, true, headers);
};

//do a get request, good for getting a file
//takes callback function and  url
export function get(callbackFN, url, getData) {
    return makeRequest("GET", callbackFN, url + ((getData) ? "?" + getData : ""), null, true);
};

//this allows us to cancel this ajax request
export function cancelRequest(ajaxObj) {
    ajaxObj.xmlhttp.abort();
    stack.get('AJAX_' + ajaxObj.index);
}

export function cancelAll() {
    if (!stack) {
        return;
    }
    for (let i in stack.list) {
        const o = stack.get(i);
        if (o) {
            try {
                cancelRequest(o.data);
            } catch (e) {
                // do something
            }
        }
    }
    stack.index = 0;
    stack.list = {};
}