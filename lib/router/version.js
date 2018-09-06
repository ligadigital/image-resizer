'use strict';

const fs = require('fs');
const path = require('path');
const express = require('express');

const appDir = path.join(__dirname, '..', '..');

function newRouter(options) {
  const router = express.Router();

  router.get('/', (request, response) => version(options, (data) => response.send(data).end()));

  return router;
}

function version(options, cb) {

  if (options && options.version) {
    return cb(options.version);
  }

  fs.access(path.join(appDir, 'version.json'), fs.F_OK, (err) => {
    if (err) {
      // No version.json file, use info from package.json
      const pkg = require(path.join(appDir, 'package.json'));
      cb({ name: pkg.name, version: pkg.version });
    } else {
      cb(require(path.join(appDir, 'version.json')));
    }
  });
}

module.exports = newRouter;
