// this allows us to check to see if session storage is actually enabled by the browser
// sometimes this will fail like when a browser does not have cookies enabled for a site
var storeEnabled, localEnabled, sessionStore, localStore;

storeEnabled = (function () {
    var sEnabled = false;
    if (window.sessionStorage) {
        try {
            window.sessionStorage.setItem("testData", "dunny");
            window.sessionStorage.removeItem("testData");
            sEnabled = true;
        } catch (e) {

        }
    }
    return sEnabled;
})();


// here we check to see if local storage is enabled or not
localEnabled = (function () {
    var lEnabled = false;
    try {
        if (window.localStorage) {
            window.localStorage.setItem("testData", "dunny");
            window.localStorage.removeItem("testData");
            lEnabled = true;
        }
    } catch (e) {

    }
    return localEnabled;
})();

import * as store from "../../utils/store";

if (storeEnabled) {
    sessionStore = window.sessionStorage;
} else {
    sessionStore = new store();
}

if (localEnabled) {
    localStore = window.localStorage;
} else {
    localStore = new store();
}

// used for testing mainly but can be a simple key - value store
export function createKeyStore() {
    return new store();
};

export {
    sessionStore,
    sessionEnabled,
    localStore,
    localEnabled
};
