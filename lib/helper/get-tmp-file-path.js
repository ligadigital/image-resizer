'use strict';

module.exports = function getTmpFilePath(type) {
  // TODO make tmp dir configurable
  return `./tmp/temp-${new Date().getTime()}-${Math.random().toString(36).slice(2)}.${type.toLowerCase()}`;
};
