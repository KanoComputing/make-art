const { Builder, By, Keys, until } = require('selenium-webdriver');

let myServer = 'http://172.16.254.110:3000'
let chrome = require('selenium-webdriver/chrome')
let chrome_options = new chrome.Options(); // you will need to setup Chroumium
chrome_options.setChromeBinaryPath('/usr/bin/chromium-browser');

let challengeSunnyDay = ['background blue', 'color yellow', 'circle 150'];
let challengeswissFlag = ['background red', 'stroke 66', 'stroke white', 'line 100', 'line -100', 'line 0, 100', 'line 0, -100'];
let challengePlayGround = ['background green', 'color yellow\ncircle 100'];

let browserLaunchStartTime = process.hrtime();
let browserLaunchDuration = 0; // it will retutn an array => [seconds, nanoseconds]
let goIntoTheChallengeTime = browserLaunchStartTime;
let goIntoTheChallengeDuration = 0;
let canvasStart = browserLaunchStartTime;
let canvasHasChange = 0;



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

  // Home
  await driver.findElement(By.css('button.button.large')).click();
  // Go in Playground
  goInPlayGround(driver)
  testCanvas(driver,drawFigure(colors));

  // // first challenge pack
  goToChallenges(driver);
  testChallengesPath(driver, challengeSunnyDay);

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

async function testChallengesPath(driver, challengeSolution=challengeSunnyDay) {
  // First challenge
  if (driver.wait(until.elementLocated(By.css('.page-challenge'))).click()) {
    goIntoTheChallengeDuration = process.hrtime(goIntoTheChallengeTime);

    console.log('goIntoTheChallengeDuration =>', goIntoTheChallengeDuration[0], 's', goIntoTheChallengeDuration[1], 'ns');

  }
  //  - Hint menu
  await driver.wait(until.elementLocated(By.css('.button-hint'))).click();
  await driver.wait(until.elementLocated(By.css('.button-hint'))).click();
  //  - Write the challenge and reset
  await driver.findElement(By.css('.ace_editor')).click();
  driver.findElement(By.css('.ace_text-input')).sendKeys(challengeSolution.join('\n'));
  console.time('draw')
  // await driver.wait(async () => {
  //   const newValue = await getCanvasValue(canvas);
  //   return newValue !== initialValue
  // })
  console.timeEnd('draw')
  // query canvas and compare with expected
  await driver.findElement(By.css('.action-reset')).click();
  // - go througth the help menu
  await driver.findElement(By.css('.icon-shapes')).click();
  await driver.findElement(By.css('.icon-lines')).click();
  await driver.findElement(By.css('.icon-position')).click();
  await driver.findElement(By.css('.icon-text')).click();
  await driver.findElement(By.css('.icon-general')).click();
  await driver.findElement(By.css('.icon-colors')).click();
  await driver.findElement(By.css('.icon-code')).click();
  //  - complete the challenge
  await driver.findElement(By.css('.ace_editor')).click();
  driver.findElement(By.css('.ace_text-input')).sendKeys(challengeSunnyDay.join('\n'));
  await driver.wait(until.elementLocated(By.css('a.button.button-success'))).click();
  // - Share modal and close it
  await driver.wait(until.elementLocated(By.css('input.filename'))).sendKeys('First string written to test!');
  driver.findElement(By.css('textarea.description')).sendKeys('Second string written to test!');
  await driver.findElement(By.css('button.button-success')).click();
  await driver.findElement(By.css('div.close-button')).click();
  await driver.wait(until.elementLocated(By.css('div.close-button')));
  await driver.findElement(By.css('.button-success.skip')).click();

  await driver.findElement(By.css('.close')).click();
  // // Share modal and skip to the next challenge
  await driver.wait(until.elementLocated(By.css('a.button.button-success'))).click();
  await driver.wait(until.elementLocated(By.css('input.filename'))).sendKeys('First string written to test!');
  await driver.findElement(By.css('textarea.description')).sendKeys('Second string written to test!');
  await driver.findElement(By.css('button.button-success')).click();
  await driver.findElement(By.css('div.close-button')).click();
  await driver.wait(until.elementLocated(By.css('div.close-button')));
  await driver.findElement(By.css('.button-success.skip')).click();
}

// List functions:

async function testCanvas(driver, challengeCommandsArray=challengePlayGround) {
  const canvas = driver.wait(until.elementLocated(By.css('canvas')));
  
  async function getCanvasValue(canvas) {
    return await driver.executeScript('return arguments[0].toDataURL()', canvas)
  }

  canvasHasChange = process.hrtime(canvasStart);

  // if (canvas.toDataURL() == document.getElementsByTagName('canvas').toDataURL())
  //   console.log('it\'s blank')
  // else
  //   console.log('It has change')
  // console.log('browserLaunchDuration =>', canvasHasChange[0], 's', canvasHasChange[1], 'ns');

  async function inputLine(line) {
    const initialValue = await getCanvasValue(canvas);
    await driver.findElement(By.css('.ace_text-input')).sendKeys(`${line}\n`);
    await driver.wait(async () => {
      const newValue = await getCanvasValue(canvas);
      return newValue !== initialValue;
    });
  }

  for (let i = 0; i < challengeCommandsArray.length; i++) {
    await inputLine(challengeCommandsArray[i])
  }
}

async function goToChallenges(driver, nameChallenge='Sunny Day') {
  await driver.findElement(By.css('a.logo')).click();
  await driver.findElement(By.linkText('Basic')).click()
  await driver.findElement(By.linkText(nameChallenge)).click()
  await driver.findElement(By.css('a.button.button-success')).click(); // <- measure time into challenge
}


async function goInPlayGround(driver) {
  await driver.findElement(By.css('a.logo')).click();
  await driver.findElement(By.css('a.world-cover')).click();
  await driver.findElement(By.linkText('Playground')).click()
  await driver.findElement(By.css('.ace_editor')).click();
}


  // how long the canvas need to update
  // await driver.findElement(By.css('canvas')).then((result, rejec) => {
  //   if (result) {
  //     console.log('result =>', result);
  //   } else {
  //     console.log('rejec =>', rejec);
  //   }
  // })

// let remoteWebdriver = new RemoteWebDriver("http://localhost:9515", DesiredCapabilities.chrome());
// driver.get("http://www.google.com");

let colors = ['yellow', 'orange', 'red', 'orangered', 'darkred',
    'green', 'aquamarine', 'lightblue', ' aqua', 'blue',
    'darkblue', 'purple', 'brown', 'lightbrown', 'white',
    'lightgray', 'dimgray'
];

function drawFigure(colorsArray, figure = 'circle') {
    let maxNumber = 200;
    let resultColor = ''
    let resultFigure = ''
    let array = [];

    for (let i = maxNumber; i >= 10; i = i - 10) {
        maxNumber = i
        let col = colorsArray[Math.floor(colorsArray.length * Math.random())]
        resultFigure = `color ${col}\n${figure} ${maxNumber}`
        array.push(resultFigure)
        console.log('resultFigure=>', `${figure} ${maxNumber}`)
    }
    console.log(`${resultColor}\n ${resultFigure}`)
    return array;
}


drawFigure(colors, 'circle')