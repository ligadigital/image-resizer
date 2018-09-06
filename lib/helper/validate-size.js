'use strict';

const isNone = require('./is-none');

module.exports = function validateSize(mode, width, height) {
  switch (mode) {
    case 'resize':
      return !isNone(width) || !isNone(height);
    default:
      return !isNone(width) && !isNone(height);
  }
};
