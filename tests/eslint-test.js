const lint = require('mocha-eslint');

const paths = [
  'config',
  'lib/**/*.js',
  'tests/**/*.js',
  '!tests/fixtures/**'
];

lint(paths);
