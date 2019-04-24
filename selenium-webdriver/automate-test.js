const { Builder, By, Keys, until } = require('selenium-webdriver');

let myServer = 'http://172.16.254.110:3000'
let chrome = require('selenium-webdriver/chrome')
let chrome_options = new chrome.Options();
let challengeSunnyDay = ['background blue', 'color yellow', 'circle 150'];

let swissFlag = ['background red', 'stroke 66'];
let classesOfTheElementsToTest = [''];

let browserLaunchStartTime = process.hrtime()
let browserLaunchDuration = 0; // it will retutn an array => [seconds, nanoseconds]

chrome_options.setChromeBinaryPath('/usr/bin/chromium-browser');

async function main() {
  let driver_builder = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(chrome_options)

  let driver_chr = driver_builder.build();

  searchTest(driver_chr, myServer);

  // await driver_chr.quit();
}

main()

const searchTest = async (driver, website) => {
  driver.get(website);

  // test 1: Check the performance of the lunching browser 
  driver.wait(until.elementLocated(By.css('button.button.large')));
  browserLaunchDuration = process.hrtime(browserLaunchStartTime);
  console.log('browserLaunchDuration =>', browserLaunchDuration[0], 's', browserLaunchDuration[1], 'ns');

  await driver.findElement(By.css('button.button.large')).click();
  await driver.findElement(By.css('a.world-cover')).click();
  await driver.wait(until.elementLocated(By.css('div.cover'))).click();
  await driver.findElement(By.css('a.button.button-success')).click();

  await driver.findElement(By.css('.button-hint')).click(); // open
  await driver.findElement(By.css('.button-hint')).click(); // close
  driver.findElement(By.css('.ace_text-input')).sendKeys(challengeSunnyDay.join('\n'));
  await driver.findElement(By.css('.action-reset')).click();
  await driver.findElement(By.css('.icon-shapes')).click();
  await driver.findElement(By.css('.icon-lines')).click();
  await driver.findElement(By.css('.icon-position')).click();
  await driver.findElement(By.css('.icon-text')).click();
  await driver.findElement(By.css('.icon-general')).click();
  await driver.findElement(By.css('.icon-colors')).click();
  await driver.findElement(By.css('.icon-code')).click();
  driver.findElement(By.css('.ace_editor')).click();
  driver.findElement(By.css('.ace_text-input')).sendKeys(challengeSunnyDay.join('\n'));
  await driver.wait(until.elementLocated(By.css('a.button.button-success'))).click();
  await driver.wait(until.elementLocated(By.css('input.filename'))).sendKeys('First string written to test!');
  await driver.findElement(By.css('textarea.description')).sendKeys('Second string written to test!');
  await driver.findElement(By.css('button.button-success')).click();
  await driver.findElement(By.css('div.close-button')).click();
  await driver.wait(until.elementLocated(By.css('div.close-button')));
  await driver.findElement(By.css('.button-success.skip')).click();





  // await driver.wait(until.elementLocated(By.css('a.button.button-success')));
  // await driver.findElement(By.css('.modal-overlay')).findElement(By.css('.button.button-success')).click();


  // const click = async function(cssClassEl){
  //   await driver.findElement(By.css(cssClassEl)).click()
  // }

  // click(classesOfTheElementsToTest);

  // test 2: 
  // driver.sleep(1000).then(function () {
  //   driver.findElement(By.name('q')).sendKeys(webdriver.Key.TAB);
  // });

  // driver.findElement(By.name('btnK')).click();

  // driver.sleep(20000).then(function () {
  //   driver.getTitle().then(function (title) {
  //     if (title === 'webdriver - Google Search') {
  //       console.log('Test passed');
  //     } else {
  //       console.log('Test failed');
  //     }
  //     driver.quit();
  // });
  // });
}




// let remoteWebdriver = new RemoteWebDriver("http://localhost:9515", DesiredCapabilities.chrome());
// driver.get("http://www.google.com");