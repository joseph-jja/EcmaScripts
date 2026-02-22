const process = require( 'process' );
const fs = require( 'node:fs/promises' );

const filename = process.argv[ 2 ];

if ( !filename ) {
    console.error( 'Need argument of filename!' );
    process.exit( -1 );
}

const run = async () => {

    const serfile = await fs.open( filename );

    const header = Buffer.alloc( 178 );
    await serfile.read( header, 0, header.length, 0 );

    const results = [];
    for ( let i = 0, len = header.length; i < len; i++ ) {
        if ( header[ i ] ) {
            results.push( String.fromCharCode( header[ i ] ) );
        }
    }
    console.log( results.join( '' ).trim() );

    await serfile.close();
};
run();
