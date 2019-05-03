const { Builder } = require('selenium-webdriver');

let myServer = 'http://172.16.254.110:3000'
const chrome = require('selenium-webdriver/chrome')
const chrome_options = new chrome.Options(); // you will need to setup Chroumium
chrome_options.setChromeBinaryPath('/usr/bin/chromium-browser');

function main() {
  const driver_builder = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(chrome_options)

  const driver_chr = driver_builder.build();
  return driver_chr;
}

module.exports = {
  myServer: myServer,
  main: main
}