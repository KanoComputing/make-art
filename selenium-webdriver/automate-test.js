const { Builder, By, until } = require('selenium-webdriver');
const getTime = require('./getTime');
const { goToPlayGround } = require('./navigation');
const { testCanvas } = require('./testCanvasPerformance');
const { drawFigure } = require('./canvasPerformanceGenerateData');
const { goThroughTheChallenges } = require('./testChallengePath');
const {challenges} = require('./challenges-solution')
const colorsConsole = require('colors');

  
let myServer = 'http://172.16.254.110:3000'
let chrome = require('selenium-webdriver/chrome')
let chrome_options = new chrome.Options(); // you will need to setup Chroumium
chrome_options.setChromeBinaryPath('/usr/bin/chromium-browser');



async function main() {
  let driver_builder = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(chrome_options)

  let driver_chr = driver_builder.build();

  searchTest(driver_chr, myServer);
}

main()

const searchTest = async (driver, website) => {
  driver.get(website);
  getTime.start('browserLaunchStartTime')
  // test 1: Check the performance of the launching browser 
  await driver.wait(until.elementLocated(By.css('button.button.large')));
  getTime.end('browserLaunchDuration')
  // Home Menu
  await driver.wait(until.elementLocated(By.css('button.button.large'))).click();
  // Go in Playground
  getTime.start('goToPlayGroundStart')
  await goToPlayGround(driver)
  getTime.end('goToPlayGroundDuration')
  await testCanvas(driver, drawFigure());
  // first challenge pack
  getTime.start('gotoTheChallengeStart')
  await goThroughTheChallenges(driver, challenges);
  driver.sleep(1000).then(function () {
    driver.quit();
  });
}