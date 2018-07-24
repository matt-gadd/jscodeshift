/*
 *  Copyright (c) 2015-present, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 *
 */

'use strict';
const plugins = [
	'typescript',
	'asyncFunctions',
	'asyncGenerators',
	'classConstructorCall',
	'classProperties',
	'decorators-legacy',
	'doExpressions',
	'exponentiationOperator',
	'exportExtensions',
	'functionBind',
	'functionSent',
	'objectRestSpread',
	'trailingFunctionCommas',
	'dynamicImport',
	'numericSeparator',
	'optionalChaining',
	'importMeta',
	'classPrivateProperties',
	'bigInt',
	'optionalCatchBinding'
]

module.exports = function getParser(parserName) {
  switch (parserName) {
    case 'babylon':
      return require('../parser/babylon');
    case 'flow':
      return require('../parser/flow');
    case 'typescript':
      var babylon = require('babylon');
      var options = {
        sourceType: 'module',
        allowImportExportEverywhere: true,
        allowReturnOutsideFunction: true,
        plugins: plugins
      };
      return { parse: (code) => babylon.parse(code, options) };
    case 'typescript-jsx':
      var babylon = require('babylon');
      var options = {
        sourceType: 'module',
        allowImportExportEverywhere: true,
        allowReturnOutsideFunction: true,
        plugins: [ 'jsx', ...plugins ]
      };
      return { parse: (code) => babylon.parse(code, options) };
    case 'babel':
    default:
      return require('../parser/babel5Compat');
  }
};
