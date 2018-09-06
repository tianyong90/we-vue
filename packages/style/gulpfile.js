const gulp = require('gulp')
const sass = require('gulp-sass')
const postcss = require('gulp-postcss')
const cssmin = require('gulp-clean-css')
const fs = require('fs-extra')

// compile component css
gulp.task('compile', () => {
  fs.emptyDirSync('./lib')
  return gulp
    .src('./*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss())
    .pipe(cssmin())
    .pipe(gulp.dest('./lib'))
})

// copy lib files
gulp.task('lib', ['compile'], () => {
  fs.copySync('./lib', '../../lib/we-vue-css')
  fs.copySync('./lib', '../../es/we-vue-css')
})

gulp.task('build', ['lib'])
