var api = require('./draw-api'),
    notify = require('./notify');

function save(filename, code, desc, image) {
    api.challenge.local.save({
        filename: filename,
        code: code,
        description: desc,
        image: image
    })
        .then(notify.success, notify.failure);
}

function share(filename, data) {
    backend.call('_share_challenge', filename, data);
}

var load = {
    local : function(filename) {
        var file_data;

        api.challenge.local.load({ file: filename})
            .then(function (res) {
                    file_data = res.body;
            }, notify.failure);

        return file_data;
    },
    web : function(filename) {
        var file_data;

        backend.call('_web_load_challenge', filename, function(data) {
            file_data = data;
        });

        return file_data;
    }
};

module.exports = {
    save: save,
    share: share,
    load : load
};
