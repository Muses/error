
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

## License

See [LICENSE.md](LICENSE.md)
