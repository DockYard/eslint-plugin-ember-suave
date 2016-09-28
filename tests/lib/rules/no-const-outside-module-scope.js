/**
 * @fileoverview Do not allow `const` outside of a module
 * @author Alex LaFroscia
 */
'use strict';

var rule = require('../../../lib/rules/no-const-outside-module-scope');
var MESSAGE = require('../../../lib/rules/no-const-outside-module-scope').meta.message;
var codeBlock = require('../../helpers').codeBlock;
var RuleTester = require('eslint').RuleTester;
var ruleTester = new RuleTester();

ruleTester.run('no-const-outside-module-scope', rule, {
  valid: [
    {
      code: codeBlock([
        'const foo = "blah";',
        'export const bar = "derp";',
        'function something() {',
        '  let hey = "you!";',
        '}'
      ]),
      parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module'
      }
    }
  ],
  invalid: [
    {
      code: 'if (true) { const foo = "bar"; }',
      parserOptions: { ecmaVersion: 6 },
      errors: [{
        message: MESSAGE,
        type: 'VariableDeclaration'
      }]
    },
    {
      code: 'function something() { const foo = "bar"; }',
      parserOptions: { ecmaVersion: 6 },
      errors: [{
        message: MESSAGE,
        type: 'VariableDeclaration'
      }]
    }
  ]
});
