var gulp = require('gulp');
var config = require('../gulp.config')();

var del = require('del');

gulp.task('clean:dist', function() {
    return del.sync(config.dist);
})
