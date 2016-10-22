var gulp = require('gulp'), 
    jsbeautify = require("gulp-jsbeautifier");
    babel = require("gulp-babel");

// todo implement a testing thing
// jasmine + karma
gulp.task('tests', () => {

	return;
});

gulp.task('default', () => {
	return gulp.src("src/js/**/**.js")
		.pipe(jsbeautify({
			config: './config/js-beautify.json'
		}))
		.pipe(gulp.dest('src'))
		.pipe(babel({
			
		}))
		.pipe(gulp.dest('js'));
});

