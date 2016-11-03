var gulp = require( 'gulp' ),
    jsbeautify = require( "gulp-jsbeautifier" ),
    fs = require( "fs" ),
    webpack = require( 'gulp-webpack' ),
    jsConfig,
    wpConfig = require( "./config/webpack" ),
    eslint = require( "gulp-eslint" ),
    eslintCfg;

jsConfig = JSON.parse( fs.readFileSync( './config/js-beautify.json' ) );
eslintCfg = fs.readFileSync( './config/eslint.cfg' );

gulp.task( 'default', () => {
    gulp.src( "gulpfile.js" )
        .pipe( jsbeautify( jsConfig ) )
        .pipe( gulp.dest( '.' ) );

    gulp.src( "tests/**" )
        .pipe( jsbeautify( jsConfig ) )
        .pipe( eslint( eslintCfg ) )
        .pipe( gulp.dest( 'tests' ) );

    gulp.src( "config/**" )
        .pipe( jsbeautify( jsConfig ) )
        .pipe( gulp.dest( 'config' ) );

    return gulp.src( "src/**/**.js" )
        .pipe( jsbeautify( jsConfig ) )
        .pipe( gulp.dest( 'src' ) )
        .pipe( webpack( wpConfig ) )
        .pipe( gulp.dest( 'js' ) );
} );
