'use strict';
/* global describe, before, after, it */

const startServer = require('./helper/start-server');
const startMockServer = require('./helper/start-mock-server');
const urlGenerator = require('./helper/url-generator');
const shouldHaveSize = require('./helper/should-have-size');
const shouldBeGray = require('./helper/should-be-gray');
const shouldReturnError = require('./helper/should-return-error');

var port;
var serverListener;

var mockPort;
var mockServerListener;

var urlGen;

describe('Resize fit (gray) images', () => {
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

  describe('GET /resizefitgray', () => {
    it('should resizefitgray jpg (100x100) to 10x10', (done) => {
      var urlObj = urlGen('resizefitgray', '10x10', 'red-100x100.jpg');
      shouldHaveSize(urlObj, 10, 10, () => shouldBeGray(urlObj, done));
    });

    it('should resizefitgray png (100x100) to 10x10', (done) => {
      var urlObj = urlGen('resizefitgray', '10x10', 'red-100x100.png');
      shouldHaveSize(urlObj, 10, 10, () => shouldBeGray(urlObj, done));
    });

    it('should resizefitgray gif (100x100) to 10x10', (done) => {
      var urlObj = urlGen('resizefitgray', '10x10', 'red-100x100.gif');
      shouldHaveSize(urlObj, 10, 10, () => shouldBeGray(urlObj, done));
    });

    it('should resizefitgray gif (100x100) to 10x10', (done) => {
      var urlObj = urlGen('resizefitgray', '10x10', 'red-100x100-gif.jpg');
      shouldHaveSize(urlObj, 10, 10, () => shouldBeGray(urlObj, done));
    });

    it('should resizefitgray jpg (100x100) to 10x50', (done) => {
      var urlObj = urlGen('resizefitgray', '10x50', 'red-100x100.jpg');
      shouldHaveSize(urlObj, 10, 50, () => shouldBeGray(urlObj, done));
    });

    it('should resizefitgray png (100x100) to 10x50', (done) => {
      var urlObj = urlGen('resizefitgray', '10x50', 'red-100x100.png');
      shouldHaveSize(urlObj, 10, 50, () => shouldBeGray(urlObj, done));
    });

    it('should resizefitgray gif (100x100) to 10x50', (done) => {
      var urlObj = urlGen('resizefitgray', '10x50', 'red-100x100.gif');
      shouldHaveSize(urlObj, 10, 50, () => shouldBeGray(urlObj, done));
    });

    it('should resizefitgray gif (100x100) to 10x50', (done) => {
      var urlObj = urlGen('resizefitgray', '10x50', 'red-100x100-gif.jpg');
      shouldHaveSize(urlObj, 10, 50, () => shouldBeGray(urlObj, done));
    });

    it('should resizefitgray not existing image to 10x10', (done) => {
      shouldHaveSize(urlGen('resizefitgray', '10x10', 'does-not-exist.jpg', true), 10, 10, done);
    });
  });

  describe('GET /resizefitgray - error responses', () => {
    it('should return an error for size x10', (done) => {
      shouldReturnError(urlGen('resizefitgray', 'x10', 'red-100x100.jpg'), 400, done);
    });

    it('should return an error for size 10x', (done) => {
      shouldReturnError(urlGen('resizefitgray', '10x', 'red-100x100.jpg'), 400, done);
    });
  });
});
