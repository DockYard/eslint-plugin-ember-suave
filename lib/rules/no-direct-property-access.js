/**
 * @fileoverview Require that object properties are accessed through destructuring
 * @author Alex LaFroscia
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

  var protectedVariables = context.options[0];
  if (!Boolean(protectedVariables) || protectedVariables.length == 0) {
    protectedVariables = ["Ember", "DS"];
  }

  // variables should be defined here

  //--------------------------------------------------------------------------
  // Helpers
  //--------------------------------------------------------------------------

  function objectIsProtected(item) {
    return protectedVariables.indexOf(item) >= 0;
  }

  function checkMemberExpression(node) {
    var objectName = node.object.name;

    if (objectIsProtected(objectName)) {
      var propertyName = node.property.name;
      var message = 'Avoid accessing ' + objectName + '.' + propertyName + ' directly';

      context.report({
        node: node,
        message: message
      });
    }
  }

  function checkVariableDeclarator(node) {
    var init = node.init;

    if (Boolean(init) && init.type === 'MemberExpression') {
      checkMemberExpression(init);
    }
  }

  function checkExpressionStatement(node) {
    var right = Boolean(node.expression) ? node.expression.right : {};

    if (Boolean(right) && right.type === 'MemberExpression') {
      checkMemberExpression(right);
    }
  }

  //--------------------------------------------------------------------------
  // Public
  //--------------------------------------------------------------------------

  return {
    ExpressionStatement: checkExpressionStatement,
    VariableDeclarator: checkVariableDeclarator
  };
};

module.exports.schema = [
  {
    "type": "array",
    "items": {
      "type": "string"
    }
  }
];
