var gulp = require('gulp');
var config = require('../gulp.config')();

gulp.task('watcher', [], function(){
    console.log("Watching scss files for modifications");

    gulp.watch(config.scssFiles, ["compile"]);
});
