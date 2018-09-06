'use strict';
/* global describe */

const path = require('path');
const jshint = require('mocha-jshint');

const baseDir = path.join(__dirname, '..');

describe('Lint', () => {
  jshint({
    paths: [
      path.join(baseDir, 'lib'),
      path.join(baseDir, 'test'),
      path.join(baseDir, 'bin/image-resizer.js')
    ]
 });
});
