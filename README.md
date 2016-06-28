# eslint-plugin-ember-suave

Make your Ember App Stylish

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-ember-suave`:

```
$ npm install eslint-plugin-ember-suave --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-ember-suave` globally.

## Usage

Add `ember-suave` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "ember-suave"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "ember-suave/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here




## Development

The provided [Yeoman generator](https://github.com/eslint/generator-eslint) should be used for creating rules.  In doing do, each rule will have a rule, documentation and test file created automatically.  All rules should be tested!

Tests can be run using `npm test`.  If you want to debug your rules within Mocha, you can use `npm run test:debug` to step inside your tests.  Additionally, [AST Explorer](https://astexplorer.net/) is a great way to look into the structure of a node to determine what to expect.
