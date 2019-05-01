let colors = ['yellow', 'orange', 'red', 'orangered', 'darkred',
  'green', 'aquamarine', 'lightblue', ' aqua', 'blue',
  'darkblue', 'purple', 'brown', 'lightbrown', 'white',
  'lightgray', 'dimgray'
];

function randomColor(colorsArray) {
  return colorsArray[Math.floor(colorsArray.length * Math.random())]
}

function drawFigure(colorsArray = colors, figure = 'circle') {
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

module.exports = {
  drawFigure: drawFigure
}