var gulp = require('gulp');
var config = require('../gulp.config')();

var path = require('path');
var fs = require('fs');
var concat = require('gulp-concat');
var inject = require('gulp-inject');
//var mergeStream = require('merge-stream');

gulp.task('compile', function(callback) {
    var runSequence = require('run-sequence');
    runSequence('compile:resources', 'compile:index', callback);
});

gulp.task('compile:resources', [], function () {

    // Generate CSS files
    //var sassStream = compileSass(config.scssFiles, fileCSSPath);
    return compileSass(config.scssFiles);

    // Build index.html
    //var indexStream = compileIndex(packageVersionSuffix, config.dist+'css');
    //return mergeStream(sassStream, indexStream);
});

function compileSass(sassFiles) {
    console.log("[BVM] Generate CSS files " + (new Date()).toString());

    var sass = require('gulp-sass');
    var minify = require('gulp-minify-css');

    return gulp.src(sassFiles)
        .pipe(sass()) // Converts Sass to CSS with gulp-sass
        .pipe(concat('app.main.css'))
        .pipe(minify())
        .pipe(gulp.dest(config.dist+'css'));
}

// HTML
//var htmlMin = require('gulp-htmlmin');

gulp.task('compile:index', [], function () {

    var packageVersionSuffix = '?ver=' + JSON.parse(fs.readFileSync(config.root+'package.json')).version;
    console.log('[BVM] Current version: ' + packageVersionSuffix);

    return compileIndex(packageVersionSuffix, config.dist+'css');
});

function compileIndex(packageVersionSuffix, cssDir) {
    console.log("[BVM] Build index page " + (new Date()).toString());

    var transformCss = function (filePath) {
        return '<link rel="stylesheet" href="' + filePath + packageVersionSuffix + '">';
    };
    
    return gulp.src(config.app+'index.html')
        // Injecting custom css files
        .pipe(inject(gulp.src([cssDir + '/**/*.css'], {read: false}), {
            starttag: '<!-- customer:app_css -->',
            ignorePath: '../'+config.dist,
            relative: true,
            transform: transformCss
        }))
        .pipe(gulp.dest(config.dist));
}
