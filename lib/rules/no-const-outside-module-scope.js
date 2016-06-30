/**
 * @fileoverview Do not allow `const` outside of a module
 * @author Alex LaFroscia
 */
"use strict";

var MESSAGE = '`const` should only be used in module scope (not inside functions/blocks).';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

  // variables should be defined here

  //--------------------------------------------------------------------------
  // Helpers
  //--------------------------------------------------------------------------

  // declaration is a `export const foo = 'asdf'` in root of the module
  function isModuleExport(node) {
    return node.parent.type === 'ExportNamedDeclaration' && isAtRoot(node.parent);
  }

  // declaration is in root of module
  function isAtRoot(node) {
    return node.parent.type === 'Program';
  }

  function checkNode(node) {
    if (isAtRoot(node)) {
      return;
    }

    if (isModuleExport(node)) {
      return;
    }

    if (node.kind === 'const') {
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
    VariableDeclaration: checkNode
  };

};

module.exports.schema = [
  // fill in your schema
];

module.exports.message = MESSAGE;
