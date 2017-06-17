var gulp = require('gulp');
var config = require('../gulp.config')();

// Create an named instance in one file...
var browserSync = require('browser-sync').create('Instance Browser Sync');

gulp.task('watcher', ['browserSync'], function(){
    console.log('[BVM] Watching scss files for modifications');

    gulp.watch(config.scssFiles, ['compile:resources','browserSync:reload']);
});

gulp.task('browserSync', [], function(){
    console.log('[BVM] Browser synchronization');

    browserSync.init({
        server: {
            baseDir: config.dist
        },
    })
});

gulp.task('browserSync:reload', [], function(){
    console.log('[BVM] Browser Sync: Reload');

    browserSync.reload();
});