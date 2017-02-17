# Require that object properties are accessed through destructuring (no-direct-property-access)

The preferred way of accessing properties of Ember or DS is to destructure them off of the main variable, as opposed to accessing the property directly.  In order to keep the rule flexible, you can provide your own array of variables to require destructuring from.

## Rule Details

The following patterns are considered warnings:

```javascript
// Assumption: "Ember" and "DS" are provided in the configuration
const isEmpty = Ember.isEmpty;
const attr = DS.attr;
```

The following patterns are not warnings:

```javascript
// Assumption: "Ember" and "DS" are provided in the configuration
const { isEmpty } = Ember;
const { attr } = DS;
```

### Options

The only configuration option is an array of variables to require destructuring from.  If no configuration is provided, the following configuration will be used, protecting `Ember` and `DS`.

```json
{
  "rules": {
    "no-direct-property-access": ["error", ["Ember", "DS"]]
  }
}
```

If you, for example, do not want to protect `DS`, or have another library that you want to protect from direct access, you can modify the array however you like:

```json
{
  "rules": {
    "no-direct-property-access": ["error", ["Ember", "Mirage"]]
  }
}
```
