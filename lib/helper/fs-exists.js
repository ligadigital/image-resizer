'use strict';

const fs = require('fs');
const Promise = require('bluebird');

module.exports = function fsExists(path) {
  return new Promise((resolve) => {
    if (fs.access) {
      fs.access(path, fs.R_OK | fs.W_OK, function (err) {
        if (err) { return resolve(false); }
        resolve(true);
      });
    } else {
      fs.exists(path, (err, exists) => {
        if (err || !exists) { return resolve(false); }
        resolve(true);
      });
    }
  });
};
