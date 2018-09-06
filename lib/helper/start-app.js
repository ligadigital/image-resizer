'use strict';

const Promise = require('bluebird');

module.exports = function startApp(app, port) {
  return new Promise((resolve, reject) => {
    const listener = app.listen(port, (error) => {
      if (error) { return reject(error); }
      resolve(listener);
    });
  });
};
