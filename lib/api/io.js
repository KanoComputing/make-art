/* global backend */

function save(filename, data) {
    backend.call('_save_challenge', filename, data);
}

function share(filename, data) {
    backend.call('_share_challenge', filename, data);
}

var load = {
    local : function(filename) {
        var file_data;

        backend.call('_local_load_challenge', filename, function(data) {
            file_data = data;
        });

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
