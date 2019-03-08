/**
 * @fileoverview Do not allow `const` outside of a module
 * @author Alex LaFroscia
 */
'use strict';

const rule = require('../../../lib/rules/no-const-outside-module-scope');
const { message } = require('../../../lib/rules/no-const-outside-module-scope').meta;
const { RuleTester } = require('eslint');
const ruleTester = new RuleTester();

ruleTester.run('no-const-outside-module-scope', rule, {
  valid: [
    {
      code: `const foo = "blah";
export const bar = "derp";
function something() {
  let hey = "you!";
}`,
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
        message,
        type: 'VariableDeclaration'
      }]
    },
    {
      code: 'function something() { const foo = "bar"; }',
      parserOptions: { ecmaVersion: 6 },
      errors: [{
        message,
        type: 'VariableDeclaration'
      }]
    }
  ]
});
