/**
 * @fileoverview Require access annotation in JSDoc comments
 * @author Alex LaFroscia
 */
'use strict';

const doctrine = require('doctrine');
const MESSAGE
  = 'You must supply `@public`, `@private`, or `@protected` for block comments.';

module.exports = {
  meta: {
    message: MESSAGE,
    schema: []
  },

  create(context) {
    let sourceCode = context.getSourceCode();

    /**
     * Check if JSDoc node includes access declaration
     * @param {string} title JSDoc tag title to test.
     * @returns {boolean} True if tag is an access declaration
     * @private
     */
    function includesAccessDeclaration(title) {
      const validTags = ['private', 'protected', 'public'];

      return validTags.includes(title);
    }

    /**
     * Validate the JSDoc node and check for access declarations
     * Based off of ESLint's valid-jsdoc rule
     * https://github.com/eslint/eslint/blob/master/lib/rules/valid-jsdoc.js
     * @param {ASTNode} node The AST node to check.
     * @returns {void}
     * @private
     */
    function checkJSDoc(node) {
      let jsdocNode = sourceCode.getJSDocComment(node);
      let hasAccessor = false;

      if (jsdocNode) {
        let jsdoc;

        try {
          jsdoc = doctrine.parse(jsdocNode.value, {
            strict: true,
            unwrap: true,
            sloppy: true,
            range: true
          });
        } catch(ex) {
          // Return generic syntax error
          return context.report({
            node: jsdocNode,
            message: 'JSDoc syntax error.'
          });
        }

        jsdoc.tags.forEach(tag => {
          if (includesAccessDeclaration(tag.title.toLowerCase())) {
            hasAccessor = true;
          }
        });

        if (!hasAccessor) {
          context.report({
            node: jsdocNode,
            message: MESSAGE
          });
        }
      }
    }

    return {
      ArrowFunctionExpression: checkJSDoc,
      FunctionExpression: checkJSDoc,
      FunctionDeclaration: checkJSDoc,
      ClassExpression: checkJSDoc,
      ClassDeclaration: checkJSDoc
    };
  }
};
