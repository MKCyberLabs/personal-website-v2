const { test } = require('node:test');
const assert = require('node:assert');

// Mock window.location.origin for Node.js environment
global.window = {
  location: {
    origin: 'https://example.com'
  }
};

const { isValidUrl } = require('./search.js');

test('isValidUrl validates correct HTTPS URLs', () => {
  assert.strictEqual(isValidUrl('https://google.com'), true);
  assert.strictEqual(isValidUrl('https://example.com/path?query=1'), true);
});

test('isValidUrl validates correct HTTP URLs', () => {
  assert.strictEqual(isValidUrl('http://localhost:1313'), true);
});

test('isValidUrl rejects invalid protocols', () => {
  assert.strictEqual(isValidUrl('ftp://files.example.com'), false);
  assert.strictEqual(isValidUrl('javascript:alert(1)'), false);
  assert.strictEqual(isValidUrl('file:///etc/passwd'), false);
});

test('isValidUrl rejects malformed URLs', () => {
  // URLs that can't be parsed even with a base URL
  assert.strictEqual(isValidUrl('http://[::1'), false);
});

test('isValidUrl handles relative URLs based on window.location.origin', () => {
  // If the origin is https://example.com, then /path/to/page should be valid
  assert.strictEqual(isValidUrl('/path/to/page'), true);
});
