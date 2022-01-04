import dtct from "client/browser/detect";
import browserList from "client/browser/browserList";
import osList from "client/browser/osList";

const browser = browserList,
    os = osList;

let uaCleaned, rules = [],
    result,
    detect = dtct();

uaCleaned = detect.userAgent.toLowerCase();
uaCleaned = uaCleaned.replace( /_/, "." );

function getVersion( map, uaString, version ) {
    let nVer = version,
        idx;
    if ( map.search !== map.version ) {
        idx = uaString.indexOf( map.version ) + map.version.length + 1;
        if ( idx !== -1 ) {
            nVer = parseFloat( uaString.substr( idx ), 10 );
        }
    }
    return nVer;
};

function parse( map, cb, uaString ) {
    let name, version, search, idx = -1,
        i, ilen;

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
