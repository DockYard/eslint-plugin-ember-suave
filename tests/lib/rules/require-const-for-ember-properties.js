/**
 * @fileoverview Ensure that const is used for accessing Ember properties
 * @author Alex LaFroscia
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/require-const-for-ember-properties"),

  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("require-const-for-ember-properties", rule, {

  valid: [
    { code: "const { foo } = Ember;", parserOptions: { ecmaVersion: 6 } },
    { code: "const foo = Ember.foo;", parserOptions: { ecmaVersion: 6 } }
  ],

  invalid: [
    {
      code: "let foo = Ember.foo;",
      parserOptions: { ecmaVersion: 6 },
      errors: [{
        message: "Always use `const` when making variables from Ember properties",
        type: "VariableDeclaration"
      }]
    },
    {
      code: "let { foo } = Ember;",
      parserOptions: { ecmaVersion: 6 },
      errors: [{
        message: "Always use `const` when making variables from Ember properties",
        type: "VariableDeclaration"
      }]
    },
    {
      code: "var foo = Ember.foo;",
      parserOptions: { ecmaVersion: 6 },
      errors: [{
        message: "Always use `const` when making variables from Ember properties",
        type: "VariableDeclaration"
      }]
    },
    {
      code: "var { foo } = Ember;",
      parserOptions: { ecmaVersion: 6 },
      errors: [{
        message: "Always use `const` when making variables from Ember properties",
        type: "VariableDeclaration"
      }]
    }
  ]
});
