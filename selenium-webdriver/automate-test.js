const { Builder, By, Keys, until } = require('selenium-webdriver');

let myServer = 'http://172.16.254.110:3000'
let chrome = require('selenium-webdriver/chrome')
let chrome_options = new chrome.Options(); // you will need to setup Chroumium
chrome_options.setChromeBinaryPath('/usr/bin/chromium-browser');

let challengeSunnyDay = ['background blue', 'color yellow', 'circle 150'];
let challengeswissFlag = ['background red', 'stroke 66', 'stroke white', 'line 100', 'line -100', 'line 0, 100', 'line 0, -100'];
let challengePlayGround = ['background green', 'color yellow\ncircle 100'];

let browserLaunchStartTime, goIntoTheChallengeTime = process.hrtime();
let browserLaunchDuration = 0; // it will retutn an array => [seconds, nanoseconds]
let goIntoTheChallengeDuration = 0;
let dataCanvasperformance = [];




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
  await goInPlayGround(driver)
  await testCanvas(driver, drawFigure(colors));

  // // first challenge pack
  await goToChallenges(driver);
  await testChallengesPath(driver, challengeSunnyDay);
  driver.sleep(1000).then(function () {
    driver.quit();
  });
}

async function testChallengesPath(driver, challengeSolution = challengeSunnyDay) {
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

async function testCanvas(driver, challengeCommandsArray = challengePlayGround) {
  const canvasElem = driver.wait(until.elementLocated(By.css('canvas')));

  async function getCanvasValue(canvasElem) {
    return await driver.executeScript('return arguments[0].toDataURL()', canvasElem)
  }

  async function inputLine(line) {
    let canvasHasChange = 0;
    let canvasStart = null;
    const initialValue = await getCanvasValue(canvasElem);
    await driver.findElement(By.css('.ace_text-input')).sendKeys(`${line}\n`);
    console.time('draw')
     canvasStart = process.hrtime()
    await driver.wait(async () => {
      const newValue = await getCanvasValue(canvasElem);
      return newValue !== initialValue
    })
    console.timeEnd('draw')
    canvasHasChange = process.hrtime(canvasStart);
    console.log('canvasHasChange=>', canvasHasChange[0], 's ', canvasHasChange[1], 'ns')
    dataCanvasperformance.push(canvasHasChange[1])
    // query canvas and compare with expected
    await driver.wait(async () => {
      const newValue = await getCanvasValue(canvasElem);
      return newValue !== initialValue;
    });
  }

  for (let i = 0; i < challengeCommandsArray.length; i++) {
    await inputLine(challengeCommandsArray[i])
  }
  console.log('dataCanvasperformance=>', dataCanvasperformance)
  let sumData = dataCanvasperformance.reduce((acc,val)=> {
    return acc+val;
  },0)
  console.log('challengeCommandsArray.length=>', challengeCommandsArray.length)
  console.log('sumData =>',sumData/challengeCommandsArray.length);
}


async function goToChallenges(driver, nameChallenge = 'Sunny Day') {
  await driver.findElement(By.css('a.logo')).click();
  await driver.findElement(By.linkText('Basic')).click()
  await driver.findElement(By.linkText(nameChallenge)).click()
  await driver.findElement(By.css('a.button.button-success')).click(); // <- measure time into challenge
}


async function goInPlayGround(driver) {
  await driver.findElement(By.css('a.logo')).click();
  await driver.findElement(By.css('a.world-cover')).click();
  await driver.findElement(By.linkText('Playground')).click()
  await driver.wait(until.elementLocated(By.css('.ace_editor'))).click();
}

let colors = ['yellow', 'orange', 'red', 'orangered', 'darkred',
  'green', 'aquamarine', 'lightblue', ' aqua', 'blue',
  'darkblue', 'purple', 'brown', 'lightbrown', 'white',
  'lightgray', 'dimgray'
];

function randomColor(colorsArray) {
  return colorsArray[Math.floor(colorsArray.length * Math.random())]
}

function drawFigure(colorsArray, figure = 'circle') {
  let maxNumber = 200;
  let resultDraw = ''
  let array = [`background ${randomColor(colorsArray)}`];

  for (let i = maxNumber; i >= 10; i = i - 10) {
    maxNumber = i
    let col = randomColor(colorsArray)
    resultDraw = `color ${col}\n${figure} ${maxNumber}`
    array.push(resultDraw)
  }
  return array;
}

drawFigure(colors, 'circle')