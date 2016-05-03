(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports={
  "name": "stylaWidget",
  "version": "0.0.1",
    "contributors": [
    "Mouse Braun <mouse@styla.com>",
    "Elias Liedholm <elias@styla.com>"
  ],
  "description": "small, bite-sized styla feeds",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/styladev/widget.git"
  },
  "scripts": {
    "build": "./node_modules/.bin/gulp && npm test",
    "buildTests": "./node_modules/.bin/gulp buildTests",
    "demo": "./node_modules/.bin/gulp demo",
    "gulp": "./node_modules/.bin/gulp",
    "test": "node --harmony ./scripts/nightmare.js",
    "versionBump": "node ./scripts/version_bump.js"
  },
  "devDependencies": {
    "babelify": "^6.3.0",
    "browserify": "^11.2.0",
    "connect": "^3.4.0",
    "gulp": "^3.9.0",
    "gulp-header": "^1.7.1",
    "gulp-uglify": "^1.5.1",
    "microbejs": "^0.5.2",
    "nightmare": "^2.1.1",
    "promise": "^7.1.1",
    "qunitjs": "^1.20.0",
    "serve-static": "^1.10.0",
    "vo": "^1.0.3"
  },
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/styladev/widget/issues"
  },
  "files": [
    "CODE_OF_CONDUCT.md",
    "README.md",
    "src/",
    "dist/"
  ],
  "homepage": "https://github.com/styladev/widget",
  "main": "./dist/index.js",
  "keywords": [
  ]
}

},{}],2:[function(require,module,exports){
'use strict';

module.exports = '0.0.1';

},{}],3:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _unitVersionTest = require('./unit/versionTest');

var _unitVersionTest2 = _interopRequireDefault(_unitVersionTest);

var stylaWidget = new StylaWidget('braunhamburg');

(0, _unitVersionTest2['default'])(stylaWidget);

},{"./unit/versionTest":4}],4:[function(require,module,exports){

/* global document, QUnit  */
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _srcVersionJs = require('../../src/version.js');

var _srcVersionJs2 = _interopRequireDefault(_srcVersionJs);

var _packageJson = require('../../package.json');

var _packageJson2 = _interopRequireDefault(_packageJson);

var tests = function tests(stylaWidget) {
    QUnit.module('version.js');

    /*
     * ## version tests
     *
     * @test exists
     * @test matches the package file
     */
    QUnit.test('version', function (assert) {
        assert.ok(_srcVersionJs2['default'], 'exists');
        assert.equal(_srcVersionJs2['default'], _packageJson2['default'].version, 'versions match file');
        assert.equal(_srcVersionJs2['default'], stylaWidget.version, 'versions match stylaWidget');
    });
};

exports['default'] = tests;
module.exports = exports['default'];

},{"../../package.json":1,"../../src/version.js":2}]},{},[3]);
