'use strict';

const imageSize = require('image-size');
const Promise = require('bluebird');

module.exports = function getImageSize(imPath) {
  return new Promise((resolve, reject) => {

    imageSize(imPath, function (err, dimensions) {
      if (err) { return reject(err); }
      resolve(dimensions);
    });
  });
};
