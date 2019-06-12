console.log('auth.js offline => 1')
export default {
    init: function (callback) {
        callback(null, {
            username : 'foo'
        });
    }
};