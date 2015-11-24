
# Muses Error Package

A simple error package for node.

## Installation

Install the package using npm: `npm install muses-error`

## Usage

Load the module as usual: `var MuError = require('muses-error');`

### Basic Usage

```
var MuError = require('muses-error');

var error = new MuError('Some error', 500);

var UserError = MuError.extend('UserError', 'default message', 400);
var error = new UserError('nope', 403);

error.name === 'UserError'; // true
error.code === 403; // true
error instanceof UserError; // true
error instanceof MuError; // true
error instanceof Error; // true
```

### Predefined Errors

Muses Error includes many predefined error types for common HTTP errors. They're organized into two error branches: `ClientError` for the 4xx error codes and `ServerError` for the 5xx error codes.

Example: Not Found (404)

```
var MuError = require('muses-error');

var error = MuError.NotFound('Resource not found.');

error.code === 404; // true
error instanceof MuError.NotFound; // true
error instanceof MuError.ClientError; // true
error instanceof MuError; // true
error instanceof Error; // true

```

## License

See [LICENSE.md](LICENSE.md)
