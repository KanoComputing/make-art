"use strict";
const { Builder } = require('selenium-webdriver');

let myServer = 'http://127.0.0.1:3000';
const chrome = require('selenium-webdriver/chrome');
const chrome_options = new chrome.Options(); // you will need to setup Chromium
chrome_options.setChromeBinaryPath('/usr/bin/chromium-browser');

function driver() {
    const driver_builder = new Builder()
        .forBrowser('chrome')
        .setChromeOptions(chrome_options);

    return driver_builder.build();
}

module.exports = {
    myServer: myServer,
    driver: driver
};