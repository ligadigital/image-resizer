'use strict';

const fs = require('fs');
const Promise = require('bluebird');

const createDir = require('./create-dir');

module.exports = function copyFile(sourcePath, targetPath) {

  return createDir(targetPath)
    .then(() => new Promise((resolve, reject) => {
      fs.createReadStream(sourcePath)
        .pipe(fs.createWriteStream(targetPath))
        .on('close', function() { resolve(); })
        .on('error', function(err) { reject(err); });
    }));
};
