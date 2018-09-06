'use strict';

const should = require('should');
const request = require('request');

const imageSize = require('image-size');

module.exports = function shouldHaveSize(urlObj, width, height, callback) {

  request.get(urlObj.url, (error, response, body) => {

    if (response.statusCode !== 200) {
      console.log(body);
    }

    should(error).not.be.ok();
    should(response.statusCode).be.exactly(200);

    var dimensions = imageSize(urlObj.path);

    should(dimensions.width).be.exactly(width);
    should(dimensions.height).be.exactly(height);

    callback();
  });
};
