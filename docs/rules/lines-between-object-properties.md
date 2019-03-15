# Require or disallow empty lines between object properties

Configurable rule to enforce consistent empty lines between object properties.

## Configuration

The first parameter can either be `'always'`, to enforce empty lines between properties; or `'never'`, to enforce no empty lines between properties.

The second parameter is an object with only one possible boolean property,
`exceptAfterSingleLine`, that let the user add an exception to properties that fit in one line.

## Rule details

With `['always']`, the following codes are valid:

```js
const a = {
  ...otherObject,

  a: 1,

  b: 2,

  c() {

  },

  d() {

  }
};
```

With `['always', { exceptAfterSingleLine: true }]`:

```js
const a = {
  ...otherObject,
  a: 1,
  b: 2,

  c() {

  },

  d() {

  }
};
```

With `['never']`:

```js
const a = {
  ...otherObject,
  a: 1,
  b: 2,
  c() {

  },
  d() {

  }
};
```
