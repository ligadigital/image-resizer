'use strict';

const execFile = require('child_process').execFile;
const gifsicleBin = require('gifsicle');
const Promise = require('bluebird');

const caculateSize = require('../helper/caculate-size');

function gifsicle(args) {
  return new Promise((resolve, reject) => {
    execFile(gifsicleBin, args, { maxBuffer: 1024 * 500 }, function (err, stdout, stderr) {
      if (err) { return reject(err); }
      resolve({ stdout, stderr });
    });
  });
}

function gifsicleExec(command, imagePath, size) {
  return gifsicle([
    `--${command}`, size,
    '--colors', '256',
    imagePath,
    '-o', imagePath
  ]);
}

function scaleCanvas(imagePath, size, fit) {

  let pos = {
    x: (fit.width - size.width) / 2,
    y: (fit.height - size.height) / 2
  };

  return gifsicle([
    '--logical-screen', `${fit.width}x${fit.height}`,
    '--position', `${pos.x},${pos.y}`,
    '--colors', '256',
    imagePath,
    '-o', imagePath
  ]);
}

function convertToGray(imagePath) {
  return gifsicle([
    '--use-colormap', 'gray',
    '--colors', '256',
    imagePath,
    '-o', imagePath
  ]);
}


function size(imagePath) {

  return gifsicle([ '--size-info', imagePath ])
    .then((out) => {
      var m = out.stdout.match(/logical screen (\d+)x(\d+)/);

      var width = Number(m[1]);
      var height = Number(m[2]);
      var ratio = width / height;

      return { width, height, ratio };
    });
}

function crop(imagePath, x, y, width, height) {

  x = Math.round(x);
  y = Math.round(y);
  width = Math.round(width);
  height = Math.round(height);

  return gifsicleExec('crop', imagePath, `${x},${y}+${width}x${height}`);
}

function resize(imagePath, width, height) {
  return gifsicleExec('resize', imagePath, `${width}x${height}`);
}

function resizeFit(imagePath, width, height) {
  return gifsicleExec('resize-fit', imagePath, `${width}x${height}`);
}

function cropFit(imagePath, width, height) {
  return size(imagePath)
    .then(current => {

      var target = { width, height, ratio: width / height };

      let cropX = 0;
      let cropY = 0;

      let cropWidth;
      let cropHeight;

      if (current.ratio === target.ratio) {
        return;
      }

      cropHeight = Math.min(target.height, current.height);
      cropWidth = cropHeight * target.ratio;

      if (cropWidth > current.width) {
        cropWidth = Math.min(target.width, current.width);
        cropHeight = cropWidth / target.ratio;
      }

      if (cropWidth < current.width) {
        cropX = (current.width - cropWidth) / 2;
      } else if (cropHeight < current.height) {
        cropY = (current.height - cropHeight) / 2;
      }

      return crop(imagePath, cropX, cropY, cropWidth, cropHeight);
    });
}

function shrinkMode(imagePath, width, height) {
  return resizeFit(imagePath, width, height);
}

function resizeMode(imagePath, width, height) {
  return size(imagePath)
    .then(current => {
      var dim = caculateSize(width, height, current.width, current.height);
      return resize(imagePath, dim.width, dim.height);
    });
}

function cropMode(imagePath, width, height) {
  return cropFit(imagePath, width, height)
    .then(() => resize(imagePath, width, height));
}

function resizefitMode(imagePath, width, height) {
  return resizeMode(imagePath, width, height)
    .then(() => size(imagePath))
    .then(current => {
      var dim = caculateSize(width, height, current.width, current.height);
      return scaleCanvas(imagePath, dim, { width, height });
    });
}

function resizefitgrayMode(imagePath, width, height) {

  return resizefitMode(imagePath, width, height)
    .then(() => convertToGray(imagePath));
}

module.exports = {
  shrink: shrinkMode,
  resize: resizeMode,
  crop: cropMode,
  resizefit: resizefitMode,
  resizefitgray: resizefitgrayMode
};
