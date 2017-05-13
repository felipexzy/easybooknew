var gulp  = require('gulp');
var connect = require('gulp-connect');
var inject = require('gulp-inject');
var sass = require('gulp-sass');
var watch = require('gulp-watch');

 //task for connect
gulp.task('index', function () {
  var target = gulp.src('app/index.html');

  var source = gulp.src(['app/src/**/*.js', 'app/src/**/*.css'], {read: false});

  return target.pipe(inject(source, {relative: true})).pipe(gulp.dest('app/'));
});

//task for port
gulp.task('connect', function() {
  connect.server({
    root: 'app',
    livereload: true,
    port: 8081
  });
});

gulp.task('html', function () {
  gulp.src('./app/**/*.html')
    .pipe(connect.reload());
});

gulp.task('js', function () {
  gulp.src('./app/**/*.js')
    .pipe(connect.reload());
});

gulp.task('css', function () {
  gulp.src('./app/**/*.css')
    .pipe(connect.reload());
});

//task for sass
gulp.task('sass', function(){
    return gulp.src('app/assets/sass/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('app/assets/css'));
});

//task for watch
gulp.task('watch', function(){
    gulp.watch(['./app/**/*.scss'], ['sass']);
    gulp.watch(['./app/**/*.html'], ['html']);
    gulp.watch(['./app/**/*.js'], ['js']);
    gulp.watch(['./app/**/*.css'], ['css']);
});

//task default
gulp.task('default', ['sass', 'watch', 'connect', 'index']);