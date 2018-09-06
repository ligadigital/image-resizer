'use strict';

const mime = require('mime');
const fs = require('fs');
const serveError = require('./serve-error');

module.exports = function serveFile(response, filePath) {

  fs.readFile(filePath, function(err, img) {
    if (err) { return serveError(response, err); }

    response.writeHead(200, { 'Content-Type': mime.getType(filePath) });
    response.end(img, 'binary');
  });
};
