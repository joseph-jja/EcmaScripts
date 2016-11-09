import dtct from "./detect";

var browser = [],
    os = [],
    uaCleaned, rules = [],
    result,
    detect = dtct();

uaCleaned = detect.userAgent.toLowerCase();
uaCleaned = uaCleaned.replace( /_/, "." );

function getVersion( map, uaString, version ) {
    var nVer = version,
        idx;
    if ( map.search !== map.version ) {
        idx = uaString.indexOf( map.version ) + map.version.length + 1;
        if ( idx != -1 ) {
            nVer = parseFloat( uaString.substr( idx ), 10 );
        }
    }
    return nVer;
};

function parse( map, cb, uaString ) {
    var name, version, search, idx = -1,
        i, ilen, uaString;

    ilen = map.length;
    for ( i = 0; i < ilen; i += 1 ) {
        search = map[ i ].search;
        if ( uaString.lastIndexOf( search ) !== -1 ) {
            name = ( !name ) ? map[ i ].name : name;
            idx = uaString.indexOf( search ) + search.length + 1;
            version = getVersion( map[ i ], uaString, parseFloat( uaString.substr( idx ), 10 ) );
            if ( cb ) {
                cb.call( detect, idx, map, name, version );
            }
            if ( version ) {
                break;
            }
        }
    }
    return {
        "name": name,
        "version": version
    };
};

// jsmeter says that arrays of objects are complex at the 'program level'
//	map of main browsers 
// jsmeter says that arrays of objects are complex at the 'program level'
//	map of main browsers 
browser = [ {
    search: "msie",
    name: "Internet Explorer",
    version: "msie"
}, {
    search: "opera mobi",
    name: "Opera Mobile",
    version: "version"
}, {
    search: "opera mini/att",
    name: "Opera Mini",
    version: "opera mini/att"
}, {
    search: "opera mini",
    name: "Opera Mini",
    version: "opera mini"
}, {
    search: "opera",
    name: "Opera",
    version: "version"
}, {
    search: "opera",
    name: "Opera Other",
    version: "opera"
}, {
    search: "netfront",
    name: "Netfront",
    version: "netfront"
}, {
    search: "fennic",
    name: "Fennic",
    version: "fennic"
}, {
    search: "firefox",
    name: "Firefox",
    version: "firefox"
}, {
    search: "konqueror",
    name: "Konqueror",
    version: "konqueror"
}, {
    search: "omniweb",
    name: "Omniweb",
    version: "omniweb"
}, {
    search: "chrome",
    name: "Chrome",
    version: "chrome"
}, {
    search: "touchpad",
    name: "Touchpad",
    version: "touchpad"
}, {
    search: "phantomjs",
    name: "PhantomJS",
    version: "phantomjs"
}, {
    search: "safari",
    name: "Safari",
    version: "version"
}, {
    search: "netscape",
    name: "Netscape",
    version: "netscape"
}, {
    search: "gecko",
    name: "Gecko",
    version: "gecko"
}, {
    search: "nook browser",
    name: "Nook Browser",
    version: "nook browser"
}, {
    search: "mozilla",
    name: "Unknown Mozilla Compatible",
    version: "mozilla"
} ];

// map of main os
os = [ {
    search: "media center pc",
    name: "Microsoft Media Center PC",
    version: "media center pc"
}, {
    search: "windows nt",
    name: "Microsoft Windows",
    version: "windows nt"
}, {
    search: "windows phone",
    name: "Microsoft Windows Phone OS",
    version: "iemobile"
}, {
    search: "windows ce",
    name: "Microsoft Windows CE",
    version: "iemobile"
}, {
    search: "windows",
    name: "Microsoft Windows",
    version: "windows"
}, {
    search: "android",
    name: "Android",
    version: "android"
}, {
    search: "ipod",
    name: "iPod",
    version: "iphone os"
}, {
    search: "iphone",
    name: "iPhone",
    version: "iphone os"
}, {
    search: "playbook",
    name: "Blackberry Playbook",
    version: "blakberry"
}, {
    search: "blackberry",
    name: "Blackberry",
    version: "blackbery"
}, {
    search: "playstation",
    name: "Playstation",
    version: "playstation"
}, {
    search: "hp-tablet",
    name: "HP Touchpad",
    version: "hp-tablet"
}, {
    search: "hpwos",
    name: "HP Touchpad",
    version: "hpwos"
}, {
    search: "nintendo wii",
    name: "Nintendo Wii",
    version: "nintendo wii"
}, {
    search: "nintendo 3ds",
    name: "Nintendo 3DS",
    version: "nintendo 3ds"
}, {
    search: "fedora",
    name: "Fedora",
    version: "fedora"
}, {
    search: "centos",
    name: "Cent OS",
    version: "centos"
}, {
    search: "ubuntu",
    name: "ubuntu",
    version: "ubuntu"
}, {
    search: "linux mint",
    name: "Linux Mint",
    version: "linux mint"
}, {
    search: "ipad",
    name: "iPad",
    version: "iphone os"
}, {
    search: "ipad",
    name: "iPad",
    version: "cpu os"
}, {
    search: "macintosh",
    name: "Macintosh",
    version: "mac os x"
}, {
    search: "cros",
    name: "Chrome OS",
    version: "cros i686"
}, {
    search: "webos",
    name: "Web OS",
    version: "webos"
}, {
    search: "symbian",
    name: "Symbian",
    version: "symbian"
}, {
    search: "sunos",
    name: "Sun OS",
    version: "sunos"
}, {
    search: "samsung",
    name: "Unknown Samsung",
    version: "samsung"
}, {
    search: "pantech",
    name: "Unknown Pantech",
    version: "pantech"
}, {
    search: "darwin",
    name: "Unknown Darwin",
    version: "darwin"
}, {
    search: "linux",
    name: "Unknown Linux",
    version: "linux"
}, {
    search: "win9",
    name: "Microsoft Windows",
    version: "win9"
} ];

rules[ "os" ] = function ( idx, map, name, version ) {

    if ( name === "Android" && detect.uaName === "Safari" ) {
        detect.uaName = "Android Web Browser";
    } else if ( ( name === "iPhone" || name === "iPad" ) && detect.uaName === "Safari" ) {
        detect.uaName = "Mobile Safari";
    } else if ( name === 'Blackbery' && detect.uaName === "Safari" ) {
        detect.uaName = "Blackberry Webkit";
    }
};

result = parse( browser, undefined, uaCleaned );
detect.uaName = result.name;
detect.uaAppVersion = result.version;

result = parse( os, rules[ "os" ], uaCleaned );
detect.uaOS = result.name;
detect.uaOSVersion = result.version;

export default detect;
