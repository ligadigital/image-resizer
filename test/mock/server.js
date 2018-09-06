'use strict';

const path = require('path');

const Promise = require('bluebird');
const express = require('express');

module.exports = function server(options) {

  options = options || {};
  const port = options.port;

  var app = express();

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  app.use(express.static(path.join(__dirname, 'static')));


  return new Promise((resolve, reject) => {

    const listener = app.listen(port, (error) => {
      if (error) { return reject(error); }
      resolve(listener);
    });
  });
};
