const fg = require('fast-glob');
const path = require('path');
console.log('find-app.js => 1')
fg('./out/*.appxbundle', { cwd: path.join(__dirname, '../') })
    .then((results) => {
        console.log(results[0]);
    });
