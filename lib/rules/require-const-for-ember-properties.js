/**
 * @fileoverview Ensure that const is used for accessing Ember properties
 * @author Alex LaFroscia
 */
'use strict';

var MESSAGE = 'Always use `const` when making variables from Ember properties';

module.exports = {
  meta: {
    schema: []
  },
  create: function(context) {
    function checkVariableDeclaration(node) {
      var declaration = node.declarations[0];

      if (hasEmberIdentifier(declaration) && node.kind !== 'const') {
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
