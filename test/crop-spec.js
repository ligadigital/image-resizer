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

describe('Crop images', () => {
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

  describe('GET /crop', () => {
    it('should crop jpg to 10x10', (done) => {
      shouldHaveSize(urlGen('crop', '10x10', 'red-100x100.jpg'), 10, 10, done);
    });

    it('should crop png to 10x10', (done) => {
      shouldHaveSize(urlGen('crop', '10x10', 'red-100x100.png'), 10, 10, done);
    });

    it('should crop gif to 10x10', (done) => {
      shouldHaveSize(urlGen('crop', '10x10', 'red-100x100.gif'), 10, 10, done);
    });

    it('should crop jpg to 10x50', (done) => {
      shouldHaveSize(urlGen('crop', '10x50', 'red-100x100.jpg'), 10, 50, done);
    });

    it('should crop png to 10x50', (done) => {
      shouldHaveSize(urlGen('crop', '10x50', 'red-100x100.png'), 10, 50, done);
    });

    it('should crop gif to 10x50', (done) => {
      shouldHaveSize(urlGen('crop', '10x50', 'red-100x100.gif'), 10, 50, done);
    });

    it('should crop gif to 860x840', (done) => {
      shouldHaveSize(urlGen('crop', '860x840', 'red-1200x846.gif'), 860, 840, done);
    });
  });

  describe('GET /crop - to square', () => {
    it('should crop gif (200x200) to 400x400', (done) => {
      shouldHaveSize(urlGen('crop', '400x400', 'white-200x200.gif'), 400, 400, done);
    });

    it('should crop gif (100x200) to 400x400', (done) => {
      shouldHaveSize(urlGen('crop', '400x400', 'white-100x200.gif'), 400, 400, done);
    });

    it('should crop gif (200x100) to 400x400', (done) => {
      shouldHaveSize(urlGen('crop', '400x400', 'white-200x100.gif'), 400, 400, done);
    });
  });

  describe('GET /crop - to landscape', () => {
    it('should crop gif (200x200) to 400x200', (done) => {
      shouldHaveSize(urlGen('crop', '400x200', 'white-200x200.gif'), 400, 200, done);
    });

    it('should crop gif (100x200) to 400x200', (done) => {
      shouldHaveSize(urlGen('crop', '400x200', 'white-100x200.gif'), 400, 200, done);
    });

    it('should crop gif (200x100) to 400x200', (done) => {
      shouldHaveSize(urlGen('crop', '400x200', 'white-200x100.gif'), 400, 200, done);
    });
  });

  describe('GET /crop - to potrait', () => {
    it('should crop gif (200x200) to 200x400', (done) => {
      shouldHaveSize(urlGen('crop', '200x400', 'white-200x200.gif'), 200, 400, done);
    });

    it('should crop gif (100x200) to 200x400', (done) => {
      shouldHaveSize(urlGen('crop', '200x400', 'white-100x200.gif'), 200, 400, done);
    });

    it('should crop gif (200x100) to 200x400', (done) => {
      shouldHaveSize(urlGen('crop', '200x400', 'white-200x100.gif'), 200, 400, done);
    });
  });

  describe('GET /crop - error responses', () => {
    it('should return an error for size x10', (done) => {
      shouldReturnError(urlGen('crop', 'x10', 'red-100x100.jpg'), 400, done);
    });

    it('should return an error for size 10x', (done) => {
      shouldReturnError(urlGen('crop', '10x', 'red-100x100.jpg'), 400, done);
    });
  });
});
