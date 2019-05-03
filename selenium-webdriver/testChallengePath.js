const { By, until } = require('selenium-webdriver');
const { goToChallenges } = require('./navigation');
const getTime = require('./getTime');
const {challenges, names} = require('./challenges-solution')


async function testChallengesPath(driver, solutionChallenge = challenges[names[0]].solution) {
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
  // await driver.wait(until.elementLocated(By.css('.ace_text-input'))).sendKeys(solutionChallenge.join('\n'));
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
  await driver.wait(until.elementLocated(By.css('.ace_text-input'))).sendKeys(solutionChallenge.join('\n'));
  await driver.wait(until.elementLocated(By.css('a.button.button-success'))).click();
  // - Share modal and close it
  // await driver.wait(until.elementLocated(By.css('input.filename'))).sendKeys('First string written to test!');
  // await driver.wait(until.elementLocated(By.css('textarea.description'))).sendKeys('Second string written to test!');
  // await driver.wait(until.elementLocated(By.css('button.button-success'))).click();
  // await driver.wait(until.elementLocated(By.css('div.close-button'))).click();
  // await driver.wait(until.elementLocated(By.css('div.close-button')));
  // await driver.wait(until.elementLocated(By.css('.button-success.skip'))).click();
  // await driver.wait(until.elementLocated(By.css('.close'))).click();
  // // Share modal and skip to the next challenge
  // await driver.wait(until.elementLocated(By.css('a.button.button-success'))).click();
  // await driver.wait(until.elementLocated(By.css('input.filename'))).sendKeys('First string written to test!');
  // await driver.wait(until.elementLocated(By.css('textarea.description'))).sendKeys('Second string written to test!');
  // await driver.wait(until.elementLocated(By.css('button.button-success'))).click();
  // await driver.wait(until.elementLocated(By.css('div.close-button'))).click();
  // await driver.wait(until.elementLocated(By.css('div.close-button')));
  await driver.wait(until.elementLocated(By.css('.button-success.skip'))).click();
  await driver.wait(until.elementLocated(By.xpath("/html[1]/body[1]/ng-view[1]/div[3]/div[1]/div[2]/div[1]/a[1]"))).click();
  // await driver.wait(until.elementLocated(By.css('a.button.button-success'))).click();
}

async function goThroughTheChallenges(driver, challenges) {
  for (let i = 0; i < 10; i++) { 
    console.log(`name=${names[i]}  value=${challenges[names[i]]}`, challenges[names[i]])
    await goToChallenges(driver, names[i])
    await testChallengesPath(driver, challenges[names[i]].solution)
  }
}

module.exports = {
  testChallengesPath: testChallengesPath,
  goThroughTheChallenges: goThroughTheChallenges
}
