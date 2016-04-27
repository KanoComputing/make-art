
function getLanguage () {
    var language = window.navigator.languages ? window.navigator.languages[0] :
        window.navigator.userLanguage || window.navigator.language,
        p = language.indexOf('-');
    language = (p > -1) ? language.substr(0, p) : language;
    return language.toLowerCase();
};

function getChallengeLocalePath () {
    var language = getLanguage();
    return language === 'en' ? '' : '/locales/' + language;
}

function getHtmlLocalePath () {
    var language = getLanguage();
    return '/locales/' + language;
}

module.exports = {
    getHtmlLocalePath : getHtmlLocalePath,
    getChallengeLocalePath : getChallengeLocalePath
};

