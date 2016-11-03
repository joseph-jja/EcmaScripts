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
import base from 'client/utils/base';

function detect() {
    
    // ie version
    var isInternetExplorer = false,
        nav,
        rawVersion, win = window,
        doc = win.document;

    nav = win.navigator;
    rawVersion = nav.appVersion; // raw app version string
    
 // in theory this should work for all versions of IE3 on up
    // start with IE as it is the easiest to detect
    // version 3 was the first version to support JScript
    /*@cc_on @*/
    /*@if (@_jscript_version >= 1.0) 
	isInternetExplorer = true;
	@end @*/

    base.isIE = isInternetExplorer;

    // because we are using detect some capabilities will be detected
    base.capabilitiesDetected = true;
    // start with IE as it is the easiest to detect
    // version 3 was the first version to support JScript
    if ( base.isIE ) {
        base.name = "Internet Explorer";
        base.hasJscript = true;

        // detect IE by JScript version
        /*@cc_on 
		@if (@_jscript_version >= 1.0) 
			base.version = 3.0;
		@end
		@if (@_jscript_version >= 3.0) 
			base.version = 4.0;
		@end
		@if (@_jscript_version >= 5.0) 
			base.version = 5.0;
		@end
		@if (@_jscript_version >= 5.1) 
			base.version = 5.1;
		@end
		@if (@_jscript_version >= 5.5) 
			base.version = 5.5;
		@end
		@if (@_jscript_version >= 5.6) 
			base.version = 6.0;
		@end
		@if (@_jscript_version >= 5.7) 
			base.version = 7.0;
		@end
		@if (@_jscript_version >= 5.8) 
			base.version = 8.0;
		@end
		@if (@_jscript_version >= 9) 
			base.version = 9.0;
		@end
		@if (@_jscript_version >= 10) 
			base.version = 10.0;
		@end @*/
        if ( win.ActiveXObject ) {
            base.hasActiveX = true;
        }
    } else if ( doc.layers ) {
        // netscape 4 is the only browser to support document.layers
        base.name = "Netscape Navigator";
        base.version = 4;
    } else if ( win.opera || doc.all ) {
        // while this is not 100% accurate it is good enough 
        // Opera 5 and later have window.opera
        // document.all is a IE4+ thing that some Opera versions support
        // we will have detected ie4 already so we wont fall into this unless this is opera
        // hopefully noone is dumb enough to add that to a browser
        // since we know this is not IE (detected earlier via JScript)
        // it must be at least opera 4
        // NOTE: support for the XMLHttpRequest was added in opera 7.6
        // but we round 7.6 = 8
        // see here http://www.opera.com/docs/history/
        base.name = "Opera";
        base.version = 4; // document.all
        if ( win.opera ) {
            base.version = 5;
            if ( ( win.print && win.opera.buildNumber ) || doc.getElementsByTagName ) {
                base.version = 6;
            }
            if ( doc.readyState ) {
                // added support for readyState in v7
                base.version = 7;
            }
            // this was introduced in opera version 8
            if ( doc.implementation && doc.implementation.createDocument ) {
                // version 8 has the createDocument not 7
                base.version = 8;
            }
            if ( doc.createEntityReference ) {
                // createEntityReference was introduced in 9, from opera's docs
                base.version = 9;
            }
            if ( doc.querySelectorAll ) {
                // this is part of the w3c selector api and 10 is where this is supposed to be supported
                base.version = 10;
            }
            if ( typeof WebSocket !== "undefined" ) {
                base.version = 11;
            }
            if ( window.document.hasOwnProperty( 'on drag' ) ) {
                base.version = 12;
            }
        }
    } else if ( doc.getElementById && doc.childNodes && !nav.taintEnabled && nav.vendor ) {

        // webkit based browsers fall here
        if ( nav.vendor === "Apple Computer, Inc." ) {
            // safari 
            // interesting thing about safari, is that versions are acutally
            // 1.0, 1.1, 1.2, and 1.3, etc, so we define minor versions
            // we also assume that mac owners update so they all should 
            // have the latest safari
            base.name = "Safari";
        } else if ( nav.vendor.toUpperCase() === "KDE" ) {
            base.name = "Konqueror";
        } else if ( win.chrome || nav.vendor.indexOf( "Google" ) !== -1 ) {
            base.name = "Chrome";
            // check out docs here 
            // http://developer.chrome.com/extensions/api_index.html
        } else {
            base.name = nav.vendor;
        }

    } else if ( nav.product ) {
        // TODO double check this
        // netscape to firefox and mozilla version mapping
        // 9.0	firefox 1.5?
        // 8.1.2
        // 8.1  - mozilla firefox 1.0.7
        // 8.0.4 -  mozilla firefox 1.0.6
        // 8.0  - mozilla firefox 1.0.3
        // 7.2 - mozilla 1.7.2
        // 7.1 - mozilla 1.4
        // 7.0 n- mozilla 1.0.1
        // 6.2
        // 6.1
        // 6.0 mozilla .9

        base.name = "Gecko";
        // if someone is spoofing the version then f-them!

        // only gecko based browsers are supposed to have this
        // spoofing this is just plain stupidity on the browser programmers part

        // we add build id in for geck rendering engines, it would be nice to be able to 
        // link back build id to actual versions
        if ( nav.buildID ) {
            base.buildID = nav.buildID;
        }
        if ( nav.product !== "Gecko" ) {
            base.name = "Gecko / " + nav.product;
        }
    }

    if ( doc.getElementById && doc.implementation ) {
        base.isDOMCapable = true;
    }

    // detect touch
    if ( doc.documentElement && ( 'ontouchstart' in doc.documentElement || 'touchstart' in doc.documentElement ) ) {
        base.touchEnabled = true;
    }   

	function getBrowserName() {
    var i = 0,
        x = [];
    
    let browsers = [ {
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
	
	base.browserName = getBrowserName();
	
	return base;
}

export {
    detect
};
