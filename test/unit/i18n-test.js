var i18n = require('../../lib/i18n'),
    assert = require("chai").assert;


describe("i18n", function() {
    beforeEach(function() {
        // patch window.navigator
        global.window = {};
        global.window.navigator = {};
    });

    afterEach(function() {
        global.window.navigator = {};
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

        global.window.navigator.language = 'es-AR';

        var challengePath = i18n.getChallengeLocalePath();
        assert.equal(challengePath, '/locales/es');
    });

    it("should return correct html locale path", function() {
        global.window.navigator.language = 'en-GB';

        var challengePath = i18n.getHtmlLocalePath();
        assert.equal(challengePath, '/locales/en');

        global.window.navigator.language = 'es-AR';

        var challengePath = i18n.getHtmlLocalePath();
        assert.equal(challengePath, '/locales/es');
    });
});

