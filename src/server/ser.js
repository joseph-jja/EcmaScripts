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

    for ( let i = 0, len = header.length; i < len; i++ ) {
        result += String.fromCharCode( header[ i ] );
    }
    //console.log(header.toString('utf-8').trim());

    await serfile.close();
};
run();
