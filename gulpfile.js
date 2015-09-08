var gulp = require('gulp'),
    jade = require('gulp-jade'),
    browserify = require('gulp-browserify'),
    stylus = require('gulp-stylus'),
    lr = require('tiny-lr'),
    livereload = require('gulp-livereload'),
    rename = require('gulp-rename'),
    jadeHelpers = require('./utils/jadeHelpers'),
    _ = require('lodash'),
    color = require('cli-color'),
    partialify = require('partialify/custom'),
    griddy = require('griddy'),
    nib = require('nib');

var server = lr(),
    env = process.env.NODE_ENV || 'development',
    production = env === 'production',
    staging = env === 'staging',
    segmentioId = process.env.SEGMENTIO_ID || null,
    offline = process.env.OFFLINE === 'true',
    testmode = process.env.TEST_MODE === 'true';

var paths = {
    views      : { watch: [ 'views/**/*.jade', 'content/**/*' ], src: 'views/**/*.jade', out: 'www' },
    browserify : { watch: [ 'lib/**/*', 'content/**/*', 'lib/**/**/*' ] , src: 'lib/index.js', out: 'www/js' },
    styles     : { watch: 'styles/**/*.styl', src: 'styles/main.styl', out: 'www/css' }
};

function beep() {
    console.log('\007');
}

function handleError(error) {
    beep(error);
    console.log(color.bold('[ error caught ]:\n') + color.red(error));
}

gulp.task('browserify', function () {
    gulp.src(paths.browserify.src,  { read: false })
    .pipe(browserify({
        transform : [
            partialify.alsoAllow('md'),
            partialify.alsoAllow('coffee')
        ],
    }))
    .on('error', handleError)
    .pipe(rename('index.js'))
    .pipe(gulp.dest(paths.browserify.out))
    .pipe(livereload(server));
});

gulp.task('styles', function () {
    gulp.src(paths.styles.src)
    .pipe(stylus({
        pretty : !production,
        use    : [ griddy(), nib() ]
    }))
    .on('error', handleError)
    .pipe(gulp.dest(paths.styles.out))
    .pipe(livereload(server));
});

gulp.task('views', function () {
    gulp.src(paths.views.src)
    .pipe(jade({
        pretty : !production,
        locals : _.extend({
            env         : env,
            production  : production,
            staging     : staging,
            offline     : offline,
            segmentioId : segmentioId,
            testmode    : testmode
        }, jadeHelpers)
    }))
    .on('error', handleError)
    .pipe(gulp.dest(paths.views.out))
    .pipe(livereload(server));
});

gulp.task('livereload', function (next) {
    if (server) { livereload(server); }
    next();
});

gulp.task('listen', function (next) {
    server.listen(35729, next);
});

gulp.task('build', [ 'browserify', 'styles', 'views' ]);

gulp.task('watch', [ 'build', 'listen' ], function () {
    gulp.watch(paths.browserify.watch, [ 'browserify' ]);
    gulp.watch(paths.styles.watch, [ 'styles' ]);
    gulp.watch(paths.views.watch, [ 'views' ]);
});

gulp.task('default', [ 'build' ]);
