 //////////////////////////////////////////////////
 // create the xml http request object
 // this works with opera, IE 6+, mozilla 1.7
 // and safari, konqueror, and gecko based browsers
 // returns xmlhttp request object
 //////////////////////////////////////////////////
 
function Request() {
     var xmlhttp = false;
     // try to use the default xml http request object first
     if ( window.XMLHttpRequest ) {
         xmlhttp = new window.XMLHttpRequest();
     } else {
         // fall back for IE here, conditional compilation for IE or later only
         /*@cc_on @*/
         /*@if (@_jscript_version >= 5)
			// JScript gives us Conditional compilation, we can cope with old IE versions.
			// and security blocked creation of the objects.
			var AJAX_ACTIVEX = ["MSXML2.XMLHTTP.6.0", "MSXML.XMLHTTP.3.0",
				"MSXML2.XMLHTTP", "Microsoft.XMLHTTP"];
			var aalen = AJAX_ACTIVEX.length;
			var i = 0;
			while ( ! xmlhttp && ( i < aalen ) ) {
				try {
					xmlhttp = new ActiveXObject(AJAX_ACTIVEX[i]);
				} catch (E) {
					xmlhttp = false;
				} 
				i += 1;
			}
			@end @*/
     }
     // last try is here
     if ( !xmlhttp && ( typeof XMLHttpRequest !== 'undefined' ) ) {
         xmlhttp = new XMLHttpRequest();
     }
	return xmlhttp;
}

// newable request object that works in most browsers
export Request;
