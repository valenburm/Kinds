var gulp = require('gulp');
var config = require('../gulp.config')();

// Requires the gulp-sass plugin
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var minify = require('gulp-minify-css');

gulp.task('compile', [], function () {
    return compileSass(config.scssFiles);
});

function compileSass(sassFiles) {
    console.log("Generate CSS files " + (new Date()).toString());

    return gulp.src(sassFiles)
        .pipe(sass()) // Converts Sass to CSS with gulp-sass
        .pipe(concat('main.css'))
        .pipe(minify())
        .pipe(gulp.dest(config.dist+'css'));
}