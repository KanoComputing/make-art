function failure(res) {
    var error = res.body;
    window.alert('Could not perform operation', error);
}

function success() {
    window.alert('Successful');
}

module.exports = {
    success: success,
    failure: failure
};
