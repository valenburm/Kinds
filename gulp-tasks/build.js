var gulp = require('gulp');
var exec = require('child_process').exec;

var runSequence = require('run-sequence');

gulp.task('build', function(callback) {
    runSequence('clean:dist', 'build:ng', 'compile', 'watcher', callback);
});

gulp.task('build:ng', function(cb) {
    exec('ng build', function (err, stdout, stderr) {
        console.log("[BVM] ng build done with success: " +stdout);
        console.log(stderr);
        cb(err);
    });
});