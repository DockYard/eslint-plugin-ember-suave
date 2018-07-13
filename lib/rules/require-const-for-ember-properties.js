/**
 * @fileoverview Ensure that const is used for accessing Ember properties
 * @author Alex LaFroscia
 */
'use strict';

var MESSAGE = 'Always use `const` when making variables from Ember properties';

// Given a node, returns the dot accessor.
function sourceExpression(node) {
  if (node.type === 'VariableDeclarator') {
    return sourceExpression(node.init);
  }

  if (node.type === 'MemberExpression') {
    return sourceExpression(node.object) + '.' + sourceExpression(node.property);
  }

  if (node.type === 'Identifier') {
    return node.name;
  }

  return '';
}

module.exports = {
  meta: {
    schema: {
      exceptions: {
        type: 'array',
        items: {
          type: 'string'
        }
      }
    }
  },
  create: function(context) {
    function checkVariableDeclaration(node) {
      var declaration = node.declarations[0];
      var exceptions = (context.options[0] && context.options[0].exceptions) || [];

      if (hasEmberIdentifier(declaration)
        && node.kind !== 'const'
        && exceptions.indexOf(sourceExpression(declaration)) === -1) {
        context.report({ node: node, message: MESSAGE });
      }
    }

    function hasEmberIdentifier(declaration) {
      // Check whether the variable is being created from the Ember global
      var init = declaration.init;

      if (!init) {
        return false;
      }

      if (init.type === 'Identifier' && identifierIsEmber(init)) {
        return true;
      }

      if (init.type === 'MemberExpression') {
        var obj = init.object;

        return identifierIsEmber(obj);
      }
    }

    function identifierIsEmber(id) {
      return id.name === 'Ember';
    }

    return {
      VariableDeclaration: checkVariableDeclaration
    };
  }
};
