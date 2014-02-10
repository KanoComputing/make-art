var gulp = require('gulp'),
    jade = require('gulp-jade'),
    browserify = require('gulp-browserify'),
    stylus = require('gulp-stylus'),
    lr = require('tiny-lr'),
    livereload = require('gulp-livereload'),
    rename = require('gulp-rename'),
    jadeHelpers = require('./utils/jadeHelpers'),
    _ = require('lodash');

var server = lr(),
    env = process.env.NODE_ENV === 'production' ? 'production' : 'develpoment',
    production = env === 'production';

var paths = {
    views: { watch: [ 'views/*/**.jade', 'views/*.jade', 'content/*', 'content/*/**' ], src: 'views/*.jade', out: 'www' },
    browserify: { watch: [ 'src/*.coffee', 'src/*/**.coffee', 'src/*/**/***.coffee' ], src: 'src/app.coffee', out: 'www/js' },
    styles: { watch: 'styles/*/**.styl', src: 'styles/main.styl', out: 'www/css' }
};

gulp.task('browserify', function () {
    gulp.src(paths.browserify.src,  { read: false })
    .pipe(browserify({
        transform: [ 'coffeeify' ],
        extensions: [ '.coffee' ]
    }))
    .pipe(rename('app.js'))
    .pipe(gulp.dest(paths.browserify.out))
    .pipe(livereload(server));
});

gulp.task('styles', function () {
    gulp.src(paths.styles.src)
    .pipe(stylus({
        pretty: !production,
        use: [ 'griddy', 'nib' ]
    }))
    .pipe(gulp.dest(paths.styles.out))
    .pipe(livereload(server));
});

gulp.task('views', function () {
    gulp.src(paths.views.src)
    .pipe(jade({
        pretty: !production,
        locals: _.extend({
            env: env,
            production: production
        }, jadeHelpers)
    }))
    .pipe(gulp.dest(paths.views.out))
    .pipe(livereload(server));
});

gulp.task('livereload', function (next) {
    livereload(server);
    next();
});

gulp.task('listen', function (next) {
    server.listen(35729, next);
});

gulp.task('watch', [ 'listen' ], function () {
    gulp.watch(paths.browserify.watch, [ 'browserify' ]);
    gulp.watch(paths.styles.watch, [ 'styles' ]);
    gulp.watch(paths.views.watch, [ 'views' ]);
});

gulp.task('default', [ 'browserify', 'styles', 'views' ]);