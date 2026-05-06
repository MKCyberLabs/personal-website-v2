const { test } = require('node:test');
const assert = require('node:assert');
const { readingTime } = require('./readingTime.js');

// Mock DOM environment
global.document = {
  querySelector: (selector) => {
    if (selector === 'article') {
      return global.mockArticle;
    }
    if (selector === 'span#readingTime') {
      return global.mockTimeElement;
    }
    return null;
  }
};

test('readingTime calculates 1 minute for short text', () => {
  global.mockArticle = { innerText: 'Hello world' };
  global.mockTimeElement = { innerHTML: 'min read' };

  readingTime();

  assert.strictEqual(global.mockTimeElement.innerHTML, '<small> | </small>1min read');
});

test('readingTime calculates 1 minute for exactly 225 words', () => {
  const words = new Array(225).fill('word').join(' ');
  global.mockArticle = { innerText: words };
  global.mockTimeElement = { innerHTML: 'min read' };

  readingTime();

  assert.strictEqual(global.mockTimeElement.innerHTML, '<small> | </small>1min read');
});

test('readingTime calculates 2 minutes for 226 words', () => {
  const words = new Array(226).fill('word').join(' ');
  global.mockArticle = { innerText: words };
  global.mockTimeElement = { innerHTML: 'min read' };

  readingTime();

  assert.strictEqual(global.mockTimeElement.innerHTML, '<small> | </small>2min read');
});

test('readingTime handles empty text as 0 minutes (or 1 depending on implementation)', () => {
  // Current implementation: "".trim().split(/\s+/) results in [""] which has length 1
  // So it will be 1 minute.
  global.mockArticle = { innerText: '' };
  global.mockTimeElement = { innerHTML: 'min read' };

  readingTime();

  assert.strictEqual(global.mockTimeElement.innerHTML, '<small> | </small>1min read');
});

test('readingTime does not crash if elements are missing', () => {
  const originalArticle = global.mockArticle;
  const originalTimeElement = global.mockTimeElement;

  global.mockArticle = null;
  global.mockTimeElement = { innerHTML: 'min read' };

  assert.doesNotThrow(() => readingTime());
  assert.strictEqual(global.mockTimeElement.innerHTML, 'min read');

  global.mockArticle = { innerText: 'Some text' };
  global.mockTimeElement = null;

  assert.doesNotThrow(() => readingTime());

  // Restore
  global.mockArticle = originalArticle;
  global.mockTimeElement = originalTimeElement;
});
