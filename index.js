
/**
 * Muses Constructor
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
  Error.captureStackTrace && Error.captureStackTrace(this);

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
}

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
    Error.captureStackTrace && Error.captureStackTrace(this, arguments.callee);
    this.name = name;
  }

  // Extend MuError.
  SubConstructor.prototype = Object.create(this.prototype);
  SubConstructor.prototype.constructor = this;

  // Allow this type to be extended.
  SubConstructor.extend = this.extend;

  return SubConstructor;
}

// Alias.
MuError.Error = MuError;

// HTTP client errors.
MuError.ClientError = ClientError = MuError.extend('ClientError');
MuError.BadRequest = ClientError.extend('BadRequest', 'Bad Request', 400);
MuError.Unauthorized = ClientError.extend('Unauthorized', 'Unauthorized', 401);
MuError.PaymentRequired = ClientError.extend('PaymentRequired', 'Payment Required', 402);
MuError.Forbidden = ClientError.extend('Forbidden', 'Forbidden', 403);
MuError.NotFound = ClientError.extend('NotFound', 'Not Found', 404);
MuError.MethodNotAllowed = ClientError.extend('MethodNotAllowed', 'Not Acceptable', 405);
MuError.NotAcceptable = ClientError.extend('NotAcceptable', 'Not Acceptable', 406);
MuError.ProxyAuthenticationRequired = ClientError.extend('ProxyAuthenticationRequired', 'Proxy Authentication Required', 407);
MuError.RequestTimeout = ClientError.extend('RequestTimeout', 'Request Timeout', 408);
MuError.Conflict = ClientError.extend('Conflict', 'Conflict', 409);
MuError.Gone = ClientError.extend('Gone', 'Gone', 410);
MuError.LengthRequired = ClientError.extend('LengthRequired', 'Length Required', 411);
MuError.PreconditionFailed = ClientError.extend('PreconditionFailed', 'Precondition Failed', 412);
MuError.RequestEntityTooLarge = ClientError.extend('RequestEntityTooLarge', 'Request Entity Too Large', 413);
MuError.RequestUriTooLong = ClientError.extend('RequestUriTooLong', 'Request URI Too Long', 414);
MuError.UnsupportedMediaType = ClientError.extend('UnsupportedMediaType', 'Unsupported Media Type', 415);
MuError.RequestedRangeNotSatisfiable = ClientError.extend('RequestedRangeNotSatisfiable', 'Requested Range Not Satisfiable', 416);
MuError.ExpectationFailed = ClientError.extend('ExpectationFailed', 'Expectation Failed', 417);

// HTTP server errors.
MuError.ServerError = ServerError = MuError.extend('ServerError');
MuError.InternalServerError = ServerError.extend('InternalServerError', 'Internal Server Error', 500);
MuError.NotImplemented = ServerError.extend('NotImplemented', 'Not Implemented', 501);
MuError.BadGateway = ServerError.extend('BadGateway', 'BadGateway', 502);
MuError.ServiceUnavailable = ServerError.extend('ServiceUnavailable', 'Service Unavailable', 503);
MuError.GatewayTimeout = ServerError.extend('GatewayTimeout', 'Gateway Timeout', 504);
MuError.HttpVersionNotSupported = ServerError.extend('HttpVersionNotSupported', 'HttpVersionNotSupported', 505);

// Exports.
module.exports = MuError;
