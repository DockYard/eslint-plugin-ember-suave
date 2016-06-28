/**
 * @fileoverview Require that object properties are accessed through destructuring
 * @author Alex LaFroscia
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-direct-property-access"),

  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("no-direct-property-access", rule, {

  valid: [
    {
      code: "const { foo } = Ember;",
      options: [["Ember", "DS"]],
      parserOptions: { ecmaVersion: 6 }
    },
    {
      code: "Ember.foo = 'bar';",
      options: [["Ember", "DS"]]
    },
    {
      code: "const foo = bar.foo;",
      options: [["Ember", "DS"]],
      parserOptions: { ecmaVersion: 6 }
    },
  ],

  invalid: [
    {
      code: "const foo = Ember.foo;",
      options: [["Ember", "DS"]],
      parserOptions: { ecmaVersion: 6 },
      errors: [{
        message: "Avoid accessing Ember.foo directly",
        type: "VariableDeclaration"
      }]
    },
    {
      code: "const foo = DS.foo;",
      options: [["Ember", "DS"]],
      parserOptions: { ecmaVersion: 6 },
      errors: [{
        message: "Avoid accessing DS.foo directly",
        type: "VariableDeclaration"
      }]
    }
  ]
});
