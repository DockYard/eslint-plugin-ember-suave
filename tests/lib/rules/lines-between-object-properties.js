/**
 * @fileoverview Allow or prevent line breaks between object properties
 * @author Sergio Arbeo <sergio.arbeo@dockyard.com>
 */

const rule = require('../../../lib/rules/lines-between-object-properties');
const { RuleTester } = require('eslint');
const ruleTester = new RuleTester();

const defaultOptions = {
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  }
};

const errors = {
  errors: [
    {
      message: rule.meta.messages.always,
      type: 'Property'
    }
  ]
};

ruleTester.run('lines-between-object-properties', rule, {
  valid: [
    {
      ...defaultOptions,
      options: ['always', { exceptAfterSingleLine: false }],
      code: `const a = {
  a: 1,

  b: 2
};`
    },
    {
      ...defaultOptions,
      options: ['always', { exceptAfterSingleLine: false }],
      code: `const a = {
  a: 1,

  b() {

  },

  c() {

  }
};`
    },
    {
      ...defaultOptions,
      options: ['always', { exceptAfterSingleLine: false }],
      code: `const a = {};
const b = {
  ...a,

  b() {
    return 2;
  }
};`
    },
    {
      ...defaultOptions,
      options: ['always', { exceptAfterSingleLine: true }],
      code: `const a = {
  a: 1,
  b: 2
};`
    },
    {
      ...defaultOptions,
      options: ['always', { exceptAfterSingleLine: true }],
      code: `const a = {
  a: 1,
  b() {

  },

  c() {

  }
};`
    },
    {
      ...defaultOptions,
      options: ['always', { exceptAfterSingleLine: true }],
      code: `const a = {};
const b = {
  ...a,
  b() {
    return 2;
  }
};`
    },
    {
      ...defaultOptions,
      options: ['never'],
      code: `const a = {
  a: 1,
  b() {

  },
  c() {

  }
};`
    }
  ],
  invalid: [
    {
      ...defaultOptions,
      ...errors,
      options: ['always'],
      code: `const a = {
  a() {
    return 1;
  },
  b() {
    return 2
  }
};`
    },
    {
      ...defaultOptions,
      ...errors,
      options: ['always', { exceptAfterSingleLine: false }],
      code: `const a = {
  c: 1,
  a() {
    return 1;
  },

  b() {
    return 2
  }
};`
    },
    {
      ...defaultOptions,
      ...errors,
      options: ['always', { exceptAfterSingleLine: false }],
      code: `const a = {
  ...c,
  a() {
    return 1;
  },

  b() {
    return 2
  }
};`
    },
    {
      ...defaultOptions,
      errors: [
        {
          message: rule.meta.messages.never,
          type: 'Property'
        }
      ],
      options: ['never'],
      code: `const a = {
  ...c,
  a() {
    return 1;
  },

  b() {
    return 2
  }
};`
    }
  ]
});