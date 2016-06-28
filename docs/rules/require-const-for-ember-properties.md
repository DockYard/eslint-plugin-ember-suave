# Ensure that const is used for accessing Ember properties (require-const-for-ember-properties)

Ember provides various classes and helper functions that can be access from the `Ember` variable.  Because these cannot change, there is never a reason to declare them with anything other than `const`.

## Rule Details

The following patterns are considered warnings:

```js
let isEmpty = Ember.isEmpty;
let { isEmpty } = Ember;
```

The following patterns are not warnings:

```js
const isEmpty = Ember.isEmpty;
const { isEmpty } = Ember;
```
