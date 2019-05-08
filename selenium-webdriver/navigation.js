const { By, until } = require('selenium-webdriver');

async function goToChallenges(driver, nameChallenge = 'Sunny Day') {
    await driver.wait(until.elementLocated(By.css('a.logo'))).click();
    await driver.wait(until.elementLocated(By.linkText('Basic'))).click()
    await driver.wait(until.elementLocated(By.linkText(nameChallenge))).click()
    await driver.wait(until.elementLocated(By.css('a.button.button-success'))).click(); // <- measure time into challenge
}

async function goToPlayGround(driver) {
    await driver.wait(until.elementLocated(By.css('a.logo'))).click();
    await driver.wait(until.elementLocated(By.css('a.world-cover'))).click();
    await driver.wait(until.elementLocated(By.linkText('Playground'))).click();
    await driver.wait(until.elementLocated(By.css('.ace_editor'))).click();
}

module.exports = {
    goToChallenges: goToChallenges,
    goToPlayGround: goToPlayGround
}