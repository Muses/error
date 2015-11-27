"use strict";

/**
 * Muses Error Constructor
 *
 * @param {String} message The error message.
 * @param {Number} [code]  An optional error code.
 */
function MuError(message, code) {

  // Ensure `new` usage.
  if (!(this instanceof MuError)) {
    return new MuError(message, code);
  }

  // Initialize error.
  Error.call(this);
  Error.captureStackTrace(this);

  // Set error properties.
  this.name = 'MuError';
  this.message = message || '';
  this.code = code || 500;
}

// Extend Error.
MuError.prototype = Object.create(Error.prototype);
MuError.prototype.constructor = Error;

/**
 * Get the error as a string.
 *
 * @return {String} The error as a string.
 */
MuError.prototype.toString = function() {
  return this.name + ' (' + this.code + '): ' + this.message;
};

/**
 * Create a new error type using this as the parent type.
 *
 * @param {String} name             The error name.
 * @param {String} [defaultMessage] An optional default error message.
 * @param {Number} [defaultCode]    An optional default error code.
 *
 * @return {Function} The error constructor.
 */
MuError.extend = function(name, defaultMessage, defaultCode)
{
  // Create the constructor function.
  var SubConstructor = function MuErrorExtended(message, code) {

    // Ensure `new` usage.
    if (!(this instanceof SubConstructor)) {
      return new SubConstructor(message, code);
    }

    // Initialize error.
    MuError.call(this, message || defaultMessage, code || defaultCode);
    Error.captureStackTrace(this);
    this.name = name;
  };

  // Extend MuError.
  SubConstructor.prototype = Object.create(this.prototype);
  SubConstructor.prototype.constructor = this;

  // Allow this type to be extended.
  SubConstructor.extend = this.extend;

  return SubConstructor;
};

// Exports.
module.exports = MuError;
