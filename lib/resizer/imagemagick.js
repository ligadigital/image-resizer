'use strict';

const gmDo = require('../helper/gm-helper').gmDo;
const gmExec = require('../helper/gm-helper').gmExec;
const gmComposite = require('../helper/gm-helper').gmComposite;
const getImageType = require('../helper/get-image-type');
const getImageSize = require('../helper/get-image-size');
const caculateSize = require('../helper/caculate-size');
const convertToGrayScale = require('../helper/convert-to-gray-scale');
const getTmpFilePath = require('../helper/get-tmp-file-path');
const unlink = require('../helper/file-helper').unlink;

function resizeFit(imagePath, mWidth, mHeight, bgColor) {

  let tmpImg;

  return getImageType(imagePath)
    .then((type) => {
      tmpImg = getTmpFilePath(type);
      bgColor = bgColor || (type === 'PNG' ? 'transparent' : 'white');
      
      return getImageSize(imagePath);
    })
    .then((size) => {
      let dimensions = caculateSize(mWidth, mHeight, size.width, size.height);
      
      return gmExec('resize', imagePath, dimensions.width, dimensions.height, null, tmpImg);
    })
    .then(() => gmComposite(tmpImg, bgColor, mWidth, mHeight, null, imagePath))
    .then((response) => unlink(tmpImg).then(() => response));
}

module.exports.shrink = function(imagePath, width, height) {
  return gmExec('resize', imagePath, width, height, '\>');
};

module.exports.resize = function(imagePath, width, height) {
  return gmExec('resize', imagePath, width, height);
};

module.exports.crop = function(imagePath, width, height) {
  return gmDo(imagePath, gm => {
    return gm
      .gravity('Center')
      .resize(width, height, '^')
      .crop(width, height)
      .noProfile();
  });
};

module.exports.resizefit = function(imagePath, width, height) {
  return resizeFit(imagePath, width, height);
};

module.exports.resizefitgray = function(imagePath, width, height) {
  return resizeFit(imagePath, width, height)
    .then(() => convertToGrayScale(imagePath));
};
