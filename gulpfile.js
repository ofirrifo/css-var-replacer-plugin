'use strict';

const gulp = require('gulp');
const postcss = require('gulp-postcss');
const postScss = require('postcss-scss');
const plugin = require('./plugin'); // our plugin

gulp.task('scss', () => {
    return gulp.src('./src/**/*.scss')
        .pipe(postcss([plugin], { parser: postScss }))
        .pipe(gulp.dest(function (file) {
            return file.base;
        }));
});
