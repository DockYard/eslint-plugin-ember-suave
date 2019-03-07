/**
 * @fileoverview Require access annotation in JSDoc comments
 * @author Alex LaFroscia
 */
'use strict';

const rule = require('../../../lib/rules/require-access-in-comments');
const { message } = require('../../../lib/rules/require-access-in-comments').meta;
const { RuleTester } = require('eslint');
const ruleTester = new RuleTester();

ruleTester.run('require-access-in-comments', rule, {
  valid: [
    {
      code: `/**
        
 This thing is private.

 @private
 */
export function somePrivateThing() {}`,
      parserOptions: { ecmaVersion: 6, sourceType: 'module' }
    },
    {
      code: `/**
 * This thing is private and documented in JSDoc style.
 *
 * @private
 */
export function someAnotherPrivateThing() {}`,
      parserOptions: { ecmaVersion: 6, sourceType: 'module' }
    },
    {
      code: `/**

 This thing is public.

 @public
 */
export function somePublicThing() {}`,
      parserOptions: { ecmaVersion: 6, sourceType: 'module' }
    },
    {
      code: `/**
 * This thing is public and documented in JSDoc style.
 *
 * @public
 */
export function someAnotherPublicThing() {}`,
      parserOptions: { ecmaVersion: 6, sourceType: 'module' }
    },
    {
      code: `/**

 This thing is protected.

 @protected
 */
export function someProtectedThing() {}`,
      parserOptions: { ecmaVersion: 6, sourceType: 'module' }
    },
    {
      code: `/**
 * This thing is protected and documented in JSDoc style.
 *
 * @protected
 */
export function someAnotherProtectedThing() {}`,
      parserOptions: { ecmaVersion: 6, sourceType: 'module' }
    },
    {
      code: `/**
 * This thing is public and documented in JSDoc style.
 *
 * @public
 */
export function doNothingPublicMethod() {
  /**
   * This thing is private and documented in JSDoc style.
   *
   * @private
   */
  function somethingElse() {}
}`,
      parserOptions: { ecmaVersion: 6, sourceType: 'module' }
    },
    {
      code: `export function doNothingPublicMethod() {
  /**
   * This thing is private and documented in JSDoc style.
   *
   * @private
   */
  function somethingElse() {}
}`,
      parserOptions: { ecmaVersion: 6, sourceType: 'module' }
    },
    {
      code: `
/**
 * This thing is public and documented in JSDoc style, with multiple spaces before the annotation.
 *
 *    @public
 */
export function doNothingPublicMethod() {}`,
      parserOptions: { ecmaVersion: 6, sourceType: 'module' }
    },
    {
      code: `export function doNothingPublicMethod() {
  /**
   * This thing is private and documented in JSDoc style, with multiple spaces before the annotation.
   *
   *    @private
   */
  function somethingElse() {}
}`,
      parserOptions: { ecmaVersion: 6, sourceType: 'module' }
    },
    {
      code: `/*
 Some non documentation block, nothing to see here.
*/`,
      parserOptions: { ecmaVersion: 6, sourceType: 'module' }
    },
    {
      code: `/**
 * This function declaration is public and documented in JSDoc style.
 *
 * @public
 */
function someAnotherPublicThing() {}`,
      parserOptions: { ecmaVersion: 6, sourceType: 'module' }
    },
    {
      code: `/**
 * This function expression is public and documented in JSDoc style.
 *
 * @public
 */
let someAnotherPublicThing = function() {}`,
      parserOptions: { ecmaVersion: 6, sourceType: 'module' }
    },
    {
      code: `/**
 * This arrow function is public and documented in JSDoc style.
 *
 * @public
 */
let someAnotherPublicThing = () => {}`,
      parserOptions: { ecmaVersion: 6, sourceType: 'module' }
    },
    {
      code: `/**
 * This arrow function is public and documented in JSDoc style.
 *
 * @public
 */
someAnotherPublicThing(() => {})`,
      parserOptions: { ecmaVersion: 6, sourceType: 'module' }
    },
    {
      code: `/**
 * This class declaration is public and documented in JSDoc style.
 *
 * @public
 */
class someAnotherPublicThing {}`,
      parserOptions: { ecmaVersion: 6, sourceType: 'module' }
    },
    {
      code: `/**
 * This class expression is public and documented in JSDoc style.
 *
 * @public
 */
let someAnotherPublicThing = class {}`,
      parserOptions: { ecmaVersion: 6, sourceType: 'module' }
    },
    {
      code: `export function doNothingPublicMethod() {
  /**
   * This thing is private and documented in JSDoc style.
   *
   * @private
   */
  let somethingElse = () => {}
}`,
      parserOptions: { ecmaVersion: 6, sourceType: 'module' }
    }
  ],
  invalid: [
    {
      code: `/**
  This thing has @private and @public in the text description but not
  as an actual YUIDoc attribute.
*/
export function ambiguousThing() {}`,
      parserOptions: { ecmaVersion: 6, sourceType: 'module' },
      errors: [{
        message,
        type: 'Block'
      }]
    },
    {
      code: `/**
 * This thing has @private and @public in the text description but not
 * as an actual YUIDoc attribute using \`*\` prefix comment syntax.
 */
export function anotherAmbiguousThing() {}`,
      parserOptions: { ecmaVersion: 6, sourceType: 'module' },
      errors: [{
        message,
        type: 'Block'
      }]
    },
    {
      code: `/**
  Something without access documented.
*/
export function someNonDeterminedThing() {}`,
      parserOptions: { ecmaVersion: 6, sourceType: 'module' },
      errors: [{
        message,
        type: 'Block'
      }]
    },
    {
      code: `/**
* Something without access documented using \`*\` prefix comment syntax.
*/
export function someAnotherNonDeterminedThing() {}`,
      parserOptions: { ecmaVersion: 6, sourceType: 'module' },
      errors: [{
        message,
        type: 'Block'
      }]
    },
    {
      code: `export function doNothingPublicMethod() {
  /**
   * Internal private method without access documented.
   */
  function somethingElse() {}
}`,
      parserOptions: { ecmaVersion: 6, sourceType: 'module' },
      errors: [{
        message,
        type: 'Block'
      }]
    },
    {
      code: `/**
* Public method with access documented using \`*\` prefix comment syntax.
* @public
*/
export function doNothingPublicMethod() {
  /**
   * Internal private method without access documented.
   */
  function somethingElse() {}
}`,
      parserOptions: { ecmaVersion: 6, sourceType: 'module' },
      errors: [{
        message,
        type: 'Block'
      }]
    },
    {
      code: `/**
* Public method without access documented using \`*\` prefix comment syntax.
*/
export function doNothingPublicMethod() {
  /**
   * Internal private method without access documented.
   */
  function somethingElse() {}
}`,
      parserOptions: { ecmaVersion: 6, sourceType: 'module' },
      errors: [{
        message,
        type: 'Block'
      }, {
        message,
        type: 'Block'
      }]
    }
  ]
});
