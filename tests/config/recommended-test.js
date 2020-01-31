'use strict';

const fs = require('fs');
const path = require('path');
const expect = require('chai').expect;
const CLIEngine = require('eslint').CLIEngine;
const requireIndex = require('requireindex');

describe('plugin:ember-suave/recommended', function() {
  let cli;

  before(function() {
    cli = new CLIEngine({
      useEslintrc: false,
      configFile: path.resolve(__dirname, '../../config/recommended.js'),
      ignore: false,
      plugins: ['ember-suave', 'import'],
      parserOptions: {
        ecmaVersion: 2019
      }
    });

    let rulesDir = path.resolve(__dirname, '../../lib/rules');
    let rules = requireIndex(rulesDir);
    cli.addPlugin('ember-suave', { rules: rules });
    cli.addPlugin('import', require('eslint-plugin-import'));
  });

  let fixturesDir = path.resolve(__dirname, '../fixtures');
  let fixtures = fs.readdirSync(fixturesDir);

  fixtures.forEach(function(fixture) {
    describe(fixture, function() {
      let goodFilesDir = path.join(fixturesDir, fixture, 'good');
      let badFilesDir = path.join(fixturesDir, fixture, 'bad');

      fs.readdirSync(goodFilesDir).forEach(function(file) {
        it(`good/${file} should pass`, function() {
          let report = cli.executeOnFiles([path.join(goodFilesDir, file)]);
          let errorCount = report.errorCount + report.warningCount;

          let prettyPrintedError = JSON.stringify(report.results[0], null, 2);

          expect(
            errorCount,
            `A validation error occured: ${prettyPrintedError}`
          ).to.equal(0);
        });
      });

      fs.readdirSync(badFilesDir).forEach(function(file) {
        it(`bad/${file} should fail`, function() {
          let report = cli.executeOnFiles([path.join(badFilesDir, file)]);
          expect(report.errorCount, 'No linting error found').to.not.equal(0);
        });
      });
    });
  });
});
