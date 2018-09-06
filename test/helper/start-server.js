'use strict';

const path = require('path');
const getPort = require('get-port');
const server = require('../../lib/server');

const tmpDir = path.join('test', 'tmp');
const cleareTmpFiles = true;

module.exports = function startServer() {
  return getPort()
    .then((port) => server({ port, tmpDir, cleareTmpFiles }))
    .catch(error => console.error(error.stack));
};
