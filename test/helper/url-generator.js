'use strict';

const path = require('path');

module.exports = function urlGeneratorerator(option) {
  return function(mode, size, file, notFound) {

    notFound = notFound === true;

    var urlPath = `${mode}/${size}/localhost:${option.mockPort}/${file}`;
    var relPath = notFound ? `notfound/${mode}-${size}.png` : urlPath;

    return {
      url: `http://localhost:${option.port}/${urlPath}`,
      path: path.join(__dirname, '..', 'tmp', relPath)
    };
  };
};
