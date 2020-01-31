/**
 * @fileoverview Rule to check empty newline between object properties
 * @author Sergio Arbeo <sergio.arbeo@dockyard.com>
 *
 * Adapter from https://github.com/eslint/eslint/blob/550de1e611a1e9af873bcb18d74cf2056e8d2e1b/lib/rules/lines-between-class-members.js
 */
'use strict';

const isTokenOnSameLine = (left, right) => left.loc.end.line === right.loc.start.line;

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    type: 'layout',

    docs: {
      description: 'require or disallow an empty line between object properties',
      category: 'Stylistic Issues',
      recommended: true
    },

    fixable: 'whitespace',

    schema: [
      {
        enum: ['always', 'never']
      },
      {
        type: 'object',
        properties: {
          exceptAfterSingleLine: {
            type: 'boolean',
            default: false
          }
        },
        additionalProperties: false
      }
    ],
    messages: {
      never: 'Unexpected blank line between object properties.',
      always: 'Expected blank line between object properties.'
    }
  },

  create(context) {
    let options = [];

    options[0] = context.options[0] || 'always';
    options[1] = context.options[1] || { exceptAfterSingleLine: false };

    let sourceCode = context.getSourceCode();

    /**
     * Checks if there is padding between two tokens
     * @param {Token} first The first token
     * @param {Token} second The second token
     * @returns {boolean} True if there is at least a line between the tokens
     */
    function isPaddingBetweenTokens(first, second) {
      let comments = sourceCode.getCommentsBefore(second);
      let len = comments.length;

      // If there is no comments
      if (len === 0) {
        let linesBetweenFstAndSnd = second.loc.start.line - first.loc.end.line - 1;

        return linesBetweenFstAndSnd >= 1;
      }

      // If there are comments
      let sumOfCommentLines = 0; // the numbers of lines of comments
      let prevCommentLineNum = -1; // line number of the end of the previous comment

      for (let i = 0; i < len; i++) {
        let commentLinesOfThisComment = comments[i].loc.end.line - comments[i].loc.start.line + 1;

        sumOfCommentLines += commentLinesOfThisComment;

        /*
         * If this comment and the previous comment are in the same line,
         * the count of comment lines is duplicated. So decrement sumOfCommentLines.
         */
        if (prevCommentLineNum === comments[i].loc.start.line) {
          sumOfCommentLines -= 1;
        }

        prevCommentLineNum = comments[i].loc.end.line;
      }

      /*
       * If the first block and the first comment are in the same line,
       * the count of comment lines is duplicated. So decrement sumOfCommentLines.
       */
      if (first.loc.end.line === comments[0].loc.start.line) {
        sumOfCommentLines -= 1;
      }

      /*
       * If the last comment and the second block are in the same line,
       * the count of comment lines is duplicated. So decrement sumOfCommentLines.
       */
      if (comments[len - 1].loc.end.line === second.loc.start.line) {
        sumOfCommentLines -= 1;
      }

      let linesBetweenFstAndSnd = second.loc.start.line - first.loc.end.line - 1;

      return linesBetweenFstAndSnd - sumOfCommentLines >= 1;
    }

    return {
      ObjectExpression(node) {
        let { properties } = node;

        for (let i = 0; i < properties.length - 1; i++) {
          const curFirst = sourceCode.getFirstToken(properties[i]);
          const curLast = sourceCode.getLastToken(properties[i]);
          const nextFirst = sourceCode.getFirstToken(properties[i + 1]);
          const isPadded = isPaddingBetweenTokens(curLast, nextFirst);
          const isMulti = !isTokenOnSameLine(curFirst, curLast);
          const skip = !isMulti && options[1].exceptAfterSingleLine;

          if ((options[0] === 'always' && !skip && !isPadded)
            || (options[0] === 'never' && isPadded)) {
            context.report({
              node: properties[i + 1],
              messageId: isPadded ? 'never' : 'always',
              fix(fixer) {
                const tokenAfterLastToken = sourceCode.getTokenAfter(curLast);
                const tokenToLineBreakAfter = tokenAfterLastToken.value === ','
                  ? tokenAfterLastToken
                  : curLast;

                return isPadded
                  ? fixer.replaceTextRange([curLast.range[1], nextFirst.range[0]], ',\n')
                  : fixer.insertTextAfter(tokenToLineBreakAfter, '\n');
              }
            });
          }
        }
      }
    };
  }
};
