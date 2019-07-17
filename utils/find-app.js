const fg = require('fast-glob');
const path = require('path');
fg('./out/*.appxbundle', { cwd: path.join(__dirname, '../') })
    .then((results) => {
        console.log(results[0]);
    });
