const test = require('node:test');
const assert = require('node:assert');
const { handleFormspreeSubmit, contactAlert } = require('./contact.js');

test('handleFormspreeSubmit sets loading state and restores on success', async (t) => {
  // Mock DOM
  global.window = { location: { origin: 'http://localhost' } };
  global.document = {
    getElementById: (id) => {
      if (id === 'contact-form') {
        return global.mockForm;
      }
      if (id === 'contact-form-status') {
        return global.mockFormStatus;
      }
      return null;
    }
  };

  global.mockInputs = [{ disabled: false }, { disabled: false }];

  global.mockForm = {
    method: 'POST',
    reset: () => { global.mockForm.wasReset = true; },
    wasReset: false,
    querySelector: (selector) => {
      if (selector === 'button[type="submit"]') {
        return global.mockSubmitBtn;
      }
      return null;
    },
    querySelectorAll: (selector) => {
      if (selector === 'input, textarea') {
        return global.mockInputs;
      }
      return [];
    }
  };

  global.mockSubmitBtn = {
    innerHTML: 'Submit',
    disabled: false
  };

  global.mockFormStatus = {
    innerHTML: ''
  };

  global.FormData = class {
    constructor() {}
  };

  // Mock fetch
  let fetchCalled = false;
  global.fetch = async (url, options) => {
    fetchCalled = true;

    // Check loading state while fetch is pending
    assert.strictEqual(global.mockSubmitBtn.disabled, true);
    assert.ok(global.mockSubmitBtn.innerHTML.includes('spinner-border'));
    assert.strictEqual(global.mockInputs[0].disabled, true);

    return {
      ok: true
    };
  };

  const mockEvent = {
    preventDefault: () => {},
    target: {
      action: 'https://formspree.io/f/test'
    }
  };

  // Run the function
  await handleFormspreeSubmit(mockEvent);

  // Check results after promise resolves
  assert.strictEqual(fetchCalled, true);

  // Wait for the next tick to allow promise callbacks to finish
  await new Promise(resolve => setTimeout(resolve, 0));

  assert.strictEqual(global.mockSubmitBtn.disabled, false);
  assert.strictEqual(global.mockSubmitBtn.innerHTML, 'Submit');
  assert.strictEqual(global.mockInputs[0].disabled, false);
  assert.strictEqual(global.mockForm.wasReset, true);
  assert.ok(global.mockFormStatus.innerHTML.includes('Thanks for your submission!'));
});

test('handleFormspreeSubmit restores state on error', async (t) => {
  // Reset mocks
  global.mockForm.wasReset = false;
  global.mockSubmitBtn.disabled = false;
  global.mockSubmitBtn.innerHTML = 'Submit';
  global.mockFormStatus.innerHTML = '';
  global.mockInputs.forEach(input => input.disabled = false);

  global.fetch = async () => {
    throw new Error('Network error');
  };

  const mockEvent = {
    preventDefault: () => {},
    target: {
      action: 'https://formspree.io/f/test'
    }
  };

  await handleFormspreeSubmit(mockEvent);
  await new Promise(resolve => setTimeout(resolve, 0));

  assert.strictEqual(global.mockSubmitBtn.disabled, false);
  assert.strictEqual(global.mockSubmitBtn.innerHTML, 'Submit');
  assert.strictEqual(global.mockInputs[0].disabled, false);
  assert.strictEqual(global.mockForm.wasReset, false);
  assert.ok(global.mockFormStatus.innerHTML.includes('Oops! There was a problem'));
});

test('contactAlert adds alert with correct aria-label', () => {
  global.mockFormStatus.innerHTML = '';

  contactAlert('success', 'Test message');

  assert.ok(global.mockFormStatus.innerHTML.includes('alert-success'));
  assert.ok(global.mockFormStatus.innerHTML.includes('Test message'));
  assert.ok(global.mockFormStatus.innerHTML.includes('aria-label="Close alert"'));
});
