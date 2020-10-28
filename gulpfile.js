var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var connect = require('gulp-connect');
var merge = require('merge-stream');

gulp.task('connect', function () {
    connect.server({
        root: 'public',
        livereload: true
    });
});

gulp.task('sass', function () {
    var sassStream = gulp.src('./src/scss/*.scss')
        .pipe(sass({errLogToConsole: true}));// keeps gulp from crashing for scss errors

    return merge(sassStream, gulp.src('./src/css/other.css'))
        .pipe(cleanCSS())//minifi css
        .pipe(concat('main.min.css'))
        .pipe(gulp.dest('./public/css'));
});

gulp.task('livereload', async function () {
    gulp.src('./public/**/*')
        .pipe(connect.reload());
});

gulp.task('watch', function () {
    gulp.watch('./src/scss/**/*.scss', gulp.series(['sass']));
    gulp.watch('./public/**/*', gulp.series(['livereload']));
});

// Minifies JS
gulp.task('js', function () {
    return gulp.src(['./node_modules/jquery/dist/jquery.min.js', './node_modules/bootstrap/dist/js/bootstrap.min.js', './src/js/main.js'])
        .pipe(uglify())
        .pipe(concat('main.min.js'))
        .pipe(gulp.dest('public/js'));
});

gulp.task('default', gulp.parallel(['connect', 'watch', 'sass', 'js']));
gulp.task('release', gulp.parallel(['sass', 'js']));