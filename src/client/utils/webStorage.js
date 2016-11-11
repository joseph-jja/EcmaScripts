// this allows us to check to see if session storage is actually enabled by the browser
// sometimes this will fail like when a browser does not have cookies enabled for a site

import * as Store from "utils/store";

var sessionEnabled, localEnabled, sessionStore, localStore;

sessionEnabled = ( function () {
    var sEnabled = false;
    if ( window.sessionStorage ) {
        try {
            window.sessionStorage.setItem( "testData", "dunny" );
            window.sessionStorage.removeItem( "testData" );
            sEnabled = true;
        } catch ( e ) {

        }
    }
    return sEnabled;
} )();


// here we check to see if local storage is enabled or not
localEnabled = ( function () {
    var lEnabled = false;
    try {
        if ( window.localStorage ) {
            window.localStorage.setItem( "testData", "dunny" );
            window.localStorage.removeItem( "testData" );
            lEnabled = true;
        }
    } catch ( e ) {

    }
    return lEnabled;
} )();

if ( sessionEnabled ) {
    sessionStore = window.sessionStorage;
} else {
    sessionStore = new Store.Store();
}

if ( localEnabled ) {
    localStore = window.localStorage;
} else {
    localStore = new Store.Store();
}

// used for testing mainly but can be a simple key - value store
export function createKeyStore() {
    return new Store.Store();
};

export {
    sessionStore,
    sessionEnabled,
    localStore,
    localEnabled
};
