var gulp = require('gulp');
var requireDir = require('require-dir');
var tasks = requireDir('./gulp-tasks');

/* Default task */
gulp.task('default', ['build']);