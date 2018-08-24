'use strict';

const fs = require('fs');
const path = require('path');
const { assert, expect } = require('chai');
const { CLIEngine } = require('eslint');
const requireIndex = require('requireindex');
class FixtureDir {
  constructor(dir) {
    this.dir = dir;
    this._ruleNames = '';
    this._goodFiles = null;
    this._badFiles = null;
  }

  get goodFilesDir() {
    return path.join(this.dir, 'good');
  }

  get goodFiles() {
    if (!this._goodFiles) {
      this._goodFiles = fs.readdirSync(this.goodFilesDir);
    }

    return this._goodFiles;
  }

  get badFilesDir() {
    return path.join(this.dir, 'bad');
  }

  get badFiles() {
    if (!this._badFiles) {
      this._badFiles = fs.readdirSync(this.badFilesDir);
    }

    return this._badFiles;
  }

  get ruleNames() {
    if (!this._ruleNames) {
      if (this.ruleNameIsInferred) {
        this._ruleNames =  [path.basename(this.dir)];
      } else {
        this._ruleNames = JSON.parse(fs.readFileSync(this.ruleNameFilePath, { encoding: 'utf8' }));
      }
    }

    return this._ruleNames;
  }

  get ruleNameFilePath() {
    return path.join(this.dir, 'rulename');
  }

  get ruleNameIsInferred() {
    return !fs.existsSync(this.ruleNameFilePath);
  }

  ruleDidNotFailedMessage(file, failedRules, errorCount) {
    if (this.ruleNameIsInferred) {
      return `We inferred rule ${this.ruleNames} from directory name but that rule did not fail when linting file \`bad/${file}\`. You can overwrite the rule name just by writing a rulename file insided the fixture directory. Failed rules (${errorCount}): ${failedRules.join(', ')}.`;
    }

    return `Rule ${this.ruleNames} did not fail when linting ${path.join(this.dir, 'bad', file)}. Failed rules (${errorCount}): ${failedRules.join(', ')}.`;
  }
}

describe('plugin:ember-suave/recommended', function() {
  let cli;

  before(function() {
    cli = new CLIEngine({
      useEslintrc: false,
      configFile: path.resolve(__dirname, '../../config/recommended.js'),
      parser: 'babel-eslint'
    });

    let rulesDir = path.resolve(__dirname, '../../lib/rules');
    let rules = requireIndex(rulesDir);
    cli.addPlugin('eslint-plugin-ember-suave', { rules: rules });
  });

  let fixturesDir = path.resolve(__dirname, '../fixtures');
  let fixtures = fs.readdirSync(fixturesDir);

  fixtures.forEach(function(fixturePath) {
    let fixture = new FixtureDir(path.join(fixturesDir, fixturePath));

    describe(fixturePath, function() {
      fixture.goodFiles.forEach(function(file) {
        it('good/' + file + ' should pass', function() {
          let report = cli.executeOnFiles([path.join(fixture.goodFilesDir, file)]);
          let errorCount = report.errorCount + report.warningCount;

          if (errorCount) {
            // Show the offending rule(s) and other details
            console.log(report.results[0]);
          }

          expect(errorCount).to.equal(0);
        });
      });

      fixture.badFiles.forEach(function(file) {
        it('bad/' + file + ' should fail', function() {
          let report = cli.executeOnFiles([path.join(fixture.badFilesDir, file)]);
          expect(report.errorCount).to.not.equal(0);

          let failedRules = report.results.reduce((rules, result) => {
            return rules.concat(result.messages.map((message) => message.ruleId));
          }, []);

          assert.isOk(fixture.ruleNames.some((rule) => failedRules.includes(rule)), fixture.ruleDidNotFailedMessage(file, failedRules, report.errorCount));
        });
      });
    });
  });
});
