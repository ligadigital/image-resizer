'use strict';

const fs = require('fs');
const Promise = require('bluebird');
const request = require('request');
const createDir = require('./create-dir');
const fsExists = require('./fs-exists');
const UnreachableError = require('../error/unreachable');

const requestHead = Promise.promisify(request.head);


function requestUrl(url, path) {
  return new Promise((resolve, reject) => {
    request(url)
      .pipe(fs.createWriteStream(path))
      .on('close', function() { resolve(); })
      .on('error', function(err) { reject(err); });
  });
}

module.exports = function download(url, path) {

  return fsExists(path)
    .then(() => createDir(path))
    .then(() => requestHead(url))
    .then((res) => {
      if (res.statusCode !== 200) {
        throw new UnreachableError();
      }

      return requestUrl(url, path);
    });
};
