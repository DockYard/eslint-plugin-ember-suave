'use strict';

var fs = require('fs');
var path = require('path');
var expect = require('chai').expect;
var CLIEngine = require('eslint').CLIEngine;
var requireIndex = require('requireindex');

describe('plugin:ember-suave/recommended', function() {
  var cli;

  before(function() {
    cli = new CLIEngine({
      useEslintrc: false,
      configFile: path.resolve(__dirname, '../../config/recommended.js')
    });

    var rulesDir = path.resolve(__dirname, '../../lib/rules');
    var rules = requireIndex(rulesDir);
    cli.addPlugin('eslint-plugin-ember-suave', { rules: rules });
  });

  var fixturesDir = path.resolve(__dirname, '../fixtures');
  var fixtures = fs.readdirSync(fixturesDir);
  var skipped = [
    'disallow-spaces-in-generator'
  ];

  fixtures.forEach(function(fixture) {
    describe(fixture, function() {
      if (skipped.indexOf(fixture) != -1) {
        return;
      }

      var goodFilesDir = path.join(fixturesDir, fixture, 'good');
      var badFilesDir = path.join(fixturesDir, fixture, 'bad');

      fs.readdirSync(goodFilesDir).forEach(function(file) {
        it('good/' + file + ' should pass', function() {
          var report = cli.executeOnFiles([path.join(goodFilesDir, file)]);
          var errorCount = report.errorCount + report.warningCount;

          if (errorCount) {
            // Show the offending rule(s) and other details
            console.log(report.results[0]);
          }

          expect(errorCount).to.equal(0);
        });
      });

      fs.readdirSync(badFilesDir).forEach(function(file) {
        it('bad/' + file + ' should fail', function() {
          var report = cli.executeOnFiles([path.join(badFilesDir, file)]);
          expect(report.errorCount).to.not.equal(0);
        });
      });
    });
  });
});
