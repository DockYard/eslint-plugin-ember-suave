# eslint-plugin-ember-suave [![Build Status](https://travis-ci.org/DockYard/eslint-plugin-ember-suave.svg?branch=master)](https://travis-ci.org/DockYard/eslint-plugin-ember-suave)
Make your Ember App Stylish

**THIS PROJECT IS A WORK IN PROGRESS:** Ember Suave is being ported to ESLint, and this repo is porting the rules to the new platform.  See [this Github issue](https://github.com/DockYard/ember-suave/issues/113) for more information.

## Installation

### Getting Started in Ember

You'll first need to install [ember-cli-eslint](https://github.com/ember-cli/ember-cli-eslint) and `eslint-plugin-ember-suave`:

```bash
ember install ember-cli-elsint
npm install --save-dev eslint-plugin-ember-suave
```

Then, update the `.eslintrc.js` file to extend the recommended configuration (see the [Usage section below](#usage)).

### Working with Editors and the CLI

If you use ESLint in an editor, or from the command line, you'll need to install `eslint-plugin-ember-suave` globally too.

```bash
npm install --global eslint-plugin-ember-suave
```

## Usage

There are a few ways to add the rules from `ember-suave` to your ESLint project.  The easiest way is to extend your configuration from the one provided, like so:

```json
{
    "extends": [
        "plugin:ember-suave/recommended"
    ]
}
```

Note that the first extension is placed there by default by `ember-cli-eslint`; you might not have it if you're not using that plugin, or if you've decided not to take their presets.  Once you've extended from the recommended settings, you can turn them off or configure them as you like.
If you want more control over your linting, or would prefer adding rules one at a time, you can also include the plugin manually and individually enable rules.  Add `ember-suave` to the `plugins` section of your `.eslintrc` configuration file, and then configure individual rules under the `rules` section.  Note that rules will be disabled by default; you'll need to turn on each one that you want to use.

```json
{
    "plugins": [
        "ember-suave"
    ],
    "rules": {
        "ember-suave/no-const-outside-module-scope": "error",
        "ember-suave/no-direct-property-access": "error",
        "ember-suave/prefer-destructuring": "error",
        "ember-suave/require-access-in-comments": "error",
        "ember-suave/require-const-for-ember-properties": "error"
    }
}
```

Details about rules and their configuration options are provided below.

## Rules

A list of supported rules and documentation can be found [here](docs/rules).

## Development

The provided [Yeoman generator](https://github.com/eslint/generator-eslint) should be used for creating rules.  In doing do, each rule will have a rule, documentation and test file created automatically.  All rules should be tested!

Tests can be run using `npm test`.  If you want to debug your rules within Mocha, you can use `npm run test:debug` to step inside your tests.  Additionally, [AST Explorer](https://astexplorer.net/) is a great way to look into the structure of a node to determine what to expect.

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
