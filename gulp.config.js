module.exports = function () {
    var root = '';
    var app = root + 'app/';
    
    var scssFiles = [
        app + '**/*.scss'
    ];
    var dist = '.build/';

    return {
        root: root,
        app: app,
        dist: dist,
        scssFiles: scssFiles
    };
};
