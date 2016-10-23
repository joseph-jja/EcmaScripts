// this allows us to check to see if session storage is actually enabled by the browser
	// sometimes this will fail like when a browser does not have cookies enabled for a site
var	storeEnabled = (function() {
		var storeEnabled = false;
		if( window.sessionStorage ) {
			try { 
				window.sessionStorage.setItem("testData", "dunny");
				window.sessionStorage.removeItem("testData");
				storeEnabled = true;
			} catch(e) {
				WebBrowser.log("sessionStorage exists but is not available.");
			}
		}
		return storeEnabled;
	})();

	
	// here we check to see if local storage is enabled or not
var	localEnabled = (function() { 
		var localEnabled = false;
		try { 
			if ( window.localStorage ) {
				window.localStorage.setItem("testData", "dunny");
				window.localStorage.removeItem("testData");
				localEnabled = true;
			}
		} catch(e) {
			WebBrowser.log("localStorage is not available.");
		}
		return localEnabled;
	})();
