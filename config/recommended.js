'use strict';

module.exports = {
  plugins: [
    'ember-suave'
  ],
  rules: {
    // Built-in Rules
    'array-bracket-spacing': ['error', 'always'],
    'arrow-parens': 'error',
    'brace-style': ['error', '1tbs', {
      'allowSingleLine': false
    }],
    'camelcase': ['error', {
      'properties': 'never'
    }],
    'comma-dangle': ['error', 'never'],
    'comma-style': ['error', 'last'],
    'curly': ['error', 'all'],
    'dot-notation': 'error',
    'indent': ['error', 2, {
      'SwitchCase': 1
    }],
    'key-spacing': ['error', {
      'beforeColon': false,
      'afterColon': true
    }],
    'keyword-spacing': 'error',
    'newline-after-var': ['error', 'always'],
    'new-cap': 'error',
    'no-empty': 'error',
    'no-multiple-empty-lines': ['error', {
      'max': 1
    }],
    'no-spaced-func': 'error',
    'no-trailing-spaces': 'error',
    'no-var': 'error',
    'object-shorthand': 'error',
    'one-var': ['error', {
      'uninitialized': 'always',
      'initialized': 'never'
    }],
    'operator-linebreak': ['error', 'before'],
    'semi': ['error', 'always'],
    'prefer-spread': 'error',
    'prefer-template': 'error',
    'quotes': ['error', 'single', {
      'avoidEscape': true
    }],
    'semi-spacing': ['error', {
      'before': false,
      'after': true
    }],
    'space-before-blocks': ['error', 'always'],
    'space-before-function-paren': ['error', 'never'],
    'space-in-parens': ['error', 'never'],
    'space-infix-ops': 'error',
    'space-unary-ops': ['error', {
      'words': false,
      'nonwords': false
    }],
    'spaced-comment': ['error', 'always'],

    // Ember Suave rules
    'ember-suave/no-const-outside-module-scope': 'error',
    'ember-suave/no-direct-property-access': 'error',
    'ember-suave/prefer-destructuring': 'error',
    'ember-suave/require-access-in-comments': 'error',
    'ember-suave/require-const-for-ember-properties': 'error'
  }
};
