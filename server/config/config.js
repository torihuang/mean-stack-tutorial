// Normalize path by starting from the current directory
var path = require('path');
var rootPath = path.normalize(__dirname + "/../../");

module.exports = {
  development: {
    db: 'mongodb://localhost/multivision',
    rootPath: rootPath,
    port: process.env.PORT || 8080
  },
  production: {
    db: 'mongodb://torihuang:multivision@ds025603.mlab.com:25603/multivision',
    rootPath: rootPath,
    port: process.env.PORT || 80
  }
}