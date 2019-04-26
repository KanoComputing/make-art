/* global unescape */

/*
 * File utilities
 *
 * Collection of basic utilities to work with data URIs and Blobs
 */

/*
 * Convert base64/URLEncoded data component to raw binary data held in a string
 *
 * @param {String} dataURI
 * @return Blob
 */
function dataURItoBlob(dataURI) {
    var byteString;

    if (dataURI.split(',')[0].indexOf('base64') >= 0) {
        byteString = atob(dataURI.split(',')[1]);
    } else {
        byteString = unescape(dataURI.split(',')[1]);
    }

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ ia ], { type: mimeString });
}

/*
 * Trigger download of given blog with filename
 *
 * @param {Blob} blob
 * @param {String} filename
 * @return void
 */
function downloadBlob(blob, filename) {
    var url = window.URL.createObjectURL(blob),
        link = document.createElement('a');

    document.body.appendChild(link);

    link.style.display = 'none';

    link.href = url;
    link.download = filename || 'untitled';
    link.click();

    window.URL.revokeObjectURL(url);
    document.body.removeChild(link);
}


export default {
    dataURItoBlob : dataURItoBlob,
    downloadBlob  : downloadBlob
};