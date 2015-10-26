var gulp = require('gulp');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var debug = require('gulp-debug');


gulp.task('default', function () {
    return gulp.src('assets/css/*.scss')
        .pipe(debug())
        .pipe(sass())
        .pipe(prefix("last 3 version", "> 1%", "ie 8", "ie 7"))
        .pipe(gulp.dest('assets/css/'));
});

gulp.task('debug', function () {
    return gulp.src('assets/css/*.scss')
        .pipe(debug())
        .pipe(sass())
        .pipe(prefix("last 3 version", "> 1%", "ie 8", "ie 7"))
        .pipe(gulp.dest('assets/css/'));
});

gulp.task('watch', ['default'], function () {
    gulp.watch(['_sass/**/*.scss', 'assets/css/*.scss'], ['debug']);
});
