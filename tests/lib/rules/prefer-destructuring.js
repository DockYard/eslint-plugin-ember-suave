/**
 * @fileoverview Prefer destructuring from arrays and objects
 * @author Alex LaFroscia
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/prefer-destructuring"),

  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("prefer-destructuring", rule, {

  valid: [
    {
      code: "var [foo] = array;",
      parserOptions: { ecmaVersion: 6 }
    },
    {
      code: "var { foo } = object;",
      parserOptions: { ecmaVersion: 6 }
    },
    {
      // Ensure that this doesn't break variable declarating without assignment
      code: "var foo;"
    },
    {
      code: "var foo = array[0];",
      options: [{ array: false }],
      parserOptions: { ecmaVersion: 6 }
    },
    {
      code: "var foo = object.foo;",
      options: [{ object: false }],
      parserOptions: { ecmaVersion: 6 }
    },
    {
      code: "var foo = object['foo'];",
      options: [{ object: false }],
      parserOptions: { ecmaVersion: 6 }
    }
  ],

  invalid: [
    {
      code: "var foo = array[0];",
      parserOptions: { ecmaVersion: 6 },
      errors: [{
        message: "Use array destructuring",
        type: "VariableDeclarator"
      }]
    },
    {
      code: "var foo = array.foo;",
      parserOptions: { ecmaVersion: 6 },
      errors: [{
        message: "Use object destructuring",
        type: "VariableDeclarator"
      }]
    },
    {
      code: "var foo = array['foo'];",
      parserOptions: { ecmaVersion: 6 },
      errors: [{
        message: "Use object destructuring",
        type: "VariableDeclarator"
      }]
    }
  ]
});
