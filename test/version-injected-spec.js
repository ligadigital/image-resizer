'use strict';
/* global describe, before, after, it */

const should = require('should');
const request = require('request');

const startServer = require('./helper/start-server');

var port;
var serverListener;

const version = { version: new Date().getTime() };

describe('Version resource (injected)', () => {

  before(() => startServer({ version }).then((listener) => {
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
        should(body).have.property('version', version.version);

        done();
      });
    });
  });
});
