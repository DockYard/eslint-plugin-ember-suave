# eslint-plugin-ember-suave [![Build Status](https://travis-ci.org/DockYard/eslint-plugin-ember-suave.svg?branch=master)](https://travis-ci.org/DockYard/eslint-plugin-ember-suave)

**[eslint-plugin-ember-suave is built and maintained by DockYard, contact us for expert Ember.js consulting](https://dockyard.com/ember-consulting)**.

This ESLint plugin exports custom linting rules and a `recommended` configuration based on [DockYard's styleguide](https://github.com/DockYard/styleguides/tree/master/engineering). It is tailored for Ember apps specifically, and may be used in conjunction with [ember-cli-eslint](https://github.com/ember-cli/ember-cli-eslint), or with the ESLint [CLI](http://eslint.org/docs/user-guide/command-line-interface).

## Using the plugin with Ember CLI

### Installation

Install the plugin as a dev dependency in your Ember CLI project.

```bash
npm install --save-dev eslint-plugin-ember-suave
```

This will make the plugin available to ESLint.

Next, install the [ember-cli-eslint](https://github.com/ember-cli/ember-cli-eslint) addon so that your app can be linted during development and testing. _This will also uninstall [ember-cli-jshint](https://github.com/ember-cli/ember-cli-jshint) since there is no need to have both linters running at the same time._

```bash
ember install ember-cli-eslint
```

### Upgrading from ember-suave

If you are upgrading from [ember-suave](https://github.com/DockYard/ember-suave) you will have to make sure that you remove the addon from your project. Otherwise you will have two linters running.

```bash
npm uninstall --save-dev ember-suave
```

### Configuration

The `ember-cli-eslint` addon blueprint generates a `.eslintrc.js` configuration file at the root of the project. By default, it is set to extend ESLint's recommended subset of [core linting rules](http://eslint.org/docs/rules/).

Add the _plugin_ and its
[`recommended`](https://github.com/DockYard/eslint-plugin-ember-suave/blob/master/config/recommended.js) configuration to the list of _extensions_:

```js
// .eslintrc.js

module.exports = {
  // ...
  plugins: [
    'ember',
    'ember-suave'
  ],
  extends: [
    'eslint:recommended',
    'plugin:ember-suave/recommended'
  ],
  rules: {
  }
  // ...
};
```

### Overriding Rules

Both core rules (provided by ESLint) and custom rules (prefixed by `ember-suave/`) from the plugin's `recommended` configuration can be turned off or modified, if desired.

```js
// .eslintrc.js

module.exports = {
  // ...
  plugins: [
    'ember',
    'ember-suave'
  ],
  extends: [
    'eslint:recommended',
    'plugin:ember-suave/recommended'
  ],
  rules: {
    'quotes': ['error', 'double'],
    'ember-suave/no-const-outside-module-scope': 'off'
  }
};
```

## Working with Editors and the CLI

If you use ESLint in an editor or from the command line, you'll need to install `eslint-plugin-ember-suave` globally too.

```bash
npm install -g eslint-plugin-ember-suave
```

## Rules

A list of custom rules and documentation can be found [here](docs/rules).

## Development

The provided [Yeoman generator](https://github.com/eslint/generator-eslint) should be used for creating rules.  In doing so, each rule will have a rule, documentation and test file created automatically.  All rules should be tested!

Tests can be run using `npm test`.  Additionally, [AST Explorer](https://astexplorer.net/) is a great way to look into the structure of a node to determine what to expect.

## Authors

* [Alex LaFroscia](https://github.com/alexlafroscia)
* [Estelle DeBlois](https://github.com/brzpegasus)

## Contributors

* [Robert Wagner](https://github.com/rwwagner90)

## Versioning

This library follows [Semantic Versioning](http://semver.org)

## Legal

[DockYard](http://dockyard.com/), Inc. &copy; 2016

[@dockyard](http://twitter.com/dockyard)

[Licensed under the MIT license](http://www.opensource.org/licenses/mit-license.php)
