const path = require('path');

/* console.log('process: ', process);
console.log('process.mainModule: ', process.mainModule);
console.log('process.mainModule.filename: ', process.mainModule.filename); */

module.exports = path.dirname(process.mainModule.filename);
