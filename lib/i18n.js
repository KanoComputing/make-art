var url = require('url');

var SUPPORTED_LANGUAGES = [
    'ja',
    'en',
    'es',
];

function getLanguage() {
    var parsedUrl = url.parse(window.location.href, true);

    if (parsedUrl.query['lang'] !== undefined) {
        var lang = parsedUrl.query['lang'].toLowerCase();
        if (SUPPORTED_LANGUAGES.indexOf(lang) > -1) {
            return lang;
        }
        // not in supported languages so fall back to normal detection
    }

    var language = window.navigator.languages ? window.navigator.languages[0] :
        window.navigator.userLanguage || window.navigator.language || 'en',
        p = language.indexOf('-');
    language = (p > -1) ? language.substr(0, p) : language;
    language = language.toLowerCase();

    if (SUPPORTED_LANGUAGES.indexOf(language) === -1) {
        // language is not supported so default to 'en'
        return 'en';
    }
    return language;
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
