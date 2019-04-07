const {
    execSync
} = require( 'child_process' ),
    path = require( 'path' );

if ( typeof process.env.BINARY_STELLAR_SYSTEM_HOME === 'undefined' ) { 
    console.error('please set BINARY_STELLAR_SYSTEM_HOME first');
    process.exit(-1);
}

const baseDir = process.cwd(),
    listDirectory = require( `${baseDir}/src/server/filesystem/listDirectory` );

const jsbeautify = path.resolve( baseDir, './node_modules/.bin/js-beautify' ),
    javabin = process.env.JAVA_EXECUTABLE,
    compressor = path.resolve( baseDir, './tools/yuicompressor-2.4.6.jar' ),
    outputProject = path.resolve( process.env.BINARY_STELLAR_SYSTEM_HOME, 'styles' );

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
            const name = parts[ parts.length - 1 ].replace( /\.css/, '-min.css' );
            console.log( name );

            const bres = execSync( `${jsbeautify} -r ${item}` );
            console.log( bres.toString() );

            const cres = execSync( `${javabin} -jar ${compressor} ${item} > ${outputProject}/${name}` );
            console.log( cres.toString() );
        } );
}

compressStyles();
