/**
 * this is the base object for the web brower detection
 * this is just the definition of the object itself
 */
// ie version
var isInternetExplorer = false,
    nav,
    self, rawVersion;

nav = window.navigator;
rawVersion = nav.appVersion; // raw app version string

var self = {
    // capabilities detected means we have detected the browser
    // based on certain uniquiness in the browser version like window.opera 
    capabilitiesDetected: false,

    // supports jscript and activeX 
    hasJscript: false,
    hasActiveX: false,

    // DOM capable means the browser has passed certain DOM tests
    isDOMCapable: false,

    // ajax enabled
    isAJAXCapable: false,

    // cookie check 
    hasCookiesEnabled: nav.cookieEnabled,

    // default name 
    name: nav.appName,

    // app name sent by browser - overridden by parsing user agent
    uaName: nav.appName,

    // default OS
    OS: nav.platform,

    // os - overridden by parsing user agent
    uaOS: nav.platform,

    // user agent string
    userAgent: nav.userAgent,

    // spoofable version string
    appVersion: parseFloat( rawVersion, 10 ),

    // spoofable version string
    uaAppVersion: parseFloat( rawVersion, 10 ),

    // if capabilitiesDetected then we change this
    version: parseFloat( rawVersion, 10 ),

    uaOSVersion: '',

    // setup an onload event stack to properly handle onload events
    onLoadEventStack: [],

    // setup an on dom content loaded event stack to properly handle onload events
    onDOMReadyEventStack: [],

    touchEnabled: false,

    // this allows us to dynamically ad functionality on our load event
    // because of IE we do this
    includeStack: [],
    scriptLoadStack: [],
    scriptLocation: ""
};

export default self;
