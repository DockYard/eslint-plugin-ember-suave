/**
 * @fileoverview Require access annotation in JSDoc comments
 * @author Alex LaFroscia
 */
'use strict';

var MESSAGE = 'You must supply `@public`, `@private`, or `@protected` for block comments.';

module.exports = {
  meta: {
    message: MESSAGE,
    schema: []
  },
  create: function(context) {
    function isDocComment(comment) {
      return comment.value[0] === '*';
    }

    function includesAccessDeclaration(comment) {
      return comment.value.match(/\n(\s*\*\s+|\s*)(@private|@public|@protected)\s/);
    }

    function checkNode(node) {
      if (isDocComment(node) && !includesAccessDeclaration(node)) {
        context.report({
          node: node,
          message: MESSAGE
        });
      }
    }

    return {
      BlockComment: checkNode
    };
  }
};
