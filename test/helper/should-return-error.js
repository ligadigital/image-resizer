'use strict';

const should = require('should');
const request = require('request');

module.exports = function shouldReturnError(urlObj, errorCode, callback) {
  request.get(urlObj.url, (error, response) => {
    should(response.statusCode).be.exactly(errorCode);
    callback();
  });
};
