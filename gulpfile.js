var gulp = require('gulp'),
    watch = require('gulp-watch'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cssvars = require('postcss-simple-vars'),
    nested = require('postcss-nested'),
    polyfill = require('es6-promise').polyfill(),
    concat = require('gulp-concat'),
    cssImport = require('postcss-import');
    

gulp.task('default', function() {
});

gulp.task('scripts', function() {
   return gulp.src([
       './app/app.js',
       './app/controllers.js'
        ])
        .pipe(concat('script.js'))
        .pipe(gulp.dest('./app/dest/'));
});

gulp.task('styles', function() {   
    return gulp.src('./components/styles/clever-map.css')
        .pipe(postcss([cssImport, cssvars, nested, autoprefixer]))
        .pipe(gulp.dest('./app/dest/')); 
});

gulp.task('watch', function() {
    
   watch('./components/styles/**/*.css', function() {
        gulp.start('styles');
    }); 
    
    watch('./app/**/*.js', function() {
        gulp.start('scripts');
    }); 
    
}); 
