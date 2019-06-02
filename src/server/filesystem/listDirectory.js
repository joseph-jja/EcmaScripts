const util = require( 'util' ),
    fs = require( 'fs' ),
    path = require( 'path' ),
    baseDir = process.cwd();

const statfile = util.promisify( fs.stat ),
    readdir = util.promisify( fs.readdir );

async function listDirectory( dir, limit ) {

    const realDir = ( dir.indexOf( baseDir ) < 0 ? path.resolve( baseDir, dir ) : dir );

    if ( limit && realDir.indexOf( baseDir ) < 0 ) {
        return [];
    }

    // run fs.stat on it 
    const stats = await statfile( realDir );
    let results = [];
    if ( stats.isDirectory() ) {
        // list files in the directory
        const files = await readdir( dir );
        for ( let i = 0, end = files.length; i < end; i++ ) {
            const filename = path.resolve( realDir, files[ i ] );
            const type = await statfile( filename );
            results.push( {
                name: filename,
                isFile: type.isFile()
            } );
        }

    }
    return results;
}

module.exports = listDirectory;
