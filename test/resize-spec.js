'use strict';
/* global describe, before, after, it */

const startServer = require('./helper/start-server');
const startMockServer = require('./helper/start-mock-server');
const urlGenerator = require('./helper/url-generator');
const shouldHaveSize = require('./helper/should-have-size');

var port;
var serverListener;

var mockPort;
var mockServerListener;

var urlGen;

describe('Resize images', () => {
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

  describe('GET /resize', () => {
    it('should resize jpg (100x100) to 10x10', (done) => {
      shouldHaveSize(urlGen('resize', '10x10', 'red-100x100.jpg'), 10, 10, done);
    });

    it('should resize jpg (100x100) to x10', (done) => {
      shouldHaveSize(urlGen('resize', 'x10', 'red-100x100.jpg'), 10, 10, done);
    });

    it('should resize jpg (100x100) to 10x', (done) => {
      shouldHaveSize(urlGen('resize', '10x', 'red-100x100.jpg'), 10, 10, done);
    });

    it('should resize png (100x100) to 10x10', (done) => {
      shouldHaveSize(urlGen('resize', '10x10', 'red-100x100.png'), 10, 10, done);
    });

    it('should resize png (100x100) to x10', (done) => {
      shouldHaveSize(urlGen('resize', 'x10', 'red-100x100.png'), 10, 10, done);
    });

    it('should resize png (100x100) to 10x', (done) => {
      shouldHaveSize(urlGen('resize', '10x', 'red-100x100.png'), 10, 10, done);
    });

    it('should resize gif (100x100) to 10x10', (done) => {
      shouldHaveSize(urlGen('resize', '10x10', 'red-100x100.gif'), 10, 10, done);
    });

    it('should resize gif (100x100) to x10', (done) => {
      shouldHaveSize(urlGen('resize', 'x10', 'red-100x100.gif'), 10, 10, done);
    });

    it('should resize gif (100x100) to 10x', (done) => {
      shouldHaveSize(urlGen('resize', '10x', 'red-100x100.gif'), 10, 10, done);
    });

    it('should resize gif (100x100) to 10x10', (done) => {
      shouldHaveSize(urlGen('resize', '10x10', 'red-100x100-gif.jpg'), 10, 10, done);
    });

    it('should resize jpg (100x100) to 10x10', (done) => {
      shouldHaveSize(urlGen('resize', '10x50', 'red-100x100.jpg'), 10, 10, done);
    });

    it('should resize png (100x100) to 10x10', (done) => {
      shouldHaveSize(urlGen('resize', '10x50', 'red-100x100.png'), 10, 10, done);
    });

    it('should resize gif (100x100) to 10x10', (done) => {
      shouldHaveSize(urlGen('resize', '10x50', 'red-100x100.gif'), 10, 10, done);
    });

    it('should resize gif (100x100) to x10', (done) => {
      shouldHaveSize(urlGen('resize', 'x10', 'red-100x100.gif'), 10, 10, done);
    });

    it('should resize gif (100x100) to 10x', (done) => {
      shouldHaveSize(urlGen('resize', '10x', 'red-100x100.gif'), 10, 10, done);
    });

    it('should resize gif with .jpg extension (100x100) to 10x10', (done) => {
      shouldHaveSize(urlGen('resize', '10x50', 'red-100x100-gif.jpg'), 10, 10, done);
    });

    it('should resize gif with .jpg extension (100x100) to x10', (done) => {
      shouldHaveSize(urlGen('resize', 'x10', 'red-100x100-gif.jpg'), 10, 10, done);
    });

    it('should resize gif with .jpg extension (100x100) to 10x', (done) => {
      shouldHaveSize(urlGen('resize', '10x', 'red-100x100-gif.jpg'), 10, 10, done);
    });

    it('should not existing image to 10x50', (done) => {
      shouldHaveSize(urlGen('resize', '10x50', 'does-not-exist.jpg', true), 10, 6, done);
    });
  });
});
