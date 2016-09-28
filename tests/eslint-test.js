var lint = require('mocha-eslint');

var paths = [
  'config',
  'lib/**/*.js',
  'tests/**/*.js',
  '!tests/fixtures/**'
];

lint(paths);
