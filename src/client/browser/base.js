/**
 * this is the base object for the web brower detection
 * this is just the definition of the object itself
 */
// ie version
const nav = window.navigator;

const userAgentString = nav.userAgent;

const userAgentParts = userAgentString.replace( /\(|\)/g, '' ).split( ' ' );

const filteredUserAgent = userAgentParts.filter( agent => {
    const ua = agent.toLowerCase();
    return ( ua.indexOf( '/' ) > -1 && !ua.startsWith( 'gecko' ) &&
        !ua.startsWith( 'safari' ) &&
        !ua.startsWith( 'applewebkit' ) && !ua.startsWith( 'mozilla' ) );
} );

const filteredVersion = filteredUserAgent[ filteredUserAgent.length - 1 ];

const rawVersion = parseFloat( filteredVersion.split( '/' )[ 1 ] );

const rawBaseName = filteredVersion.split( '/' )[ 0 ];
const appName = rawBaseName.toLowerCase() === 'version' ? 'Safari' : rawBaseName;

export default {
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
    name: appName,

    // app name sent by browser - overridden by parsing user agent
    uaName: appName,

    // default OS
    OS: nav.platform,

    // os - overridden by parsing user agent
    uaOS: nav.platform,

    // user agent string
    userAgent: nav.userAgent,

    // spoofable version string
    appVersion: rawVersion,

    // spoofable version string
    uaAppVersion: rawVersion,

    // if capabilitiesDetected then we change this
    version: rawVersion,

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
