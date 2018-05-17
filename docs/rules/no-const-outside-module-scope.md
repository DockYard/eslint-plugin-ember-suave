# Only allow `const` at the top level of a module (no-const-outside-module-scope)

The rule enforces the use of `const` only as a true constant, a value that will only ever have a single value across the entire lifetime of your application.

A good, brief explanation is below:

> `const` to express variable bindings that should ABSOLUTELY not change, not bindings that happen to not change.
> `let` express variable bindings that may or may not change.
>
> -- [Stefan Penner](https://github.com/emberjs/ember.js/pull/11874#discussion_r43798121)

## Rule Details

The following patterns are good:

```javascript
const FOO = 'FOO';
export const BAR = 'BAR';
```

The following patterns are bad:

```javascript
function derp() {
  const FOO = 'FOO';
}

if (false) {
  const BLAH = 'BLAH';
}
```

## When Not To Use It

If you want to use `const` anywhere in your code, then you should turn this rule off.
