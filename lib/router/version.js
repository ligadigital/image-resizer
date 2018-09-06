'use strict';

const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();

const appDir = path.join(__dirname, '..', '..');

router.get('/', (request, response) => {
  fs.access(path.join(appDir, 'version.json'), fs.F_OK, (err) => {
    const pkg = require(path.join(appDir, err ? 'package.json' : 'version.json'));
    response.send({
      name: pkg.name,
      version: pkg.version
    }).end();
  });
});

module.exports = router;
