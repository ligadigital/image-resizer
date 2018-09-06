'use strict';

const path = require('path');
const isNone = require('./is-none');

const modes = ['crop', 'resize', 'resizefit', 'resizefitgray', 'shrink'];

function min(value, maxValue) {
  if (isNone(value)) {
    return null;
  }

  return Math.min(Number(value), maxValue);
}

module.exports = function extractParams(urlPath, resizedDir) {

  var imgPath = path.join(resizedDir, urlPath);

  var urlMatch = String(urlPath).match(/^\/([a-z]+)\/(\d*x\d*)\/(.*)/);
  if (!urlMatch) {
    throw new Error("'path' must match '/:mode/:size/:path'");
  }

  var mode = urlMatch[1];
  var size = urlMatch[2];
  var imgUrl = 'http://' + urlMatch[3];

  if (modes.indexOf(mode) < 0) {
    throw new Error( `'mode' needs to one of (${modes.join(', ')})`);
  }

  var sizeMatch = String(size).match(/^(\d*)x(\d*)$/);
  if (!sizeMatch) {
    throw new Error("'size' needs to be in form '100x100', '100x' or x100");
  }

  var width = min(sizeMatch[1], 5000);
  var height = min(sizeMatch[2], 5000);

  return {
    imgPath: imgPath,
    imgUrl: imgUrl,
    mode: mode,
    width: width,
    height: height
  };
};
