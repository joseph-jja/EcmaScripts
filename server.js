const http = require( 'http' ),
    fs = require( 'fs' ),
    baseDir = process.cwd();

const intialFile = `${baseDir}/coverage/report-html/index.html`;

const server = http.createServer( ( request, response ) => {

    let start = ( request.url === '/' ? intialFile : `${baseDir}/coverage/report-html${request.url}` );
    let coverage = fs.createReadStream( start );
    coverage.pipe( response );
} );

server.listen( 20000 );
