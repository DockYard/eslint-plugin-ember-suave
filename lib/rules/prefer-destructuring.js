/**
 * @fileoverview Prefer destructuring from arrays and objects
 * @author Alex LaFroscia
 */
'use strict';

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

    if (options) {
      if (options.hasOwnProperty('array')) {
        checkArrays = options.array;
      }

      if (options.hasOwnProperty('object')) {
        checkObjects = options.object;
      }
    }

    function isArrayIndexAccess(node) {
      return Number.isInteger(node.property.value);
    }

    function checkVariableDeclarator(node) {
      // Skip if variable is declared without assignment
      if (!node.init) {
        return;
      }

      if (node.init.type === 'Identifier') {
        var objectExpression = node.id.type === 'ObjectPattern' && node.id;

        if (objectExpression) {
          var prop = objectExpression.properties[0];
          var key = prop.key;
          var value = prop.value;

          if ((key.name === value.name) && (key.start !== value.start)) {
            context.report({ node: prop, message: 'Unnecessary duplicate variable name' });
          }
        }
      }

      // We only care about member expressions past this point
      if (node.init.type !== 'MemberExpression') {
        return;
      }

      var memberExpression = node.init;

      if (checkArrays && isArrayIndexAccess(memberExpression)) {
        context.report({ node: node, message: 'Use array destructuring' });
        return;
      }

      if (checkObjects && !isArrayIndexAccess(memberExpression)) {
        var variableIdentifier = node.id;
        var property = node.init.property;

        if (property.type === 'Literal' && variableIdentifier.name === property.value) {
          context.report({ node: node, message: 'Use object destructuring' });
        }

        if (property.type === 'Identifier' && variableIdentifier.name === property.name) {
          context.report({ node: node, message: 'Use object destructuring' });
        }
      }
    }

    return {
      VariableDeclarator: checkVariableDeclarator
    };
  }
};
