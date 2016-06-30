/**
 * @fileoverview Do not allow `const` outside of a module
 * @author Alex LaFroscia
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-const-outside-module-scope"),
  MESSAGE = require("../../../lib/rules/no-const-outside-module-scope").message,

  codeBlock = require("../../helpers").codeBlock,

  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("no-const-outside-module-scope", rule, {

  valid: [
    {
      code: codeBlock([
        "const foo = 'blah';",
        "export const bar = 'derp';",
        "function something() {",
        "  let hey = 'you!';",
        "}"
      ]),
      parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module'
      },
    }
  ],

  invalid: [
    {
      code: "if (true) { const foo = 'bar'; }",
      parserOptions: { ecmaVersion: 6 },
      errors: [{
        message: MESSAGE,
        type: "VariableDeclaration"
      }]
    },
    {
      code: "function something() { const foo = 'bar'; }",
      parserOptions: { ecmaVersion: 6 },
      errors: [{
        message: MESSAGE,
        type: "VariableDeclaration"
      }]
    }
  ]
});
