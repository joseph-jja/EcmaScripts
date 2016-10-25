var gulp = require( 'gulp' ),
    jsbeautify = require( "gulp-jsbeautifier" ),
    fs = require( "fs" ),
    babel = require( "gulp-babel" ),
    jsConfig;

jsConfig = JSON.parse( fs.readFileSync( './config/js-beautify.json' ) );

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
        .pipe( gulp.dest( 'js' ) );
} );
