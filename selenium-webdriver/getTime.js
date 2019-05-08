let colors = require('colors'); 
let startTime = process.hrtime();

module.exports = {
  start : (el) => {
    startTime = process.hrtime(); 
    return startTime
  },
  end : (el) => {
    let endtime = process.hrtime(startTime);
    console.log(`endtime ${el} =>`.cyan, `${endtime[0]} s ${endtime[1]} ns`.yellow)
    return endtime;
  }
}
