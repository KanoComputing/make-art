"use strict";
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
    nib = require('nib'),
    fs = require('fs'),
    server = lr(),
    env = process.env.NODE_ENV || 'development',
    production = env === 'production',
    segmentioId = process.env.SEGMENTIO_ID || null,
    facebookAppId = process.env.FACEBOOK_APP_ID || null,
    unknown_user = process.env.UNKNOWN_USER || null,
    mailServer = process.env.MAILSERVER || null,
    api_url = process.env.API_URL || null,
    world_url = process.env.WORLD_URL || null,
    offline = process.env.OFFLINE === 'true',
    testmode = process.env.TEST_MODE === 'true',
    chDescriptorsPath = 'www/assets/challenges/descriptors/',
    libPath = 'lib/challenges/';

var paths = {
    views      : { watch: [ 'views/**/*.jade', 'content/**/*' ], src: 'views/**/*.jade', out: 'www' },
    browserify : { watch: [ 'lib/**/*', 'content/**/*', 'lib/**/**/*' ] , src: 'lib/index.js', out: 'www/js' },
    styles     : { watch: 'styles/**/*.styl', src: 'styles/main.styl', out: 'www/css' },
    content    : {watch: 'lib/challenges/**/*'}
};

function handleError(error) {
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
            env             : env,
            production      : production,
            offline         : offline,
            segmentioId     : segmentioId,
            facebookAppId   : facebookAppId,
            mailServer      : mailServer,
            api_url         : api_url,
            world_url       : world_url,
            testmode        : testmode,
            challenges_url  : "/assets/challenges/descriptors",
            unknown_user    : unknown_user
        }, jadeHelpers)
    }))
    .on('error', handleError)
    .pipe(gulp.dest(paths.views.out))
    .pipe(livereload(server));
});

/**
 * This task modifies the challenge index to contain basic
 * information about the single challenges, so that we
 * can show a calendar without loading all the single challenges.
 */
gulp.task('apify-challenges', ['copy-challenges'], function (next) {
    var index,
        worldsNum,
        //fields that are copied from ./index.json to /world/<world>/index.json
        copyWorldFields = [
            'id',
            'name',
            'description',
            'world_path',
            'cover',
            'css_class',
            'visibility',
            'dependency',
            'type',
            'share_strategy',
            'sales_popup_after',
            'certificate_after',
            'teachers_guide',
            'updateForm',
            'socialText'
        ],
        countNext = 0,
        formattedIndex;
    function localNext() {
        if (++countNext === worldsNum + 1) {
            next();
        }
    }
    //work with them
    index = require('./' + chDescriptorsPath + 'index.json');
    worldsNum = index.worlds.length;

    index.worlds.forEach(function (world) {
        var worldPath = './' + chDescriptorsPath + world.world_path,
            libWorldPath = './' + libPath + world.world_path,
            worldObj = {},
            challenges = [],
            formattedJSON;

        worldObj = JSON.parse(JSON.stringify(require(libWorldPath + '/index.json')));

        copyWorldFields.forEach(function (field) {
            if (world[field]) {
                worldObj[field] = world[field];
            }
        });

        //load all the challenges in an array
        worldObj.challenges.forEach(function (ch, idx, arr) {
            var chFileName = worldPath + ch.substr(1, ch.length - 1),
                challenge = require(chFileName),
                index = idx + 1,
                hasNext = index !== (arr.length),
                ch_obj = {
                    id: challenge.id,
                    title: challenge.title,
                    short_title: challenge.short_title,
                    cover: challenge.cover,
                    index: index,
                    hasNext: hasNext,
                    start_date: challenge.start_date
                };
            challenge.index = index ;
            challenge.hasNext = hasNext;

            fs.writeFile(chFileName + ".json", JSON.stringify(challenge, null, 4), function (err) {
                if (err) {
                    throw err;
                }
            });
            challenges.push(ch_obj);
        });


        worldObj.challenges = challenges;

        world.challenges_num = challenges.length;

        formattedJSON = JSON.stringify(worldObj, null, 4);
        //write the challenges with headers
        fs.writeFile(worldPath + '/index.json', formattedJSON, function (err) {
            if (err) {
                throw err;
            } else {
                localNext();
            }
        });
    });
    //copy back the index
    formattedIndex = JSON.stringify(index, null, 4);
    fs.writeFile(chDescriptorsPath + 'index.json', formattedIndex, function (err) {
        if (err) {
            throw err;
        } else {
            localNext();
        }
    });


});

gulp.task('copy-challenges', function (next) {
    var counter = 0,
        stream1,
        stream2;
    function localNext() {
        if (++counter === 2) {
            next();
        }
    }
    stream1 = gulp.src('lib/challenges/worlds/**/*.json')
        .pipe(gulp.dest(chDescriptorsPath + "/worlds"));
    //copy the files
    stream2 = gulp.src('lib/challenges/index.json')
        .pipe(gulp.dest(chDescriptorsPath));
    stream1.on('end', localNext);
    stream2.on('end', localNext);

});

gulp.task('livereload', function (next) {
    if (server) {
        livereload(server);
    }
    next();
});

gulp.task('listen', function (next) {
    server.listen(35729, next);
});
gulp.task('prepare-challenges', ['copy-challenges', 'apify-challenges']);

gulp.task('build', ['browserify', 'styles', 'views', 'prepare-challenges']);

gulp.task('watch', ['build', 'listen'], function () {
    gulp.watch(paths.browserify.watch, ['browserify']);
    gulp.watch(paths.styles.watch, ['styles']);
    gulp.watch(paths.content.watch, ['prepare-challenges']);
    gulp.watch(paths.views.watch, ['views']);
});

gulp.task('default', [ 'build' ]);
