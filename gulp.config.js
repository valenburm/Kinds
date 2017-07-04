module.exports = function () {
    var root = '';
    var app = root + 'app/';
    
    var scssFiles = [
        app + '**/*.scss'
    ];
    var tsFiles = [
        app + 'components/**/*.ts'
    ];
    var dist = 'dist/';

    return {
        root: root,
        app: app,
        dist: dist,
        scssFiles: scssFiles,
        tsFiles: tsFiles
    };
};
