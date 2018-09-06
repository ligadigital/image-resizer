'use strict';

function UnreachableError(message) {
    this.name = "UnreachableError";
    this.message = (message || "Unreachable");
}

UnreachableError.prototype = Error.UnreachableError;

module.exports = UnreachableError;
