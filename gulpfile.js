var gulp = require( 'gulp' ),
    jsbeautify = require( "gulp-jsbeautifier" ),
    fs = require( "fs" ),
    webpack = require( 'gulp-webpack' ),
    babel = require( "gulp-babel" ),
    jsConfig,
    wpConfig;

jsConfig = JSON.parse( fs.readFileSync( './config/js-beautify.json' ) );
wpConfig = JSON.parse( fs.readFileSync( './config/webpack.js' ) );

gulp.task( 'default', () => {
    gulp.src( "gulpfile.js" )
        .pipe( jsbeautify( jsConfig ) )
        .pipe( gulp.dest( '.' ) );

    gulp.src( "config/**" )
        .pipe( jsbeautify( jsConfig ) )
        .pipe( gulp.dest( 'config' ) );

    return gulp.src( "src/**/**.js" )
        .pipe( jsbeautify( jsConfig ) )
        .pipe( gulp.dest( 'src' ) )
        .pipe( babel( {
            presets: [ 'es2015' ]
        } ) )
        .pipe( gulp.dest( 'work' ) )
        .pipe( webpack( wpConfig ) )
        .pipe( gulp.dest( 'js' ) );
} );
