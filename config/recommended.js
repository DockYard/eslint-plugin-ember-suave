module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  },
  env: {
    'browser': true
  },
  plugins: [
    'ember-suave'
  ],
  extends: require.resolve('./base.js'),
  rules: {
    // ES6
    'arrow-parens': ['error', 'always'],
    'generator-star-spacing': ['error', {
      'before': false,
      'after': true
    }],
    'no-var': 'error',
    'no-useless-rename': 'error',
    'object-shorthand': ['error', 'always'],
    'prefer-destructuring': 'error',
    'prefer-spread': 'error',
    'prefer-template': 'error',
    'eol-last': ['error', 'always'],

    // Overrides for Ember
    'new-cap': ['error', {
      'capIsNewExceptions': ['A']
    }],

    // Custom rules
    'ember-suave/no-const-outside-module-scope': 'error',
    'ember-suave/no-direct-property-access': 'error',
    'ember-suave/require-access-in-comments': 'error',
    'ember-suave/require-const-for-ember-properties': 'error'
  }
};
