var gulp        = require('gulp');
var less        = require('gulp-less');
var browserify  = require('gulp-browserify');
var rename      = require("gulp-rename");
var notify      = require("gulp-notify");
var browserSync = require('browser-sync');
var babelify    = require("babelify");


var handleErrors = require('./gulp/handleErrors');


gulp.task('default', ['watch' , 'browser-sync']);

gulp.task('watch' , ['less', 'react'], function(){
    gulp.watch('app/style/*.less', ['less']);
    gulp.watch('app/style/**/*.less', ['less']);
    gulp.watch('app/js/**/*.jsx',  ['react']);
    gulp.watch('app/js/**/*.js',   ['react']);
    gulp.watch('app/bundle.js',     browserSync.reload);

})
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./app"
        }
    });
});

gulp.task('less', function () {
    gulp.src('app/style/main.less') // path to your file
    .pipe(less({strictMath: true}).on('error', handleErrors))
    .pipe(browserSync.reload({stream:true}))
    .pipe(gulp.dest('./app'));

});


gulp.task('react', function () {
    gulp.src('app/js/app.jsx')
    .pipe(browserify({
            transform: [babelify]
    }) .on('error', handleErrors))

    .pipe(rename("bundle.js"))
    .pipe(gulp.dest('app/'));

});
