'use strict';

const Promise = require('bluebird');
const gm = require('./gm');

function gmDo(imagePath, outPath, callback) {

  if (arguments.length === 2) {
    callback = outPath;
    outPath = imagePath;
  }

  return new Promise((resolve, reject) => {
    callback(gm(imagePath))
      .write(outPath, (err) => err ? reject(err) : resolve());
  });
}

function gmExec(mode, imagePath, width, height, flag, outPath) {

  outPath = outPath || imagePath;
  flag = flag || undefined;

  return gmDo(imagePath, outPath, gm => {
    return gm
      .gravity('Center')
      [mode](width, height, flag)
      .noProfile();
  });
}

function gmComposite(imagePath, backgroundColor, width, height, flag, outPath) {

  outPath = outPath || imagePath;
  flag = flag || undefined;
  
  return new Promise((resolve, reject) => {
    gm(width, height, backgroundColor)
      .write(outPath, function (err) {
        if (err) { return reject(err); }
        
        gm(outPath)
          .composite(imagePath)
          .gravity('Center')
          .noProfile()
          .write(outPath, (err) => err ? reject(err) : resolve());
      });
  });
}

module.exports = { gmDo, gmExec, gmComposite };