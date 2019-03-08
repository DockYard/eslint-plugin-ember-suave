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
  create(context) {
    let [protectedVariables] = context.options;

    if (!protectedVariables || protectedVariables.length == 0) {
      protectedVariables = ['Ember', 'DS'];
    }

    function objectIsProtected(item) {
      return protectedVariables.includes(item);
    }

    function assigningToMemberExpression(node) {
      return (
        node.parent.type === 'AssignmentExpression' && node.parent.left === node
      );
    }

    function checkMemberExpression(node) {
      let objectName = node.object.name;

      if (objectIsProtected(objectName) && !assigningToMemberExpression(node)) {
        let propertyName = node.property.name;
        let message = `Avoid accessing ${objectName}.${propertyName} directly`;

        context.report({ node, message });
      }
    }

    return {
      MemberExpression: checkMemberExpression
    };
  }
};
