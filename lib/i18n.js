var url = require('url');

var SUPPORTED_LOCALES = [
    'ja',
    'en',
    'es-AR',
];

function getLanguage() {
    var parsedUrl = url.parse(window.location.href, true);

    if (parsedUrl.query['lang'] !== undefined) {
        var lang = parsedUrl.query['lang'];
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

function getChallengeLocalePath () {
    var language = getLanguage();
    return language === 'en' ? '' : '/locales/' + language;
}

function getHtmlLocalePath () {
    var language = getLanguage();
    return '/locales/' + language;
}

module.exports = {
    getLanguage: getLanguage,
    getHtmlLocalePath: getHtmlLocalePath,
    getChallengeLocalePath: getChallengeLocalePath
};
