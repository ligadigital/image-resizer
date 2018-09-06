'use strict';

const gifsicle = require('./resizer/gifsicle');
const imagemagick = require('./resizer/imagemagick');
const getImageType = require('./helper/get-image-type');
const validateSize = require('./helper/validate-size');

function resize(mode, imgPath, width, height) {

  return getImageType(imgPath)
    .then((imageType) => {

      var resizer = (imageType === 'GIF') ? gifsicle : imagemagick;

      if (typeof resizer[mode] !== 'function') {
        throw new Error('Invalid mode');
      }

      if (!validateSize(mode, width, height)) {
        throw new Error('Invalid input');
      }

      return resizer[mode](imgPath, width, height);
    });
}

module.exports = resize;
