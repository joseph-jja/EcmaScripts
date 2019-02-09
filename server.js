const http = require( 'http' ),
    util = require( 'util' ),
    fs = require( 'fs' ),
    os = require( 'os' ),
    childProcess = require( 'child_process' ),
    baseDir = process.cwd();

const statfile = util.promisify( fs.stat ),
    readfile = util.promisify( fs.readFile );
readdir = util.promisify( fs.readdir );

const intialFile = `${baseDir}/coverage/report-html/index.html`;

async function listDir( dir, response ) {
    const isDir = await statfile( dir );
    let results;
    if ( isDir.isDirectory() ) {
        const files = await readdir( dir );
        results = files.reduce( ( acc, item ) => {
            return `${acc}${os.EOL}<br>${item}`;
        } );
    } else {
        results = await readfile( dir );

    }
    response.writeHead( 200, {
        'Content-Typei': 'text/html'
    } );
    response.end( `<html><body>${results}</body></html>` );
}

const server = http.createServer( ( request, response ) => {

    let start = intialFile;
    if ( request.url !== '/' && !request.url.startsWith( '/js' ) ) {
        start = `${baseDir}/coverage/report-html${request.url}`;
    } else if ( request.url.startsWith( '/js' ) ) {
        listDir( `${baseDir}/${request.url}`, response );
        return;
    }

    let coverage = fs.createReadStream( start );
    coverage.on( 'error', ( err ) => {
        console.log( err );
    } ).pipe( response );
} );

const ipaddr = childProcess.execSync( 'ifconfig | grep inet | grep Bcast' ).toString();

const filtered = ipaddr.split( ' ' ).filter( item => {
    return ( item.trim().length > 0 );
} ).filter( item => {
    return ( item.indexOf( 'addr' ) > -1 );
} ).map( item => item.replace( /addr\:/, '' ) );

const port = 20000;
console.log( filtered );

server.listen( port );

console.log( `Server listening on port ${port} and IP ${filtered[0]}.` );
