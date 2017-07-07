var gulp = require('gulp');
var config = require('../gulp.config')();

var path = require('path');
var fs = require('fs');
var concat = require('gulp-concat');
var inject = require('gulp-inject');
var mergeStream = require('merge-stream');

var ts = require('gulp-typescript');
var tsProject = ts.createProject("tsconfig.json");

gulp.task('compile', function(callback) {
    var runSequence = require('run-sequence');
    //runSequence('compile:resources', 'compile:mainJS', 'compile:index', callback);
    runSequence('compile:resources', 'copy:scripts', 'compile:index', callback);
});

//gulp.task('compile:resources', ['concat:js'], function () {
gulp.task('compile:resources', [], function () {
    // Copy CSS UI styles
    var cssUIStylesStream = copyCSSUIStyles();

    // Generate CSS files
    var sassStream = compileSass(config.scssFiles);

    // Generate JS files
    //var tsStream = compileJS(config.tsFiles);

    // Generate Main JS file
    //var mainJSStream = compileMainJS(config.app + 'main.ts');
    
    //var htmls = gulp.src(config.app + 'components/**/*.html')
    //    .pipe(gulp.dest(config.dist+'templates'));

    return mergeStream(sassStream, cssUIStylesStream);
});

function compileSass(sassFiles) {
    console.log("[BVM] Compiling the SASS to CSS " + (new Date()).toString());

    var sass = require('gulp-sass');
    var minify = require('gulp-minify-css');

    return gulp.src(sassFiles)
        .pipe(concat('app.main.scss'))
        .pipe(sass()) // Converts Sass to CSS with gulp-sass
        //.pipe(concat('app.main.css'))
        .pipe(minify())
        .pipe(gulp.dest(config.dist+'css'));
}

function copyCSSUIStyles() {
    console.log("[BVM] Copy CSS UI styles " + (new Date()).toString());

    return gulp.src(config.app + "assets/**/*")
        .pipe(gulp.dest(config.dist+"css"));
}

/*function compileJS(tsFiles) {
    console.log("[BVM] Compiling the TypeScript to JavaScript " + (new Date()).toString());
    // http://kerryritter.com/getting-started-with-typescript-and-gulp/

    // lint - команда Lint средство синтаксического контроля Си-программ
    // линт, контроль стиля программирования на соответствие стандартам (путём "выщипывания пушинок", мешающих правильной работе программ) || контролировать стиль программирования на соответствие стандартам

    return gulp.src(tsFiles) //tsProject.src()
        .pipe(concat('modules.ts'))
        .pipe(tsProject())
        .js
        .pipe(gulp.dest(config.dist+'js'));
}*/

gulp.task('compile:mainJS', [], function () {
    console.log("[BVM] Compiling the Main TypeScript to JavaScript " + (new Date()).toString());

    return gulp.src(config.app + 'main.ts')
        .pipe(tsProject())
        .js
        .pipe(gulp.dest(config.dist));
});

gulp.task("concat:js", [], function() {
    console.log("[BVM] Concatonating SystemJS dependencies " + (new Date()).toString());

    return gulp.src([
            "node_modules/systemjs/dist/system.js",
            "node_modules/es6-shim/es6-shim.js"
        ])
        .pipe(concat("lib.js"))
        .pipe(gulp.dest(config.dist+'js'));
});

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

gulp.task('copy:scripts', function () {
    return gulp.src([
        'dist_ng/inline.bundle.js',
        'dist_ng/polyfills.bundle.js',
        'dist_ng/vendor.bundle.js',
        'dist_ng/main.bundle.js'
    ]).pipe(gulp.dest(config.dist+'js'));
});
