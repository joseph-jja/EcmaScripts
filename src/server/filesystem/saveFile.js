const fs = require( 'fs' ),
    path = require( 'path' ),
    util = require( 'util' ),
    baseDir = process.cwd();

const writeFile = util.promisify( fs.writeFile );

async function saveFile( filename, data, limitDir ) {

    const fullFilename = path.resolve( baseDir, filename );

    const limited = ( limitDir || baseDir );
    if ( fullFilename.indexOf( limited ) < 0 ) {
        throw 'File write failed! File is not in proper filesystem';
    }

    await writeFile( fullFilename, data );

}

module.exports = saveFile;
