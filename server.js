const http = require( 'http' ),
    fs = require( 'fs' ),
    childProcess = require( 'child_process' ),
    baseDir = process.cwd();

const intialFile = `${baseDir}/coverage/report-html/index.html`;

const server = http.createServer( ( request, response ) => {

    let start = ( request.url === '/' ? intialFile : `${baseDir}/coverage/report-html${request.url}` );

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
