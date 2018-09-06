'use strict';

module.exports = function log(message) {
  if (!message) { return; }

  if (message.stack) {
    return console.log(message.stack);
  }

  console.log(message);
};
