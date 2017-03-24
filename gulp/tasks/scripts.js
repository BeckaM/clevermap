var gulp = require('gulp'),   
    polyfill = require('es6-promise').polyfill(),
    concat = require('gulp-concat');
    
gulp.task('scripts', function() {
   return gulp.src([
       './app/scripts/app.js',
       './app/scripts/controllers.js',
       './app/scripts/directives.js',
       './app/scripts/routes.js',
       './app/scripts/services.js'
        ])
        .pipe(concat('script.js'))
        .pipe(gulp.dest('./app/temp/scripts/'));
});