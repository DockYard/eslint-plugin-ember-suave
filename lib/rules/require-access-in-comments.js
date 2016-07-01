/**
 * @fileoverview Require access annotation in JSDoc comments
 * @author Alex LaFroscia
 */
"use strict";

var MESSAGE = 'You must supply `@public`, `@private`, or `@protected` for block comments.';


//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

  // variables should be defined here

  //--------------------------------------------------------------------------
  // Helpers
  //--------------------------------------------------------------------------

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

  //--------------------------------------------------------------------------
  // Public
  //--------------------------------------------------------------------------

  return {
    BlockComment: checkNode
  };

};

module.exports.schema = [
  // fill in your schema
];

module.exports.message = MESSAGE;
