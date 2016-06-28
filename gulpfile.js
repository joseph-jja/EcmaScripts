var gulp = require('gulp'), 
    babel = require("gulp-babel");

gulp.task('babel', () => {
	return gulp.src("src/es6/**/**.js")
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(gulp.dest('dist'));
});

gulp.task('compile', () => {
	return gulp.src("src/**/**.js")
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(gulp.dest('dist'));
});

