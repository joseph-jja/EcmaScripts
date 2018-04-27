const gulp = require('gulp'),
    jsbeautify = require("gulp-jsbeautifier"),
    fs = require("fs"),
    webpack = require('gulp-webpack'),
    wpConfig = require("./config/webpack"),
    eslint = require("gulp-eslint");

const baseDir = process.cwd(),
    jsConfig = fs.readFileSync(`${baseDir}/config/js-beautify.json`),
    eslintCfg = fs.readFileSync(`${baseDir}/config/eslint.cfg`);

gulp.task('default', () => {
    return gulp.src("gulpfile.js")
        .pipe(jsbeautify(jsConfig))
        .pipe(gulp.dest('.'));

    gulp.src("server.js")
        .pipe(jsbeautify(jsConfig))
        .pipe(gulp.dest('.'));

    gulp.src("tests/**")
        .pipe(jsbeautify(jsConfig))
        .pipe(eslint(eslintCfg))
        .pipe(gulp.dest('tests'));

    gulp.src("config/**")
        .pipe(jsbeautify(jsConfig))
        .pipe(gulp.dest('config'));

    return gulp.src("src/**/**.js")
        .pipe(jsbeautify(jsConfig))
        .pipe(gulp.dest('src'))
        .pipe(webpack(wpConfig))
        .pipe(gulp.dest('js'));
});