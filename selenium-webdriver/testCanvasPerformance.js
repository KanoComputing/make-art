const { By, until } = require('selenium-webdriver');
const getTime = require('./getTime');

let challengePlayGround = ['background green', 'color yellow\ncircle 100'];
let dataCanvasperformance = [];

async function testCanvas(driver, challengeCommandsArray = challengePlayGround) {
  const canvasElem = driver.wait(until.elementLocated(By.css('canvas')));

  async function getCanvasValue(canvasElem) {
    return await driver.executeScript('return arguments[0].toDataURL()', canvasElem)
  }

  async function inputLine(line) {
    const initialValue = await getCanvasValue(canvasElem);
    await driver.wait(until.elementLocated(By.css('.ace_text-input'))).sendKeys(`${line}\n`);
    getTime.start('canvasStart')
    await driver.wait(async () => {
      const newValue = await getCanvasValue(canvasElem);
      return newValue !== initialValue
    })

    let duration = getTime.end('canvasHasChange');
    dataCanvasperformance.push(duration)
    // query canvas and compare with expected
    await driver.wait(async () => {
      const newValue = await getCanvasValue(canvasElem);
      return newValue !== initialValue;
    });
  }

  for (let i = 0; i < challengeCommandsArray.length; i++) {
    await inputLine(challengeCommandsArray[i])
  }
  // console.log('dataCanvasperformance=>', dataCanvasperformance)
  // let sumData = dataCanvasperformance[0].reduce((acc, val) => {
  //   return acc + val;
  // }, 0)
  // console.log('challengeCommandsArray.length=>', `${challengeCommandsArray.length}`.yellow)
  // console.log('sumData =>', sumData, 'mean =>', `${sumData / challengeCommandsArray.length}`.yellow);
}

module.exports = {
  testCanvas: testCanvas
}
