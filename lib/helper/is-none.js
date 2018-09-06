'use strict';

module.exports = function isNone(value) {
  return value === '' || value === undefined || value === null;
};
