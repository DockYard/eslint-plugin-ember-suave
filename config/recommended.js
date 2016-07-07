'use strict';

module.exports = {
  plugins: [
    'ember-suave'
  ],
  rules: {
    // Built-in Rules
    'no-empty': 'error',
    'brace-style': ['error', '1tbs', {
      'allowSingleLine': false
    }],
    'no-multiple-empty-lines': 'error',
    'one-var': ['error', {
      'uninitialized': 'always',
      'initialized': 'never'
    }],
    'operator-linebreak': ['error', 'before'],
    'key-spacing': ['error', {
      'beforeColon': false,
      'afterColon': true
    }],
    'space-unary-ops': ['error', {
      'words': false,
      'nonwords': false
    }],
    'semi-spacing': ['error', {
      'before': false,
      'after': true
    }],
    'space-before-function-paren': ['error', 'never'],
    'space-in-parens': ['error', 'never'],
    'no-spaced-func': 'error',
    'comma-dangle': ['error', 'never'],
    'no-trailing-spaces': 'error',
    'no-var': 'error',
    'camelcase': ['error', {
      'properties': 'never'
    }],
    'new-cap': 'error',
    'comma-style': ['error', 'last'],
    'curly': ['error', 'all'],
    'dot-notation': 'error',
    'object-shorthand': 'error',
    'newline-after-var': ['error', 'always'],
    'arrow-parens': 'error',
    'semi': ['error', 'always'],
    'space-infix-ops': 'error',
    'keyword-spacing': 'error',
    'spaced-comment': ['error', 'always'],
    'space-before-blocks': ['error', 'always'],
    'array-bracket-spacing': ['error', 'always'],
    'prefer-spread': 'error',
    'prefer-template': 'error',
    'indent': ['error', 2, {
      'SwitchCase': 1
    }],
    'quotes': ['error', 'single', {
      'avoidEscape': true
    }],

    // Ember Suave rules
    'ember-suave/no-const-outside-module-scope': 'error',
    'ember-suave/no-direct-property-access': 'error',
    'ember-suave/prefer-destructuring': ['error', {
      array: true,
      object: true
    }],
    'ember-suave/require-access-in-comments': 'error',
    'ember-suave/require-const-for-ember-properties': 'error'
  }
};
