var gulp = require('gulp'), 
    jsbeautify = require("gulp-jsbeautifier");
    babel = require("gulp-babel");

gulp.task('babel', () => {
	return gulp.src("src/es6/**/**.js")
		.pipe(babel({
			
		}))
		.pipe(gulp.dest('dist'));
});

gulp.task('default', () => {
	return gulp.src("src/js/**/**.js")
		.pipe(jsbeautify({

		}))
		.pipe(gulp.dest('src/js'))
		.pipe(gulp.dest('dist'));
});

