var gulp = require( 'gulp' ),
    jsbeautify = require( "gulp-jsbeautifier" ),
    fs = require( "fs" ),
    webpack = require( 'gulp-webpack' ),
    babel = require( "gulp-babel" ),
    jsConfig,
    wpConfig;

jsConfig = JSON.parse( fs.readFileSync( './config/js-beautify.json' ) );
wpConfig = JSON.parse( fs.readFileSync( './config/webpack.js' ) );

// todo implement a testing thing
// jasmine + karma
gulp.task( 'tests', () => {

    return;
} );

gulp.task( 'default', () => {
    gulp.src( "gulpfile.js" )
        .pipe( jsbeautify( jsConfig ) )
        .pipe( gulp.dest( '.' ) );

    gulp.src( "src/**/**.js" )
        .pipe( jsbeautify( jsConfig ) )
        .pipe( gulp.dest( 'src' ) )
        .pipe( babel( {
            presets: [ 'es2015' ]
        } ) )
        .pipe( gulp.dest( 'work' ) )
        .pipe( webpack( wpConfig ) )
        .pipe( gulp.dest( 'js' ) );
} );
