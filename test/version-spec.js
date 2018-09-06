'use strict';
/* global describe, before, after, it */

const should = require('should');
const request = require('request');

const startServer = require('./helper/start-server');
const pkg = require('../package.json');

var port;
var serverListener;

describe('Version resource', () => {
  before(() => startServer().then((listener) => {
    port = listener.address().port;
    serverListener = listener;
  }));

  after(() => serverListener.close());

  describe('GET /version', () => {

    it('should should report version', (done) => {

      request.get(`http://localhost:${port}/version`, (error, response) => {

        const body = JSON.parse(response.body);

        should(error).not.be.ok();
        should(response.statusCode).be.exactly(200);
        should(body).have.property('version', pkg.version);

        done();
      });
    });
  });
});
