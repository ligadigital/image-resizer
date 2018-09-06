'use strict';

module.exports = function serveError(response, error) {
  response
    .status(400)
    .send({ error: error && error.message })
    .end();
};
