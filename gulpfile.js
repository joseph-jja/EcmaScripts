const gulp = require( 'gulp' ),
    jsbeautify = require( "gulp-jsbeautifier" ),
    fs = require( "fs" ),
    path = require( 'path' ),
    eslint = require( "gulp-eslint" );

const baseDir = process.cwd(),
    jsConfig = JSON.parse( fs.readFileSync( `${baseDir}/config/js-beautify.json` ).toString() ),
    eslintConfig = fs.readFileSync( `${baseDir}/config/eslint.json` ).toString();

const eslintCfg = JSON.parse( eslintConfig ),
    esJSONWP = Object.keys( eslintCfg.globals );

eslintCfg.globals = esJSONWP;

const babelJSON = JSON.parse( fs.readFileSync( `${baseDir}/config/babel-config.json` ).toString() );
fs.writeFileSync( `${baseDir}/.babelrc`, JSON.stringify( babelJSON ) );

gulp.task( 'default', () => {
    gulp.src( "gulpfile.js" )
        .pipe( jsbeautify( jsConfig ) )
        .pipe( gulp.dest( '.' ) );

    gulp.src( "server.js" )
        .pipe( jsbeautify( jsConfig ) )
        .pipe( gulp.dest( '.' ) );

    gulp.src( "tests/**" )
        .pipe( jsbeautify( jsConfig ) )
        .pipe( eslint( eslintCfg ) )
        .pipe( gulp.dest( 'tests' ) );

    gulp.src( "config/**.js*" )
        .pipe( jsbeautify( jsConfig ) )
        .pipe( gulp.dest( 'config' ) );

    return gulp.src( "src/**/**.js" )
        .pipe( jsbeautify( jsConfig ) )
        .pipe( gulp.dest( 'src' ) );
} );
