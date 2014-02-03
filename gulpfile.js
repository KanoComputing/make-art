var gulp = require('gulp'),
    jade = require('gulp-jade'),
    coffee = require('gulp-coffee'),
    browserify = require('gulp-browserify'),
    stylus = require('gulp-stylus');

var paths = {
    views: { src: 'views/*.jade', out: 'public' },
    coffee: { src: 'src/*.coffee', out: '.tmp' },
    browserify: { src: '.tmp/app.js', out: 'public/js' },
    styles: { src: 'styles/main.styl', out: 'public/css' }
};

gulp.task('coffee', function () {
    gulp.src(paths.coffee.src)
    .pipe(coffee({ bare: true }))
    .pipe(gulp.dest(paths.coffee.out));
});

gulp.task('browserify', function () {
    gulp.src(paths.browserify.src)
    .pipe(browserify())
    .pipe(gulp.dest(paths.browserify.out));
});

gulp.task('styles', function () {
    gulp.src(paths.styles.src)
    .pipe(stylus({ pretty: true }))
    .pipe(gulp.dest(paths.styles.out));
});

gulp.task('views', function () {
    gulp.src(paths.views.src)
    .pipe(jade({ pretty: true }))
    .pipe(gulp.dest(paths.views.out));
});

gulp.task('watch', function () {
    gulp.watch(paths.coffee.src, [ 'coffee' ]);
    gulp.watch(paths.browserify.src, [ 'browserify' ]);
    gulp.watch(paths.styles.src, [ 'styles' ]);
    gulp.watch(paths.views.src, [ 'views' ]);
});

gulp.task('default', [ 'coffee', 'browserify', 'styles', 'views' ]);