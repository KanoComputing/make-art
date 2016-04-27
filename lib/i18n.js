
function getLocalePath () {
    var language = window.navigator.languages ? window.navigator.languages[0] :
        window.navigator.userLanguage || window.navigator.language,
        p = language.indexOf('-');
    language = (p > -1) ? language.substr(0, p) : language;
    language = language.toLowerCase();

    return '/locales/' + (language ? language : 'en');
}

module.exports = {
    getLocalePath : getLocalePath
};

