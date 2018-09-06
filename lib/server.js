'use strict';

const path = require('path');
const fs = require('fs');

const Promise = require('bluebird');
const express = require('express');
const rimraf = require('rimraf');

const resize = require('./resize');
const pushToS3 = require('./helper/push-to-s3');
const extractParams = require('./helper/extract-params');
const serveFile = require('./helper/serve-file');
const serveError = require('./helper/serve-error');
const download = require('./helper/download');
const copyFile = require('./helper/copy-file');
const ensureDirExists = require('./helper/ensure-dir-exists');
const startApp = require('./helper/start-app');

const routerVersion = require('./router/version');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

module.exports = function server(options) {

  options = options || {};

  const port = options.port;
  const resizedDirName = options.tmpDir || 'resized';
  const clearTmpFiles = options.clearTmpFiles === true;

  // Config
  var resizedDir = path.join(__dirname, '..', resizedDirName);
  var s3Url = process.env.S3_URL;
  var s3Path = process.env.S3_PATH;

  var app = express();

  if (clearTmpFiles) {
    app.use(function(req, res, next) {
      rimraf(resizedDir, () => fs.mkdir(resizedDir, () => next()));
    });
  }

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  if (!s3Url) {
    app.use(express.static(resizedDir));
  }

  app.use('/version', routerVersion);

  app.get('/*', function(request, response) {

    var urlPath = request.url;

    var params;
    try {
      params = extractParams(urlPath, resizedDir);
    } catch(err) {
      return serveError(response, err);
    }

    var filePath = path.join(resizedDir, request.path);

    download(params.imgUrl, params.imgPath)
      .then(() => resize(params.mode, params.imgPath, params.width, params.height))
      .then(() => {
        if (s3Url) { return pushToS3(params.imgPath, urlPath); }
        return Promise.resolve();
      })
      .then(() => {
        if (s3Url) {
          response.redirect(s3Url + '/' + s3Path + request.path);
          fs.unlink(filePath);
        } else {
          serveFile(response, filePath);
        }
      })
      .catch((error) => {
        if (error.name !== 'UnreachableError') {
          throw error;
        }

        let notfoundPath = path.join(__dirname, '..', 'img', 'notfound.png');
        let imgPath = path.join(resizedDir, 'notfound', `${params.mode}-${params.width}x${params.height}.png`);

        return copyFile(notfoundPath, imgPath)
          .then(() => resize(params.mode, imgPath, params.width, params.height))
          .then(() => serveFile(response, imgPath));
      })
      .catch((error) => {
        // console.error(error.stack || error)
        serveError(response, error);
      });
  });

  return ensureDirExists(path.join(__dirname, '..', 'tmp'))
    .then(() => startApp(app, port));
};
