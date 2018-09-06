'use strict';
/* global describe, before, after, it */

const startServer = require('./helper/start-server');
const startMockServer = require('./helper/start-mock-server');
const urlGenerator = require('./helper/url-generator');
const shouldReturnError = require('./helper/should-return-error');

var port;
var serverListener;

var mockPort;
var mockServerListener;

var urlGen;

describe('Shrink images', () => {
  before((done) => {
    startServer()
      .then((listener) => {
        port = listener.address().port;
        serverListener = listener;

        return startMockServer();
      })
      .then((listener) => {
        mockPort = listener.address().port;
        mockServerListener = listener;

        urlGen = urlGenerator({ port, mockPort });

        done();
      });
  });

  after(() => {
    serverListener.close();
    mockServerListener.close();
  });

  describe('GET /invalid - error responses', () => {
    it('should return an error for invalid mode', (done) => {
      shouldReturnError(urlGen('invalid', '10x10', 'red-100x100.jpg'), 400, done);
    });
  });
});
