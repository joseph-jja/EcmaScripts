const http = require( 'http' ),
    util = require( 'util' ),
    fs = require( 'fs' ),
    path = require( 'path' ),
    os = require( 'os' ),
    childProcess = require( 'child_process' ),
    baseDir = process.cwd(),
    listDirectory = require( `${baseDir}/src/server/filesystem/listDirectory` ),
    viewFile = require( `${baseDir}/src/server/filesystem/viewFile` );

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

    if ( request.url === intialFile ) {
        viewFile( `${baseDir}/views/web-editor.html`, baseDir )
            .then( templatefile => {
                const filedata = templatefile.toString();

                response.writeHead( 200, {
                    'Content-Type': 'text/html'
                } );
                response.end( filedata );
            } );
    } else if ( request.url === '/favicon.ico' || request.url.indexOf( '/node_modules' ) > -1 ) {
        response.writeHead( 404, {
            'Content-Type': 'text/html'
        } );
        response.end();
        return;
    }

    listDir( `${baseDir}/${request.url}`, response );

} );

const port = 20000;
server.listen( port );
try {
    const ipaddr = childProcess.execSync( 'ifconfig | grep inet | grep Bcast' ).toString();

    const filtered = ipaddr.split( ' ' ).filter( item => {
        return ( item.trim().length > 0 );
    } ).filter( item => {
        return ( item.indexOf( 'addr' ) > -1 );
    } ).map( item => item.replace( /addr\:/, '' ) );

    console.log( filtered );
    console.log( `Server listening on port ${port} and IP ${filtered[0]}.` );
} catch ( e ) {
    console.log( `Server listening on port ${port}.` );
}
