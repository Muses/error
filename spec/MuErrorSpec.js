
var MuError = require('../index');

describe('MuError', function() {

  it('should be a constructor', function() {
    expect(typeof MuError).toEqual('function');
  });

  it('should work without `new` keyword', function() {
    var error = MuError();
    expect(error instanceof MuError).toBe(true);
  });

  it('should work with `new` keyword', function() {
    var error = new MuError();
    expect(error instanceof MuError).toBe(true);
  });

  it('should be an instance of Error', function() {
    var error = new MuError();
    expect(error instanceof Error).toBe(true);
  });

  it('should have an `extend` function', function() {
    expect(typeof MuError.extend).toEqual('function');
  });

  it('should maintain prototype chain when extended', function() {
    var TestError = MuError.extend('TestError');
    var error = new TestError();
    expect(error instanceof Error).toBe(true);
    expect(error instanceof MuError).toBe(true);
    expect(error instanceof TestError).toBe(true);
  });

  it('should distinguish prototype chains when extended', function() {
    var BranchOne = MuError.extend('BranchOne');
    var BranchTwo = MuError.extend('BranchTwo');
    var errorOne = new BranchOne();
    var errorTwo = new BranchTwo();

    expect(errorOne instanceof BranchOne).toBe(true);
    expect(errorOne instanceof BranchTwo).toBe(false);
    expect(errorTwo instanceof BranchTwo).toBe(true);
    expect(errorTwo instanceof BranchOne).toBe(false);
  });

  it('should use provided message and code', function() {
    var error = new MuError('test message', 1);
    expect(error.message).toEqual('test message');
    expect(error.code).toEqual(1);
  })

  it('should use default values when not provided', function() {
    var TestError = MuError.extend('TestError', 'test message', 1);
    var error = new TestError();
    expect(error.message).toEqual('test message');
    expect(error.code).toEqual(1);
  });

  it('should include error code when stringified', function() {
    var error = new MuError('test message', 1);
    expect(error.toString()).toEqual('MuError (1): test message');
  });

  it('should use specified error name when extended', function() {
    var TestError = MuError.extend('TestError');
    var error = new TestError('test message', 1);
    expect(error.toString()).toEqual('TestError (1): test message');
  });
});
