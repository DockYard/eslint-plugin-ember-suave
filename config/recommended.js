'use strict';

module.exports = {
  plugins: [
    'ember-suave'
  ],
  rules: {
    // Built-in Rules
    'prefer-const': ['error'],

    // Ember Suave rules
    'ember-suave/no-const-outside-module-scope': ['error'],
    'ember-suave/no-direct-property-access': ['error'],
    'ember-suave/require-access-in-comments': ['error'],
    'ember-suave/require-const-for-ember-properties': ['error']
  }
};
