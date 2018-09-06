'use strict';

const Promise = require('bluebird');
const mkdirp = Promise.promisify(require('mkdirp'));

const fsExists = require('./fs-exists');

module.exports = function createDir(filePath) {

  var dirPath = filePath.replace(/\/[^\/]*$/, '');
  return fsExists(dirPath)
    .then((exists) => {
      return exists || mkdirp(dirPath);
    });

};
