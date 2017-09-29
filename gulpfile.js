var gulp = require('gulp')
var pug = require('gulp-pug')
var sass = require('gulp-sass')
var concat = require('gulp-concat')
var livereload = require('gulp-livereload')
var express = require('express')
var app = express()
var gutil = require('gulp-util')
var path = require('path')
var data = require('gulp-data')

app.use(express.static(path.resolve('./dist')))

app.listen('8080', function() {
  gutil.log('listening on', '8080')
})

gulp.task('html', function() {
  gulp.src('./src/index.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('./dist'))
    .pipe(livereload())
})

gulp.task('css', function() {
  gulp.src(['./src/css/*.css', './src/sass/*.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./dist/css'))
    .pipe(livereload())
})

gulp.task('images', function() {
  gulp.src('./src/img/*')
    .pipe(gulp.dest('./dist/img'))
    .pipe(livereload())
})

gulp.task('js', function() {
  gulp.src('./src/js/*/**')
    .pipe(gulp.dest('./dist/js'))
    .pipe(livereload())
})

gulp.task('watch', ['build'], function() {
  livereload.listen()
  gulp.watch('./src/**/*.pug', ['html'])
  gulp.watch('./src/sass/*.scss', ['css'])
  gulp.watch('./src/img/*', ['images'])
})

gulp.task('build', ['html', 'css', 'images', 'js'])