let webdriver = require('selenium-webdriver'),
  By = webdriver.By,
  until = webdriver.until;

let chrome = require('selenium-webdriver/chrome')
let chrome_options = new chrome.Options();

chrome_options.setChromeBinaryPath('/usr/bin/chromium-browser');

let driver_chr = new webdriver.Builder()
  .forBrowser('chrome')
  .setChromeOptions(chrome_options)
  .build();

const searchTest = (driver, website) => {
  driver.get(website);

  driver.findElement(By.css('button.button.large')).click();

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

let myServer = 'http://172.16.254.110:3000'

searchTest(driver_chr, myServer);

// let remoteWebdriver = new RemoteWebDriver("http://localhost:9515", DesiredCapabilities.chrome());
// driver.get("http://www.google.com");