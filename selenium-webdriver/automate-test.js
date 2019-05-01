const { Builder, By, until } = require('selenium-webdriver');
const getTime = require('./getTime');
const { goToChallenges, goToPlayGround } = require('./navigation');
const { testCanvas } = require('./testCanvasPerformance');
const { drawFigure } = require('./canvasPerformanceGenerateData');
const colorsConsole = require('colors'); 

let myServer = 'http://172.16.254.110:3000'
let chrome = require('selenium-webdriver/chrome')
let chrome_options = new chrome.Options(); // you will need to setup Chroumium
chrome_options.setChromeBinaryPath('/usr/bin/chromium-browser');

let challengeSunnyDay = ['background blue', 'color yellow', 'circle 150'];
let challengeswissFlag = ['background red', 'stroke 66', 'stroke white', 'line 100', 'line -100', 'line 0, 100', 'line 0, -100'];

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
  // test 1: Check the performance of the lunching browser 
  await driver.wait(until.elementLocated(By.css('button.button.large')));
  getTime.end('browserLaunchDuration')
  // Home
  await driver.wait(until.elementLocated(By.css('button.button.large'))).click();
  // Go in Playground
  getTime.start('goToPlayGroundStart')
  await goToPlayGround(driver)
  getTime.end('goToPlayGroundDuration')

  await testCanvas(driver, drawFigure());
  // // first challenge pack
  getTime.start('gotoTheChallengeStart')
  await goToChallenges(driver);
  await testChallengesPath(driver, challengeSunnyDay);
  driver.sleep(1000).then(function () {
    driver.quit();
  });
}


async function testChallengesPath(driver, challengeSolution = challengeSunnyDay) {
  // First challenge
  if (driver.wait(until.elementLocated(By.css('.page-challenge'))).click()) {
    getTime.end('gotoTheChallengeDuration')
  } else {
    return console.warn(`goIntoTheChallengeDuration didn't work`.yellow)
  }
  //  - Hint menu
  await driver.wait(until.elementLocated(By.css('.button-hint'))).click();
  await driver.wait(until.elementLocated(By.css('.button-hint'))).click();
  //  - Write the challenge and reset
  await driver.wait(until.elementLocated(By.css('.ace_editor'))).click();
  await driver.wait(until.elementLocated(By.css('.ace_text-input'))).sendKeys(challengeSolution.join('\n'));
  await driver.wait(until.elementLocated(By.css('.action-reset'))).click();
  // - go througth the help menu
  await driver.wait(until.elementLocated(By.css('.icon-shapes'))).click();
  await driver.wait(until.elementLocated(By.css('.icon-lines'))).click();
  await driver.wait(until.elementLocated(By.css('.icon-position'))).click();
  await driver.wait(until.elementLocated(By.css('.icon-text'))).click();
  await driver.wait(until.elementLocated(By.css('.icon-general'))).click();
  await driver.wait(until.elementLocated(By.css('.icon-colors'))).click();
  await driver.wait(until.elementLocated(By.css('.icon-code'))).click();
  //  - complete the challenge
  await driver.wait(until.elementLocated(By.css('.ace_editor'))).click();
  await driver.wait(until.elementLocated(By.css('.ace_text-input'))).sendKeys(challengeSunnyDay.join('\n'));
  await driver.wait(until.elementLocated(By.css('a.button.button-success'))).click();
  // - Share modal and close it
  await driver.wait(until.elementLocated(By.css('input.filename'))).sendKeys('First string written to test!');
  await driver.wait(until.elementLocated(By.css('textarea.description'))).sendKeys('Second string written to test!');
  await driver.wait(until.elementLocated(By.css('button.button-success'))).click();
  await driver.wait(until.elementLocated(By.css('div.close-button'))).click();
  await driver.wait(until.elementLocated(By.css('div.close-button')));
  await driver.wait(until.elementLocated(By.css('.button-success.skip'))).click();
  await driver.wait(until.elementLocated(By.css('.close'))).click();
  // // Share modal and skip to the next challenge
  await driver.wait(until.elementLocated(By.css('a.button.button-success'))).click();
  await driver.wait(until.elementLocated(By.css('input.filename'))).sendKeys('First string written to test!');
  await driver.wait(until.elementLocated(By.css('textarea.description'))).sendKeys('Second string written to test!');
  await driver.wait(until.elementLocated(By.css('button.button-success'))).click();
  await driver.wait(until.elementLocated(By.css('div.close-button'))).click();
  await driver.wait(until.elementLocated(By.css('div.close-button')));
  await driver.wait(until.elementLocated(By.css('.button-success.skip'))).click();
}