'use strict';

const Promise = require('bluebird');
const im = require('imagemagick');

const imConvert = Promise.promisify(im.convert);

module.exports = function isGray(urlObj, callback) {
  return imConvert([urlObj.path, '-colorspace', 'HSL', '-channel', 'g', '-separate', '+channel', '-format', '"%[fx:mean]"', 'info:'])
    .then((result) => callback(Number(result) < 0.1));
};
