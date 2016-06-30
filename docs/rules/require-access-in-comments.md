# Require access annotation in JSDoc comments (require-access-in-comments)

Ensure that block comments note the desired `@access` property

## Rule Details

This rule aims to...

The following patterns are considered warnings:

```javascript
/**
  Something without access documented.
*/
export function someNonDeterminedThing() {}
```

The following patterns are not warnings:

```javascript
/**
 * This thing is private and documented in JSDoc style.
 *
 * @private
 */
export function someAnotherPrivateThing() {}
```

## When Not To Use It

If you're not concerned with leaving notes to yourself or other developers about the context in which some function should be used, then you can turn this rule off.

## Further Reading

* [JSDoc `@access`](http://usejsdoc.org/tags-access.html)
