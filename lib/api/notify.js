function failure(res) {
    var error = res.body;
    console.log('Could not perform operation: ' + error);
}

function success() {
    console.log('Successful');
}

module.exports = {
    success: success,
    failure: failure
};
