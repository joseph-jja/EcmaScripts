const http = require( 'http' ),
    https = require( 'https' ),
    util = require( 'util' ),
    fs = require( 'fs' ),
    path = require( 'path' ),
    os = require( 'os' ),
    childProcess = require( 'child_process' ),
    baseDir = process.cwd(),
    listDirectory = require( `${baseDir}/src/server/filesystem/listDirectory` ),
    viewFile = require( `${baseDir}/src/server/filesystem/viewFile` ),
    saveFile = require( `${baseDir}/src/server/filesystem/saveFile` ),
    {
        parseUrl
    } = require( `${baseDir}/src/server/utils/url` );

const enableHTTPS = false;

const protocol = ( enableHTTPS ? 'https://' : 'http://' );

let hostIP,
    runDir = baseDir,
    port = 20000;

const RUN_DIR = '--rundir=',
    PORT = '--PORT=';
for ( let i = 2, end = process.argv.length; i < end; i++ ) {
    if ( process.argv[ i ].indexOf( RUN_DIR ) > -1 ) {
        const idx = process.argv[ i ].indexOf( RUN_DIR ) + RUN_DIR.length;
        runDir = path.resolve( process.argv[ i ].substring( idx ) );
    } else if ( process.argv[ i ].indexOf( PORT ) > -1 ) {
        const idx = process.argv[ i ].indexOf( PORT ) + PORT.length;
        port = process.argv[ i ].substring( idx );
    }
}

const statfile = util.promisify( fs.stat );

const intialFile = `${baseDir}/coverage/report-html/index.html`;

const parentDir = {
    name: runDir,
    isFile: false
};

async function listDir( dir, response, referer = '' ) {

    const fullpath = path.resolve( runDir, dir );
    const isDir = await statfile( fullpath );

    const isEditor = ( referer.indexOf( 'views/web-editor.html' ) > -1 );

    if ( isDir.isDirectory() ) {
        const pdir = path.resolve( fullpath, '..' );
        const parentDir = {
            name: runDir,
            isFile: false
        };
        if ( pdir.indexOf( runDir ) >= 0 ) {
            if ( pdir === runDir ) {
                parentDir.name = '..';
            } else {
                parentDir.name = pdir;
            }
        }

        const files = ( pdir.indexOf( runDir ) >= 0 ? [ parentDir ] : [] )
            .concat( await listDirectory( fullpath ) );

        const results = files.filter( item => {
            return ( item.name.indexOf( 'node_modules' ) === -1 );
        } ).map( item => {
            const fname = item.name.replace( runDir, '' ).replace( /^\//, '' );
            let url;
            if ( isEditor ) {
                if ( item.isFile ) {
                    url = `<li class="file_type">${fname}</li>`;
                } else {
                    url = `<li class="dir_type">${fname}</li>`;
                }
            } else {
                url = `<a href="${fname}">${fname}</a><br>`;
            }
            return url;
        } ).reduce( ( acc, item ) => {
            return `${acc}${os.EOL}${item}`;
        } );

        response.writeHead( 200, {
            'Content-Type': ( isEditor ? 'text/plain' : 'text/html' )
        } );
        response.end( results );
    } else {
        let ltype = 'text/html';
        const results = await viewFile( fullpath, runDir );
        if ( fullpath.substring( fullpath.length - 4 ) === '.css' ) {
            ltype = 'text/css';
        } else if ( fullpath.substring( fullpath.length - 3 ) === '.js' ) {
            ltype = 'text/css';
        } else if ( fullpath.substring( fullpath.length - 4 ) === '.jpg' ) {
            ltype = 'image/jpg';
        } else if ( fullpath.substring( fullpath.length - 5 ) === '.mpeg' ) {
            ltype = 'video/mpeg';
        }

        response.writeHead( 200, {
            'Content-Type': ltype
        } );
        response.end( results );
    }
}

let options = {};
if ( enableHTTPS ) {
    options.key = fs.readFileSync( 'ssl-keys/domain.keys' );
    options.cert = fs.readFileSync( 'ssl-keys/domain.crt' );
}

const httpOrhttps = ( enableHTTPS ? https : http );

const server = httpOrhttps.createServer( options, ( request, response ) => {

    const parsedUrl = parseUrl( request.url ),
        referer = request.headers[ 'referer' ];

    const urlPath = parsedUrl.pathname,
        searchParams = parsedUrl.searchParams;

    // save existing file
    if ( searchParams && searchParams.saveFile ) {
        const fullpath = path.resolve( runDir, searchParams.saveFile );
        statfile( fullpath )
            .then( stats => {
                let res = [];
                request.on( 'data', ( d, err ) => {
                    if ( !err ) {
                        res.push( d );
                    }
                } );
                request.on( 'end', () => {
                    const filedata = JSON.parse( Buffer.concat( res ).toString() ).data;
                    saveFile( fullpath, filedata )
                        .then( () => {
                            console.log( `File saved ${searchParams.saveFile}` );
                            response.setHeader( 'Connection', 'Close' );
                            response.writeHead( 200, {
                                'Content-Type': 'text/html'
                            } );
                            response.end( fullpath );
                        } );
                } );
            } );
        return;
    }

    if ( urlPath === intialFile ) {
        viewFile( `${baseDir}/views/web-editor.html`, baseDir )
            .then( templatefile => {
                const filedata = templatefile.toString();

                response.writeHead( 200, {
                    'Content-Type': 'text/html'
                } );
                response.end( filedata );
            } );
        return;
    } else if ( urlPath === '/favicon.ico' || urlPath.indexOf( '/node_modules' ) > -1 ) {
        response.writeHead( 404, {
            'Content-Type': 'text/html'
        } );
        response.end();
        return;
    }

    listDir( `${runDir}/${urlPath}`, response, referer );
} );

try {
    const ipaddr = childProcess.execSync( '/sbin/ifconfig | grep inet ' ).toString();
    const rex = /[\d]*\.[\d]*\.[\d]*\.[\d]*/;

    const filtered = ipaddr.split( ' ' ).filter( item => {
        return ( item.match( rex ) && item.trim() !== '127.0.0.1' );
    } ).filter( item => {
        return ( item.indexOf( '255' ) < 0 );
    } ).map( item => item.trim() );

    // we will force IPV4 by passing an IPV4 address, or fail
    if ( os.platform() === 'android' ) {
        server.listen( port );
    } else if ( os.platform() === 'darwin' ) {
        //console.log( os.platform() === 'darwin' )
        hostIP = '127.0.0.1';
        server.listen( port, hostIP );
    } else {
        hostIP = filtered[ 0 ];
        server.listen( port, hostIP );
    }
    console.log( `Server listening on port ${port} and IP ${hostIP || filtered[0]}.` );

} catch ( e ) {
    console.log( e );
}
