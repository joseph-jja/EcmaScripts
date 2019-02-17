const http = require( 'http' ),
    util = require( 'util' ),
    fs = require( 'fs' ),
    os = require( 'os' ),
    childProcess = require( 'child_process' ),
    baseDir = process.cwd(),
    {
        listDirectory
    } = require( `${baseDir}/src/server/filesystem/listDirectory` );

const statfile = util.promisify( fs.stat ),
    readfile = util.promisify( fs.readFile ),
    readdir = util.promisify( fs.readdir );

const intialFile = `${baseDir}/coverage/report-html/index.html`;

async function listDir( dir, response, type ) {
    const isDir = await statfile( dir );
    let results;
    if ( isDir.isDirectory() ) {
        const files = await listDirectory( dir );
        results = files.map( item => {
            return item.name.replace(baseDir, '');
        } ).reduce( ( acc, item ) => {
            return `${acc}${os.EOL}<br>${item}`;
        } );
    } else {
        results = await readfile( dir );

    }
    response.writeHead( 200, {
        'Content-Typei': type
    } );
    if ( type === 'text/html' ) {
        response.end( `<html><body>${results}</body></html>` );
    } else {
        response.end( results );
    }
}

const server = http.createServer( ( request, response ) => {

    let start = intialFile;
    if ( request.url !== '/' && !request.url.startsWith( '/js' ) ) {
        start = `${baseDir}/coverage/report-html${request.url}`;
    } else if ( request.url.startsWith( '/js' ) ) {
        const type = ( request.url.endsWith( 'html' ) ? 'text/html' : 'text/javascript' );
        listDir( `${baseDir}/${request.url}`, response, type );
        return;
    }

    let coverage = fs.createReadStream( start );
    coverage.on( 'error', ( err ) => {
        console.log( err );
    } ).pipe( response );
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
