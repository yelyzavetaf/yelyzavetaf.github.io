'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var sourcemaps = require('gulp-sourcemaps');
 
sass.compiler = require('node-sass');

var path = {
    styles: './scss/*.scss' }


 
gulp.task('sass', function () {
    return gulp.src('./scss/*.scss')
     .pipe(sourcemaps.init())
     .pipe(sass().on('error', sass.logError))
     .pipe(sourcemaps.write())
     .pipe(gulp.dest('./css'));
   });

   gulp.task('sass:watch', function () {
    gulp.watch ('./scss/*.scss', gulp.series ('sass'));
  });

gulp.task('serve',  function() {
    browserSync.init({
        server: "./"
    });
  //  gulp.watch ('./scss/*.scss', gulp.series ('sass'));
  // gulp.watch(["./*/*.html", "./*.html", "./css/*.css", "./*/*.js"]).on('change', browserSync.reload);
    
});



//var uglify = require('gulp-uglify');
//var pipeline = require('readable-stream').pipeline;
 
//gulp.task('compress', function () {
//  return pipeline(
 //       gulp.src('project.module.js', 'project.config.js', 'tasks/*.js', 'register/*.js', 'login/*.js'),
//        uglify(),
 //       gulp.dest('dist')
//  );
//});



var uglifyjs = require('uglify-js'); // can be a git checkout
                                     // or another module (such as `uglify-es` for ES6 support)
var composer = require('gulp-uglify/composer');
var pump = require('pump');
 
var minify = composer(uglifyjs, console);
 
gulp.task('compress', function (cb) {
  // the same options as described above
  var options = {};
 
  pump([
      gulp.src(['project.module.js', 'project.config.js', 'tasks/*.js', 'register/*.js', 'login/*.js']),
      minify(options),
      gulp.dest('dist')
    ],
    cb
  );
});



var concat = require('gulp-concat');
 
gulp.task('scripts', function() {
  return gulp.src('*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('.'));
});


gulp.task('styles', function() {
  return gulp.src(['./css/*.css', 'node_modules/normalize.css/normalize.css'])
    .pipe(concat('all.css'))
    .pipe(gulp.dest('./dist/'));
});



const htmlmin = require('gulp-htmlmin');
 
gulp.task('minify', () => {
  return gulp.src(['index.html', 'tasks/tasks.template.html', 'login/login.template.html', 'register/register.template.html',])
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist'));
});