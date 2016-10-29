//basic user agent object
//may crash browers that have problems with objects, like real early browsers
//but if you are using a browser that old, then you need to upgrade anyway

//the difference between this UA sniffer and others is that this one
//tries to look for browser markers instead of parsing useragent strings
//each browser supports its own set of the standard
//by knowing what parts of the standard and what additions each browser 
//has, we can imore accurately detect which browser is running and what 
//version

//So far supported browser detection:
//- IE 4 to 10 and maybe 3, not sure if IE 3 supports script tag src=".xxx.js"
//- Netscape 4.x support is okay, maybe even 3 or 2, I think 2 supported src="xxx.js"
//- Opera 4 - document.all and hope we are not IE, NOT TESTED
//- Opera 5 to 9 - needs more testing, but based on capabilities
//- Gecko - (Netscape 6+,Firefox/Mozilla) version is always 5
//- some support for detecting konqueror and safari, but not versions

//will fall back on useragent string 

//JS version and support
//JavaScript 1.0 	Navigator 2.0 - did not understand src= I think
//JavaScript 1.1 		Navigator 3.0
//JavaScript 1.2 	Navigator 4.0-4.05
//JavaScript 1.3 	Navigator 4.06-4.7x
//JavaScript 1.4 	 
//JavaScript 1.5 	Navigator 6.0
//Mozilla (open source browser)
//JavaScript 1.6 	Firefox 1.5, other Mozilla 1.8-based products
//JavaScript 1.7 	Firefox 2, other Mozilla 1.8.1-based products

//this info was found on MSN
//IE3     JS 1.0 -> did not understand active x, may understand src=?
//IE4     JS 3.0
//IE5     JS 5.0
//IE5.1   JS 5.1 
//IE5.5   JS 5.5 
//IE6     JS 5.6
//IE7 	   JS 5.6/5.7 and XMLHttpRequest though
//IE8 	   JS 5.8 

function detect() {

    var i = 0,
        x = [];
    browsers = [ {
        bProp: window.chrome,
        name: 'chrome'
    }, {
        bProp: window.safari,
        name: 'safari'
    }, {
        bProp: window.opera,
        name: 'opera'
    }, {
        bProp: window.mozInnerScreenX,
        name: 'firefox'
    }, {
        bProp: document.all,
        name: 'ie'
    } ];

    function check( x ) {
        return typeof x.bProp !== 'undefined';
    }

    while ( browsers[ i ] ) {
        if ( check( browsers[ i ] ) ) {
            break;
        }
        i++;
    }
    return browsers[ i ].name;
}

export { detect };
