"use strict";
const { By, until } = require('selenium-webdriver');
const getTime = require('../utils/getTime');
const { testCanvas } = require('../integration/testCanvas');
const { drawFigure } = require('../benchmark/utils/canvasGenerateData');
const { driver, myServer } = require('../utils/driverSetup');
const { goToPlayGround } = require('../utils/navigation');

const benchmark = async (driver, website) => {
    driver.get(website);
    getTime.start('browserLaunchStartTime');
    // test 1: Check the performance of the launching browser 
    await driver.wait(until.elementLocated(By.css('button.button.large')));
    getTime.end('browserLaunchDuration');
    // Home Menu
    await driver.wait(until.elementLocated(By.css('button.button.large'))).click();
    // Go in Playground
    getTime.end('goToPlayGroundStart');
    goToPlayGround(driver);
    getTime.end('goToPlayGroundDuration');
    await testCanvas(driver, drawFigure());
    driver.sleep(1000).then(function () {
        driver.quit();
    });
};

benchmark(driver(), myServer);