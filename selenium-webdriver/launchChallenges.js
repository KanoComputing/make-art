const { By, until } = require('selenium-webdriver');
const getTime = require('./getTime');
const { goThroughTheChallenges } = require('./testChallengePath');
const { challenges } = require('./challenges-solution')
const { driver, myServer } = require('./driverSetup');

const launchChallenges = async (driver, website) => {
    driver.get(website);
    getTime.start('browserLaunchStartTime')
    // test 1: Check the performance of the launching browser 
    await driver.wait(until.elementLocated(By.css('button.button.large')));
    getTime.end('browserLaunchDuration')
    // Home Menu
    await driver.wait(until.elementLocated(By.css('button.button.large'))).click();
    // Go to the challenges and start with the first one
    getTime.start('gotoTheChallengeStart')
    await goThroughTheChallenges(driver, challenges);
    driver.sleep(1000).then(function () {
        driver.quit();
    });
}

launchChallenges(driver(), myServer)