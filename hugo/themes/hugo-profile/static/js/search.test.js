const { test } = require('node:test');
const assert = require('node:assert');

// Mock window.location.origin for Node.js environment
global.window = {
  location: {
    origin: 'https://example.com'
  }
};

const { isValidUrl, encodeHTML } = require('./search.js');

test('encodeHTML encodes special characters correctly', () => {
  assert.strictEqual(encodeHTML('&'), '&amp;');
  assert.strictEqual(encodeHTML('<'), '&lt;');
  assert.strictEqual(encodeHTML('>'), '&gt;');
  assert.strictEqual(encodeHTML('"'), '&quot;');
  assert.strictEqual(encodeHTML("'"), '&#039;');
});

test('encodeHTML encodes mixed strings correctly', () => {
  assert.strictEqual(
    encodeHTML('<script>alert("XSS & more");</script>'),
    '&lt;script&gt;alert(&quot;XSS &amp; more&quot;);&lt;/script&gt;'
  );
});

test('encodeHTML leaves normal strings unchanged', () => {
  assert.strictEqual(encodeHTML('Hello World 123'), 'Hello World 123');
});

test('encodeHTML handles empty strings', () => {
  assert.strictEqual(encodeHTML(''), '');
});

test('encodeHTML handles multiple occurrences', () => {
  assert.strictEqual(encodeHTML('&&'), '&amp;&amp;');
  assert.strictEqual(encodeHTML('<<<'), '&lt;&lt;&lt;');
});

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
