/**
 * @fileoverview Require access annotation in JSDoc comments
 * @author Alex LaFroscia
 */
'use strict';

const rule = require('../../../lib/rules/require-access-in-comments');
const MESSAGE = require('../../../lib/rules/require-access-in-comments').meta.message;
const codeBlock = require('../../helpers').codeBlock;
const RuleTester = require('eslint').RuleTester;
const ruleTester = new RuleTester();

ruleTester.run('require-access-in-comments', rule, {
  valid: [
    {
      code: codeBlock([
        '/**',
        '',
        ' This thing is private.',
        '',
        ' @private',
        ' */',
        'export function somePrivateThing() {}'
      ]),
      parserOptions: { ecmaVersion: 6, sourceType: 'module' }
    },
    {
      code: codeBlock([
        '/**',
        ' * This thing is private and documented in JSDoc style.',
        ' *',
        ' * @private',
        ' */',
        'export function someAnotherPrivateThing() {}'
      ]),
      parserOptions: { ecmaVersion: 6, sourceType: 'module' }
    },
    {
      code: codeBlock([
        '/**',
        '',
        ' This thing is public.',
        '',
        ' @public',
        ' */',
        'export function somePublicThing() {}'
      ]),
      parserOptions: { ecmaVersion: 6, sourceType: 'module' }
    },
    {
      code: codeBlock([
        '/**',
        ' * This thing is public and documented in JSDoc style.',
        ' *',
        ' * @public',
        ' */',
        'export function someAnotherPublicThing() {}'
      ]),
      parserOptions: { ecmaVersion: 6, sourceType: 'module' }
    },
    {
      code: codeBlock([
        '/**',
        '',
        ' This thing is protected.',
        '',
        ' @protected',
        ' */',
        'export function someProtectedThing() {}'
      ]),
      parserOptions: { ecmaVersion: 6, sourceType: 'module' }
    },
    {
      code: codeBlock([
        '/**',
        ' * This thing is protected and documented in JSDoc style.',
        ' *',
        ' * @protected',
        ' */',
        'export function someAnotherProtectedThing() {}'
      ]),
      parserOptions: { ecmaVersion: 6, sourceType: 'module' }
    },
    {
      code: codeBlock([
        '/**',
        ' * This thing is public and documented in JSDoc style.',
        ' *',
        ' * @public',
        ' */',
        'export function doNothingPublicMethod() {',
        '  /**',
        '   * This thing is private and documented in JSDoc style.',
        '   *',
        '   * @private',
        '   */',
        '  function somethingElse() {}',
        '}'
      ]),
      parserOptions: { ecmaVersion: 6, sourceType: 'module' }
    },
    {
      code: codeBlock([
        'export function doNothingPublicMethod() {',
        '  /**',
        '   * This thing is private and documented in JSDoc style.',
        '   *',
        '   * @private',
        '   */',
        '  function somethingElse() {}',
        '}'
      ]),
      parserOptions: { ecmaVersion: 6, sourceType: 'module' }
    },
    {
      code: codeBlock([
        '/**',
        ' * This thing is public and documented in JSDoc style, with multiple spaces before the annotation.',
        ' *',
        ' *    @public',
        ' */',
        'export function doNothingPublicMethod() {}'
      ]),
      parserOptions: { ecmaVersion: 6, sourceType: 'module' }
    },
    {
      code: codeBlock([
        'export function doNothingPublicMethod() {',
        '  /**',
        '   * This thing is private and documented in JSDoc style, with multiple spaces before the annotation.',
        '   *',
        '   *    @private',
        '   */',
        '  function somethingElse() {}',
        '}'
      ]),
      parserOptions: { ecmaVersion: 6, sourceType: 'module' }
    },
    {
      code: codeBlock([
        '/*',
        ' Some non documentation block, nothing to see here.',
        '*/'
      ]),
      parserOptions: { ecmaVersion: 6, sourceType: 'module' }
    },
    {
      code: codeBlock([
        '/**',
        ' * This function declaration is public and documented in JSDoc style.',
        ' *',
        ' * @public',
        ' */',
        'function someAnotherPublicThing() {}'
      ]),
      parserOptions: { ecmaVersion: 6, sourceType: 'module' }
    },
    {
      code: codeBlock([
        '/**',
        ' * This function expression is public and documented in JSDoc style.',
        ' *',
        ' * @public',
        ' */',
        'let someAnotherPublicThing = function() {}'
      ]),
      parserOptions: { ecmaVersion: 6, sourceType: 'module' }
    },
    {
      code: codeBlock([
        '/**',
        ' * This arrow function is public and documented in JSDoc style.',
        ' *',
        ' * @public',
        ' */',
        'let someAnotherPublicThing = () => {}'
      ]),
      parserOptions: { ecmaVersion: 6, sourceType: 'module' }
    },
    {
      code: codeBlock([
        '/**',
        ' * This arrow function is public and documented in JSDoc style.',
        ' *',
        ' * @public',
        ' */',
        'someAnotherPublicThing(() => {})'
      ]),
      parserOptions: { ecmaVersion: 6, sourceType: 'module' }
    },
    {
      code: codeBlock([
        '/**',
        ' * This class declaration is public and documented in JSDoc style.',
        ' *',
        ' * @public',
        ' */',
        'class someAnotherPublicThing {}'
      ]),
      parserOptions: { ecmaVersion: 6, sourceType: 'module' }
    },
    {
      code: codeBlock([
        '/**',
        ' * This class expression is public and documented in JSDoc style.',
        ' *',
        ' * @public',
        ' */',
        'let someAnotherPublicThing = class {}'
      ]),
      parserOptions: { ecmaVersion: 6, sourceType: 'module' }
    },
    {
      code: codeBlock([
        'export function doNothingPublicMethod() {',
        '  /**',
        '   * This thing is private and documented in JSDoc style.',
        '   *',
        '   * @private',
        '   */',
        '  let somethingElse = () => {}',
        '}'
      ]),
      parserOptions: { ecmaVersion: 6, sourceType: 'module' }
    }
  ],
  invalid: [
    {
      code: codeBlock([
        '/**',
        '  This thing has @private and @public in the text description but not',
        '  as an actual YUIDoc attribute.',
        '*/',
        'export function ambiguousThing() {}'
      ]),
      parserOptions: { ecmaVersion: 6, sourceType: 'module' },
      errors: [{
        message: MESSAGE,
        type: 'Block'
      }]
    },
    {
      code: codeBlock([
        '/**',
        ' * This thing has @private and @public in the text description but not',
        ' * as an actual YUIDoc attribute using `*` prefix comment syntax.',
        ' */',
        'export function anotherAmbiguousThing() {}'
      ]),
      parserOptions: { ecmaVersion: 6, sourceType: 'module' },
      errors: [{
        message: MESSAGE,
        type: 'Block'
      }]
    },
    {
      code: codeBlock([
        '/**',
        '  Something without access documented.',
        '*/',
        'export function someNonDeterminedThing() {}'
      ]),
      parserOptions: { ecmaVersion: 6, sourceType: 'module' },
      errors: [{
        message: MESSAGE,
        type: 'Block'
      }]
    },
    {
      code: codeBlock([
        '/**',
        '* Something without access documented using `*` prefix comment syntax.',
        '*/',
        'export function someAnotherNonDeterminedThing() {}'
      ]),
      parserOptions: { ecmaVersion: 6, sourceType: 'module' },
      errors: [{
        message: MESSAGE,
        type: 'Block'
      }]
    },
    {
      code: codeBlock([
        'export function doNothingPublicMethod() {',
        '  /**',
        '   * Internal private method without access documented.',
        '   */',
        '  function somethingElse() {}',
        '}'
      ]),
      parserOptions: { ecmaVersion: 6, sourceType: 'module' },
      errors: [{
        message: MESSAGE,
        type: 'Block'
      }]
    },
    {
      code: codeBlock([
        '/**',
        '* Public method with access documented using `*` prefix comment syntax.',
        '* @public',
        '*/',
        'export function doNothingPublicMethod() {',
        '  /**',
        '   * Internal private method without access documented.',
        '   */',
        '  function somethingElse() {}',
        '}'
      ]),
      parserOptions: { ecmaVersion: 6, sourceType: 'module' },
      errors: [{
        message: MESSAGE,
        type: 'Block'
      }]
    },
    {
      code: codeBlock([
        '/**',
        '* Public method without access documented using `*` prefix comment syntax.',
        '*/',
        'export function doNothingPublicMethod() {',
        '  /**',
        '   * Internal private method without access documented.',
        '   */',
        '  function somethingElse() {}',
        '}'
      ]),
      parserOptions: { ecmaVersion: 6, sourceType: 'module' },
      errors: [{
        message: MESSAGE,
        type: 'Block'
      }, {
        message: MESSAGE,
        type: 'Block'
      }]
    }
  ]
});
