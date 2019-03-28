const {
    execSync
} = require( 'child_process' ),
    path = require( 'path' );

const baseDir = process.cwd(),
    listDirectory = require( `${baseDir}/src/server/filesystem/listDirectory` );

const jsbeautify = path.resolve( baseDir, './node_modules/.bin/js-beautify' ),
    javabin = '/usr/bin/java',
    compressor = path.resolve( baseDir, './tools/yuicompressor-2.4.6.jar' );

async function compressStyles() {

    const styleFiles = await listDirectory( 'styles' );

    const results = styleFiles.filter( item => {
            return item.isFile
        } )
        .map( item => {
            return item.name;
        } )
        .forEach( item => {
            const parts = item.split( '/' );
            const name = parts[ parts.length - 1 ];
            console.log( name );

            execSync( `${jsbeautify} -r ${item}` );
            //exec(java ~/workspace/binary-stellar-system.github.io/styles)
        } );
}

compressStyles();
