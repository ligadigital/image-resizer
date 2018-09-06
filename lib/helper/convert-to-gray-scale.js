'use strict';

const Promise = require('bluebird');
const gm = require('./gm');

module.exports = function convertToGrayScale(imagePath) {
  return new Promise((resolve, reject) => {
    gm(imagePath)
      .colorspace('Gray')
      .write(imagePath, (err) => err ? reject(err) : resolve());
  });
};
