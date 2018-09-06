'use strict';

const path = require('path');
const getPort = require('get-port');
const server = require('../../lib/server');

const tmpDir = path.join('test', 'tmp');
const clearTmpFiles = true;

module.exports = function startServer(options) {

  options = options || {};

  options.tmpDir = tmpDir;
  options.clearTmpFiles = clearTmpFiles;

  return getPort()
    .then((port) => {
      options.port = port;
      return server(options);
    })
    .catch(error => console.error(error.stack));
};
