function ensureArray(arr) {
    arr = arr || [];

    if (!Array.isArray(arr)) {
        arr = [ arr ];
    }

    return arr;
}

function notify(msg, classes) {
    var notifyDiv = document.createElement('div'),
        notifyClassList = notifyDiv.classList,
        msgNode = document.createTextNode(msg);

    notifyDiv.appendChild(msgNode);

    classes = ensureArray(classes);
    classes.push('notification');

    for (var i = 0, len = classes.length; i < len; i++) {
        notifyClassList.add(classes[i]);
    }

    document.body.appendChild(notifyDiv);

    setTimeout(function() {
        document.body.removeChild(notifyDiv);
    }, 5000);
}

function failure(res) {
    var error = res.body;
    console.log('Could not perform operation: ' + error);
    notify('Could not perform operation. Try again later...', 'fail');
}

function success() {
    notify('Successful', 'success');
}

module.exports = {
    success: success,
    failure: failure
};
