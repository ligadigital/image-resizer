'use strict';

const getPort = require('get-port');
const mockServer = require('../mock/server');

module.exports = function startServer() {
  return getPort()
    .then((port) => mockServer({ port }))
    .catch(error => console.error(error.stack));
};
