const {Builder, By, Key, until} = require('selenium-webdriver');

let myServer = 'http://172.16.254.110:3000'

let chrome = require('selenium-webdriver/chrome')
let chrome_options = new chrome.Options();

chrome_options.setChromeBinaryPath('/usr/bin/chromium-browser');

let driver_builder = new Builder()
  .forBrowser('chrome')
  .setChromeOptions(chrome_options)

let browserLaunchStartTime = process.hrtime()
let browserLaunchDuration = 0; // it will retutn an array => [seconds, nanoseconds]
// console.log('browserLaunchStartTime =>', browserLaunchStartTime);

let driver_chr = driver_builder.build();

const searchTest = (driver, website) => {
  driver.get(website);


  // test 1: Check the performance of the lunching browser 
  driver.wait(until.elementLocated(By.css('button.button.large')))
  browserLaunchDuration = process.hrtime(browserLaunchStartTime)
  console.log('browserLaunchDuration =>', browserLaunchDuration[0], 's', browserLaunchDuration[1], 'ns')


  //

  driver.findElement(By.css('button.button.large')).click()
  driver.findElement(By.css('a.world-cover')).click()
  driver.wait(until.elementLocated(By.css('div.cover'))).click()

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


searchTest(driver_chr, myServer);

// let remoteWebdriver = new RemoteWebDriver("http://localhost:9515", DesiredCapabilities.chrome());
// driver.get("http://www.google.com");