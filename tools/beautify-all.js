const baseDir = process.cwd(),
    fs = require( 'fs' ),
    {
        promisify
    } = require( 'util' ),
    beautify = require( 'js-beautify' ).js;

const readdir = promisify( fs.readdir ),
    readfile = promisify( fs.readFile ),
    writefile = promisify( fs.writeFile ),
    stats = promisify( fs.stat );

const beautifyJSON = JSON.parse( fs.readFileSync( `${baseDir}/config/js-beautify.json` ).toString() );

async function basefiles() {

    const files = Array.from( await readdir( baseDir ) ).filter( file => {
        return ( file.substring( file.length - 3 ) === '.js' );
    } ).forEach( async ( file ) => {
        const realfile = `${baseDir}/${file}`;
        const data = await readfile( realfile );
        const result = beautify( data.toString(), beautifyJSON );
        await writefile( realfile, result.toString() );
    } );

    return files;
}

async function walkDir( dir ) {

    Array.from( await readdir( dir ) ).map( file => {
        return `${dir}/${file}`;
    } ).forEach( async ( file ) => {
        const isDir = await stats( file );
        if ( isDir.isFile() ) {
            const isJsFile = ( file.substring( file.length - 3 ) === '.js' ||
                file.substring( file.length - 5 ) === '.json' );
            if ( isJsFile ) {
                const data = await readfile( file );
                const result = beautify( data.toString(), beautifyJSON );
                await writefile( file, result.toString() );
            }
        } else {
            walkDir( file );
        }
    } );
}

basefiles();
walkDir( `${baseDir}/tests` );
walkDir( `${baseDir}/tools` );
walkDir( `${baseDir}/src` );
walkDir( `${baseDir}/config` );
