// this allows us to check to see if session storage is actually enabled by the browser
// sometimes this will fail like when a browser does not have cookies enabled for a site

import * as Store from "/js/utils/store";

const sessionEnabled = ( function () {
    let sEnabled = false;
    if ( window.sessionStorage ) {
        try {
            window.sessionStorage.setItem( "testData", "dunny" );
            window.sessionStorage.removeItem( "testData" );
            sEnabled = true;
        } catch ( _e ) {
            // ignore
        }
    }
    return sEnabled;
} )();


// here we check to see if local storage is enabled or not
const localEnabled = ( function () {
    let lEnabled = false;
    try {
        if ( window.localStorage ) {
            window.localStorage.setItem( "testData", "dunny" );
            window.localStorage.removeItem( "testData" );
            lEnabled = true;
        }
    } catch ( _e ) {
        // ignore
    }
    return lEnabled;
} )();

const sessionStore = ( sessionEnabled ? window.sessionStorage : new Store.Store() );

const localStore = ( localEnabled ? window.localStorage : new Store.Store() );

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
