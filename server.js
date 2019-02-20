const http = require( 'http' ),
    util = require( 'util' ),
    fs = require( 'fs' ),
    path = require( 'path' ),
    os = require( 'os' ),
    url = require( 'url' ),
    childProcess = require( 'child_process' ),
    baseDir = process.cwd(),
    listDirectory = require( `${baseDir}/src/server/filesystem/listDirectory` ),
    viewFile = require( `${baseDir}/src/server/filesystem/viewFile` );

const port = 20000,
    protocol = 'http://';

let hostIP;

const statfile = util.promisify( fs.stat );

const intialFile = `${baseDir}/coverage/report-html/index.html`;

const parentDir = [ {
    name: '..',
    isFile: false
} ];

async function listDir( dir, response ) {

    const fullpath = path.resolve( baseDir, dir );
    const isDir = await statfile( fullpath );

    if ( isDir.isDirectory() ) {
        const files = ( fullpath === baseDir ? [] : parentDir )
            .concat( await listDirectory( fullpath ) );

        const results = files.filter( item => {
            return ( item.name.indexOf( 'node_modules' ) === -1 );
        } ).map( item => {
            const fname = item.name.replace( baseDir, '' );
            let url;
            if ( item.isFile ) {
                url = `<li class="file_type">${fname.replace( /^\//, '' )}</li>`;
            } else {
                url = `<li class="dir_type">${fname.replace( /^\//, '' )}</li>`;
            }
            return url;
        } ).reduce( ( acc, item ) => {
            return `${acc}${os.EOL}${item}`;
        } );

        response.writeHead( 200, {
            'Content-Type': 'text/plain'
        } );
        response.end( results );
    } else {
        let ltype = 'text/html';
        const results = await viewFile( fullpath, baseDir );
        if ( fullpath.substring( fullpath.length - 4 ) === '.css' ) {
            ltype = 'text/css';
        } else if ( fullpath.substring( fullpath.length - 3 ) === '.js' ) {
            ltype = 'text/css';
        }

        response.writeHead( 200, {
            'Content-Type': ltype
        } );
        response.end( results );
    }
}

const server = http.createServer( ( request, response ) => {

    const parsedUrl = new url.URL( request.url, `${protocol}${hostIP}:${port}` );
    const urlPath = parsedUrl.pathname,
        searchParams = parsedUrl.searchParams;

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

    if ( searchParams && searchParams.saveFile ) {

    }

    listDir( `${baseDir}/${urlPath}`, response );
} );

try {
    const ipaddr = childProcess.execSync( 'ifconfig | grep inet ' ).toString();
    const rex = /[\d]*\.[\d]*\.[\d]*\.[\d]*/;

    const filtered = ipaddr.split( ' ' ).filter( item => {
        return ( item.match( rex ) && item.trim() !== '127.0.0.1' );
    } ).filter( item => {
        return ( item.indexOf( '255' ) < 0 );
    } ).map( item => item.trim() );

    // we will force IPV4 by passing an IPV4 address, or fail
    hostIP = filtered[ 0 ];
    if ( os.platform() === 'android' ) {
        server.listen( port );
    } else {
        server.listen( port, hostIP );
    } else {
    console.log( `Server listening on port ${port} and IP ${filtered[0]}.` );

} catch ( e ) {
    console.log( e );
}
