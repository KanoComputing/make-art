var url = require('url');

function getLanguage() {
    var parsedUrl = url.parse(window.location.href, true);

    if (parsedUrl.query['lang'] !== undefined) {
        return parsedUrl.query['lang'].toLowerCase();
    }

    var language = window.navigator.languages ? window.navigator.languages[0] :
        window.navigator.userLanguage || window.navigator.language,
        p = language.indexOf('-');
    language = (p > -1) ? language.substr(0, p) : language;
    return language.toLowerCase();
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
