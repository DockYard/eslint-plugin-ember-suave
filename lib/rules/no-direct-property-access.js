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

  // variables should be defined here

  //--------------------------------------------------------------------------
  // Helpers
  //--------------------------------------------------------------------------

  function objectIsProtected(item) {
    return protectedVariables.indexOf(item) >= 0;
  }

  // any helper functions should go here or else delete this section

  //--------------------------------------------------------------------------
  // Public
  //--------------------------------------------------------------------------

  return {
    VariableDeclaration: function(node) {
      var declaration = node.declarations[0];
      var init = declaration.init;

      if (init.type === 'MemberExpression') {
        var objectName = init.object.name;

        if (objectIsProtected(objectName)) {
          var propertyName = init.property.name;
          var message = 'Avoid accessing ' + objectName + '.' + propertyName + ' directly';

          context.report({
            node: node,
            message: message
          });
        }
      }
    }
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
