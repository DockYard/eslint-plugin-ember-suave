/**
 * @fileoverview Require that object properties are accessed through destructuring
 * @author Alex LaFroscia
 */
'use strict';

module.exports = {
  meta: {
    schema: [
      {
        type: 'array',
        items: {
          type: 'string'
        }
      }
    ]
  },
  create: function(context) {
    var protectedVariables = context.options[0];

    if (!protectedVariables || protectedVariables.length == 0) {
      protectedVariables = ['Ember', 'DS'];
    }

    function objectIsProtected(item) {
      return protectedVariables.indexOf(item) >= 0;
    }

    function assigningToMemberExpression(node) {
      return (node.parent.type === 'AssignmentExpression' && node.parent.left === node);
    }

    function checkMemberExpression(node) {
      var objectName = node.object.name;

      if (objectIsProtected(objectName) && !assigningToMemberExpression(node)) {
        var propertyName = node.property.name;
        var message = 'Avoid accessing ' + objectName + '.' + propertyName + ' directly';

        context.report({ node: node, message: message });
      }
    }

    return {
      MemberExpression: checkMemberExpression
    };
  }
};
