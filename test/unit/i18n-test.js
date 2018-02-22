var i18n = require('../../lib/i18n'),
    assert = require("chai").assert;


describe("i18n", function() {
    beforeEach(function() {
        // patch window.navigator
        global.window = {};
        global.window.navigator = {};
        global.window.location = { href: '' };
    });

    afterEach(function() {
        global.window.navigator = {};
        global.window.location = {};
    });

    it("should return users language", function() {
        global.window.navigator.language = 'en-GB';

        var lang = i18n.getLanguage();
        assert.equal(lang, 'en');
    });

    it("should return correct challenge locale path", function() {
        global.window.navigator.language = 'en-GB';

        var challengePath = i18n.getChallengeLocalePath();
        assert.equal(challengePath, '');

        global.window.navigator.language = 'es';

        var challengePath = i18n.getChallengeLocalePath();
        assert.equal(challengePath, '/locales/es');
    });

    it("should return correct html locale path", function() {
        global.window.navigator.language = 'en-GB';

        var challengePath = i18n.getHtmlLocalePath();
        assert.equal(challengePath, '/locales/en');

        global.window.navigator.language = 'es';

        var challengePath = i18n.getHtmlLocalePath();
        assert.equal(challengePath, '/locales/es');
    });

    it("should allow language override from url param", function() {
        global.window.navigator.language = 'en-GB';
        global.window.location.href = 'http://example.com?lang=ja';

        var lang = i18n.getLanguage();
        assert.equal(lang, 'ja');
    });

    it("should default to en if language is not supported", function() {
        global.window.navigator.language = 'fr-FR';

        var lang = i18n.getLanguage();
        assert.equal(lang, 'en');
    });
});
