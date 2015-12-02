"use strict";
var api = require('./local-api'),
    notify = require('../notify');

module.exports = {
    save: function (filename, code, desc, image) {
        api.challenge.save({
            filename    : filename,
            code        : code,
            description : desc,
            image       : image
        })
        .then(notify.success, notify.failure);
    },
    share: function (filename, code, desc, image, world, challengeId, cb) {
        api.challenge.share({
            filename    : filename,
            code        : code,
            description : desc,
            image       : image,
            campaignRef : {
                code    : world,
                challengeId: challengeId
            }
        })
        .then(function (res) {
            if (res.body === '') {
                cb(res);
                notify.success();
            } else if (res.body && !res.body.item) {
                cb(res);
                notify.failure(res);
            }
        }, notify.failure);
    },
    load: function (cb) {
        api.challenge.load()
        .then(function (res) {
            cb(res.body);
        }, notify.failure);
    },
    localLoad: function (path, cb) {
        api.challenge.localLoad({
            path       : path
        })
        .then(function (res) {
            cb(res.body);
        }, notify.failure);
    },
    saveWallpaper: function (filename, image_1024, image_4_3, image_16_9) {
        api.challenge.saveWallpaper({
            filename   : filename,
            image_1024 : image_1024,
            image_4_3  : image_4_3,
            image_16_9 : image_16_9
        })
        .then(notify.success, notify.failure);
    },
    browseMore: function () {
        api.challenge.browseMore();
    }
};
