'use strict';
/* global describe, before, after, it */

const startServer = require('./helper/start-server');
const startMockServer = require('./helper/start-mock-server');
const urlGenerator = require('./helper/url-generator');
const shouldHaveSize = require('./helper/should-have-size');
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

  describe('GET /shrink', () => {
    it('should shrink jpg (100x100) to 10x10', (done) => {
      shouldHaveSize(urlGen('shrink', '10x10', 'red-100x100.jpg'), 10, 10, done);
    });

    it('should shrink png (100x100) to 10x10', (done) => {
      shouldHaveSize(urlGen('shrink', '10x10', 'red-100x100.png'), 10, 10, done);
    });

    it('should shrink gif (100x100) to 10x10', (done) => {
      shouldHaveSize(urlGen('shrink', '10x10', 'red-100x100.gif'), 10, 10, done);
    });

    it('should shrink jpg (100x100) to 10x50', (done) => {
      shouldHaveSize(urlGen('shrink', '10x50', 'red-100x100.jpg'), 10, 10, done);
    });

    it('should shrink jpg (100x100) to 10x50', (done) => {
      shouldHaveSize(urlGen('shrink', '10x50', 'red-100x100-gif.jpg'), 10, 10, done);
    });

    it('should shrink png (100x100) to 10x50', (done) => {
      shouldHaveSize(urlGen('shrink', '10x50', 'red-100x100.png'), 10, 10, done);
    });

    it('should shrink gif (100x100) to 10x50', (done) => {
      shouldHaveSize(urlGen('shrink', '10x50', 'red-100x100.gif'), 10, 10, done);
    });

    it('should shrink jpg (100x100) to 200x200', (done) => {
      shouldHaveSize(urlGen('shrink', '200x200', 'red-100x100.jpg'), 100, 100, done);
    });

    it('should shrink png (100x100) to 200x200', (done) => {
      shouldHaveSize(urlGen('shrink', '200x200', 'red-100x100.png'), 100, 100, done);
    });

    it('should shrink gif (100x100) to 200x200', (done) => {
      shouldHaveSize(urlGen('shrink', '200x200', 'red-100x100.gif'), 100, 100, done);
    });

    it('should shrink gif (100x100) to 200x200', (done) => {
      shouldHaveSize(urlGen('shrink', '200x200', 'red-100x100-gif.jpg'), 100, 100, done);
    });

    it('should not existing image to 10x50', (done) => {
      shouldHaveSize(urlGen('shrink', '10x50', 'does-not-exist.jpg', true), 10, 6, done);
    });
  });

  describe('GET /shrink - error responses', () => {
    it('should return an error for size x10', (done) => {
      shouldReturnError(urlGen('shrink', 'x10', 'red-100x100.jpg'), 400, done);
    });

    it('should return an error for size 10x', (done) => {
      shouldReturnError(urlGen('shrink', '10x', 'red-100x100.jpg'), 400, done);
    });
  });
});
