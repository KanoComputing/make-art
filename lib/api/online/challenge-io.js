var api = require('./world-api')(window.CONFIG),
    notify = require('../notify'),
    fileUtil = require('../../util/file');

module.exports = {
    share: function(title, code, description, image, challengeNo) {
        var cover = fileUtil.dataURItoBlob(image),
            attachment = new Blob([ code ], { type: 'text/plain' });

        cover.filename = 'cover.png';
        attachment.filename = 'code.draw';

        var data = {
            app         : 'kano-draw',
            title       : title,
            description : description,
            files       : {
                cover      : cover,
                attachment : attachment
            }
        };

        if (challengeNo) {

            data.campaignRef = {};
            data.campaignRef.code = 'summerCamp';
            data.campaignRef.challengeNo = parseInt(challengeNo, 10);
        }

        api.share.post(data)
        .then(function () {
            notify.success();
        }, function (res) {
            notify.failure(res.body);
        })
        .catch(function (err) {
            throw err;
        });
    },
    load: function(cb) {
        api.challenge.web.load()
        .then(function (res) {
            cb(res.body);
        }, notify.failure);
    },
    saveWallpaper: function(filename, image_1024, image_4_3, image_16_9) {
        api.challenge.saveWallpaper({
            filename   : filename,
            image_1024 : image_1024,
            image_4_3  : image_4_3,
            image_16_9 : image_16_9,
        })
        .then(notify.success, notify.failure);
    }
};
