/**
 * @fileoverview Make your Ember App Stylish
 * @author Alex LaFroscia
 */
'use strict';

var requireIndex = require('requireindex');
var resolve = require('path').resolve;

// import all rules in lib/rules
module.exports.rules = requireIndex(__dirname + '/rules');

// import all configurations in ../config
module.exports.configs = requireIndex(resolve(__dirname, '../config'));
