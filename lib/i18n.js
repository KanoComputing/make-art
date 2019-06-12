var SUPPORTED_LOCALES = [
    'ja',
    'en',
    'es-AR',
];

var parseQueryString = function( queryString ) {
    var params = {}, queries, temp, i, l;
    // Split into key/value pairs
    queries = queryString.split("&");
    // Convert the array of strings into an object
    for ( i = 0, l = queries.length; i < l; i++ ) {
        temp = queries[i].split('=');
        params[temp[0]] = temp[1];
    }
    return params;
};

function getLanguage() {
    var query = parseQueryString(window.location.search);

    if (query['lang'] !== undefined) {
        var lang = query['lang'];
        if (SUPPORTED_LOCALES.indexOf(lang) > -1) {
            return lang;
        }
        // not in supported languages so fall back to normal detection
    }

    var language = window.navigator.languages ? window.navigator.languages[0] :
        window.navigator.userLanguage || window.navigator.language || 'en',
        p = language.indexOf('-');

    // check if full locale is supported
    if (SUPPORTED_LOCALES.indexOf(language) > -1) {
        return language;
    }

    language = language.toLowerCase();

    // otherwise check that if just language is supported
    language = (p > -1) ? language.substr(0, p) : language;
    if (SUPPORTED_LOCALES.indexOf(language) > -1) {
        return language;
    }
    // language is not supported so default to 'en'
    return 'en';
}

function getChallengeLocalePath(root, challengesUrl) {
    var language = getLanguage();
    const base = `${root}${challengesUrl}` || challengesUrl;
    return language === 'en' ? base : `${base}locales/${language}`;
}

function getHtmlLocalePath(root) {
    var language = getLanguage();
    return (root || '/') + 'locales/' + language;
}

export default {
    getLanguage: getLanguage,
    getHtmlLocalePath: getHtmlLocalePath,
    getChallengeLocalePath: getChallengeLocalePath
};

console.log('i18n.js => 1')