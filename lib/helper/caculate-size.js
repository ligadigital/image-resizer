'use strict';

const isNone = require('./is-none');

// Calculate on which dimension will be resize
module.exports = function caculateSize(targetWidth, targetHeight, originalWidth, originalHeight) {

  if (isNone(targetWidth)) {
    targetWidth = targetHeight * (originalWidth / originalHeight);
  } else if (isNone(targetHeight)) {
    targetHeight = targetWidth / (originalWidth / originalHeight);
  }

  var ratioX = parseFloat(targetWidth / originalWidth);
  var ratioY = parseFloat(targetHeight / originalHeight);
  var ratio = Math.min(ratioX, ratioY);

  var width = Math.round(originalWidth * ratio);
  var height = Math.round(originalHeight * ratio);

  return { width: width, height: height };
};
