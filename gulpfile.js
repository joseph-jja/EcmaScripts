const gulp = require( 'gulp' ),
    jsbeautify = require( "gulp-jsbeautifier" ),
    fs = require( "fs" ),
    path = require( 'path' ),
    webpack = require( 'gulp-webpack' ),
    wpConfig = require( "./config/webpack" ),
    eslint = require( "gulp-eslint" );

const baseDir = process.cwd(),
    jsConfig = JSON.parse( fs.readFileSync( `${baseDir}/config/js-beautify.json` ).toString() ),
    eslintCfg = `${baseDir}/config/eslint.cfg`;

const webpackConfig = Object.assign( {}, wpConfig, {
    "eslint": {
        "configFile": path.resolve( "./config/eslint.cfg" )
    }
} );

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
        .pipe( eslint( eslintCfg ) )
        .pipe( gulp.dest( 'src' ) )
        .pipe( webpack( webpackConfig ) )
        .pipe( gulp.dest( 'js' ) );
} );
