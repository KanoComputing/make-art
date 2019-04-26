/*
 * Notify module
 *
 * Display temporary notifications
 */

var NOTIFICATION_DURATION = 5000;

/*
 * Display notification message with given classes on element
 *
 * @param {String} msg
 * @param [{String}*] classes
 * @return void
 */
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
    }, NOTIFICATION_DURATION);
}

/*
 * Shows HTTP request failure notification
 *
 * @param {Object} res
 * @return void
 */
function failure(res) {
    var error = res.body;
    console.log('Could not perform operation: ' + error);
    notify('Could not perform operation. Try again later...', 'fail');
}

/*
 * Shows generic success notification
 *
 * @return void
 */
function success() {
    notify('Successful', 'success');
}

/*
 * Wraps item in array if it's not an array
 *
 * @param {Array|*} arr
 * @return {Array}
 */
function ensureArray(arr) {
    arr = arr || [];

    if (!Array.isArray(arr)) {
        arr = [ arr ];
    }

    return arr;
}

export default {
    success : success,
    failure : failure
};