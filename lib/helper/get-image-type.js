'use strict';

const Promise = require('bluebird');

const readChunk = require('read-chunk');
const imageType = require('image-type');

module.exports = function getImageType(imgPath) {
  return new Promise((resolve) => {
    var buffer = readChunk.sync(imgPath, 0, 12);
    resolve(imageType(buffer).ext.toUpperCase());
  });
};
