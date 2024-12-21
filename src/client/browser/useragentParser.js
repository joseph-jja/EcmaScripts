import browserList from '/js/client/browser/browserList';
import osList from '/js/client/browser/osList';

const detect = {};

const uaCleaned = navigator.userAgent.toLowerCase().replace( /_/, '.' );

function ruleHandler( idx, map, name ) {

    if ( name === 'Android' && detect.uaName === 'Safari' ) {
        detect.uaName = 'Android Web Browser';
    } else if ( ( name === 'iPhone' || name === 'iPad' ) && detect.uaName === 'Safari' ) {
        detect.uaName = 'Mobile Safari';
    } else if ( name === 'Blackbery' && detect.uaName === 'Safari' ) {
        detect.uaName = 'Blackberry Webkit';
    }
};

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
    let name, version;

    for ( let i = 0, end = map.length; i < end; i += 1 ) {
        const search = map[ i ].search;
        if ( uaString.lastIndexOf( search ) !== -1 ) {
            name = ( !name ) ? map[ i ].name : name;
            const idx = uaString.indexOf( search ) + search.length + 1;
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
        'name': name,
        'version': version
    };
};

const browserResult = parse( browserList, undefined, uaCleaned );
detect.uaName = browserResult.name;
detect.uaAppVersion = browserResult.version;

const osResult = parse( osList, ruleHandler, uaCleaned );
detect.uaOS = osResult.name;
detect.uaOSVersion = osResult.version;

if ( navigator.userAgentData && navigator.userAgentData.platform ) {
    detect.uaOS = navigator.userAgentData.platform;
} else if ( navigator.vendor ) {
    const uaOSPart = navigator.userAgent.split( 'AppleWebKit' )[ 0 ];
    detect.uaOS = uaOSPart.split( '(' )[ 1 ].replace( ')', '' ).trim();
}

export default detect;
