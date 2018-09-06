'use strict';

const fs = require('fs');
const Promise = require('bluebird');
const log = require('./log');

function unlink(filePath) {
  return new Promise((resolve) => {
    fs.unlink(filePath, (error) => {
      if (error) { log(error); }
      resolve();
    });
  });
}

module.exports = { unlink };
