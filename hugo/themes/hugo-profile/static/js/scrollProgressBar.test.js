const { test } = require('node:test');
const assert = require('node:assert');
const { getScrollPercent } = require('./scrollProgressBar.js');

// Mock DOM environment
global.window = {};
global.document = {
  body: {}
};

test('getScrollPercent calculates 0% when at the top', () => {
  global.document.body.scrollHeight = 2000;
  global.window.innerHeight = 1000;
  global.window.scrollY = 0;

  const result = getScrollPercent();
  assert.strictEqual(result, 0);
});

test('getScrollPercent calculates 50% when in the middle', () => {
  global.document.body.scrollHeight = 2000;
  global.window.innerHeight = 1000;
  global.window.scrollY = 500;

  const result = getScrollPercent();
  assert.strictEqual(result, 50);
});

test('getScrollPercent calculates 100% when at the bottom', () => {
  global.document.body.scrollHeight = 2000;
  global.window.innerHeight = 1000;
  global.window.scrollY = 1000;

  const result = getScrollPercent();
  assert.strictEqual(result, 100);
});

test('getScrollPercent handles non-scrollable page', () => {
  global.document.body.scrollHeight = 1000;
  global.window.innerHeight = 1000;
  global.window.scrollY = 0;

  const result = getScrollPercent();
  assert.strictEqual(result, 0);
});

test('getScrollPercent handles small innerHeight (no division by zero)', () => {
  global.document.body.scrollHeight = 500;
  global.window.innerHeight = 1000;
  global.window.scrollY = 0;

  const result = getScrollPercent();
  assert.strictEqual(result, 0);
});
