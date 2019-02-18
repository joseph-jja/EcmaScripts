const fs = require( 'fs' ),
    path = require( 'path' ),
    util = require( 'util' ),
    baseDir = process.cwd();

const readFile = util.promisify( fs.readFile );

async function viewFile( filename, limitDir ) {

    const fullFilename = path.resolve( baseDir, filename );

    const limited = ( limitDir || baseDir );
    if ( fullFilename.indexOf( limited ) < 0 ) {
        throw 'File read failed! File is not in proper filesystem';
    }

    const results = await readFile( fullFilename );
    return results; 
}

module.exports = viewFile;
