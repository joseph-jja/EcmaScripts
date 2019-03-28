const gulp = require( 'gulp' ),
    jsbeautify = require( "gulp-jsbeautifier" ),
    fs = require( "fs" ),
    path = require( 'path' ),
    os = require( 'os' ),
    eslint = require( "gulp-eslint" );

const baseDir = process.cwd(),
    jsConfig = JSON.parse( fs.readFileSync( `${baseDir}/config/js-beautify.json` ).toString() ),
    eslintConfig = fs.readFileSync( `${baseDir}/config/eslint.json` ).toString();

const eslintCfg = JSON.parse( eslintConfig ),
    esJSONWP = Object.keys( eslintCfg.globals );

eslintCfg.globals = esJSONWP;

const babelJSON = JSON.parse( fs.readFileSync( `${baseDir}/config/babel-config.json` ).toString() );
fs.writeFileSync( `${baseDir}/.babelrc`, JSON.stringify( babelJSON ) + os.EOL );

gulp.task( 'default', () => {
    gulp.src( "gulpfile.js" )
        .pipe( jsbeautify( jsConfig ) )
        .pipe( eslint( eslintCfg ) )
        .pipe( gulp.dest( '.' ) );

    gulp.src( "server.js" )
        .pipe( jsbeautify( jsConfig ) )
        .pipe( eslint( eslintCfg ) )
        .pipe( gulp.dest( '.' ) );

    gulp.src( "tests/**" )
        .pipe( jsbeautify( jsConfig ) )
        .pipe( eslint( eslintCfg ) )
        .pipe( gulp.dest( 'tests' ) );

    gulp.src( "tools/**.js*" )
        .pipe( jsbeautify( jsConfig ) )
        .pipe( eslint( eslintCfg ) )
        .pipe( gulp.dest( 'tools' ) );

    gulp.src( "config/**.js*" )
        .pipe( jsbeautify( jsConfig ) )
        .pipe( eslint( eslintCfg ) )
        .pipe( gulp.dest( 'config' ) );

    return gulp.src( "src/**/**.js" )
        .pipe( jsbeautify( jsConfig ) )
        .pipe( eslint( eslintCfg ) )
        .pipe( gulp.dest( 'src' ) );
} );
