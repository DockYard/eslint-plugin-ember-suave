/**
 * @fileoverview Prefer destructuring from arrays and objects
 * @author Alex LaFroscia
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    schema: [
      {
        type: 'object',
        properties: {
          array: {
            type: 'boolean'
          },
          object: {
            type: 'boolean'
          }
        }
      }
    ]
  },
  create: function(context) {

    var checkArrays = true;
    var checkObjects = true;
    var options = context.options[0];

    if (Boolean(options)) {
      if (options.hasOwnProperty('array')) {
        checkArrays = options.array;
      }

      if (options.hasOwnProperty('object')) {
        checkObjects = options.object;
      }
    }

    //--------------------------------------------------------------------------
    // Helpers
    //--------------------------------------------------------------------------

    function isArrayIndexAccess(node) {
      return Number.isInteger(node.property.value);
    }

    function checkVariableDeclarator(node) {
      // Skip if variable is declared without assignment
      if (!Boolean(node.init)) {
        return;
      }

      // We only care about member expressions
      if (node.init.type !== 'MemberExpression') {
        return;
      }

      var memberExpression = node.init;

      if (checkArrays && isArrayIndexAccess(memberExpression)) {
        context.report({ node: node, message: 'Use array destructuring' });
        return;
      }

      if (checkObjects && !isArrayIndexAccess(memberExpression)) {
        context.report({ node: node, message: 'Use object destructuring' });
      }
    }

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {
      VariableDeclarator: checkVariableDeclarator
    };
  }
};
