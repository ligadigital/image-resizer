'use strict';

const fs = require('fs');
const Promise = require('bluebird');

module.exports = function ensureDirExists(dirPath) {
  return new Promise((resolve, reject) => {
    fs.open(dirPath, 'r', (err) => {
      if (err && err.code === 'ENOENT') {
        return fs.mkdir(dirPath, (error) => {
          if (error) { return reject(error); }
          resolve();
        });
      }

      resolve();
    });
  });
};
