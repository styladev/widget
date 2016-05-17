(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports={
  "name": "stylaWidget",
  "version": "0.1.6",
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
    "build": "./node_modules/.bin/gulp && npm run doc && npm test",
    "buildTests": "./node_modules/.bin/gulp buildTests",
    "css-min": "./node_modules/.bin/gulp css-min",
    "gulp": "./node_modules/.bin/gulp",
    "test": "node --harmony ./scripts/nightmare.js",
    "versionBump": "node ./scripts/version_bump.js",
    "doc":"docker -o dist/doc/ -i src --sidebar true --js dist/widget.js -c manni && cp ./dist/doc/widget.js.html ./dist/doc/index.html"
  },
  "devDependencies": {
    "babelify": "^6.3.0",
    "browserify": "^11.2.0",
    "connect": "^3.4.0",
    "docker": "git://github.com/nicolasbrugneaux/docker.git#patch-1",
    "gulp": "^3.9.0",
    "gulp-header": "^1.7.1",
    "gulp-minify-css": "^1.2.4",
    "gulp-rename": "^1.2.2",
    "gulp-replace": "^0.5.4",
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
  "keywords": []
}

},{}],2:[function(require,module,exports){
'use strict';

module.exports = '0.1.6';

},{}],3:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _unitVersionTest = require('./unit/versionTest');

var _unitVersionTest2 = _interopRequireDefault(_unitVersionTest);

var _unitWidgetTest = require('./unit/widgetTest');

var _unitWidgetTest2 = _interopRequireDefault(_unitWidgetTest);

window.onload = function () {
    var widget = window.stylaWidget.instance;

    document.getElementsByTagName('TITLE')[0].textContent = 'StylaWidget - ' + widget.version;

    (0, _unitVersionTest2['default'])(widget);
    (0, _unitWidgetTest2['default'])(widget);
};

},{"./unit/versionTest":4,"./unit/widgetTest":5}],4:[function(require,module,exports){

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

},{"../../package.json":1,"../../src/version.js":2}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
var tests = function tests(stylaWidget) {
    QUnit.module('widget.js');

    QUnit.test('buildStories', function (assert) {
        var buildStoriesTest = assert.async();
        var url = 'https://www.amazine.com/api/feeds/user/' + stylaWidget.slug + '?domain=' + stylaWidget.slug + '&offset=0&limit=5';
        stylaWidget.http.get(url).then(function (stories) {
            var container = stylaWidget.buildStories(stories);
            assert.ok(container.nodeType === 1, 'Container is a dom element');
            assert.equal(container.className, stylaWidget.classes.CONTAINER, 'Container has correct class name');
            buildStoriesTest();
        })['catch'](function (e) {
            return console.log(e);
        });
    });

    QUnit.test('getDomainCofig', function (assert) {
        var buildStoryTest = assert.async();
        var url = 'https://www.amazine.com/api/feeds/user/' + stylaWidget.slug + '?domain=' + stylaWidget.slug + '&offset=0&limit=5';
        stylaWidget.http.get(url).then(function (stories) {
            var images = {};
            stories = JSON.parse(stories);
            stories.images.forEach(function (_i) {
                images[_i.id] = _i;
            });
            stylaWidget.images = images;

            var story = stories.stories.map(stylaWidget.getDomainCofig);
            assert.ok(story[0].nodeType === 1, 'Story is a dom element');
            assert.equal(story[0].className, stylaWidget.classes.STORY, 'Story has correct class name');
            buildStoryTest();
        })['catch'](function (e) {
            return console.log(e);
        });
    });

    QUnit.test('buildStyles', function (assert) {
        var buildStyles = assert.async();

        stylaWidget.http.get(stylaWidget.domainConfigAPI + stylaWidget.slug).then(function (domainConfig) {
            domainConfig = JSON.parse(domainConfig);

            var el = stylaWidget.buildStyles(domainConfig);

            assert.ok(el.nodeType === 1, 'Styles is a dom element');
            assert.equal(el.textContent[0], '.', 'Styles css is set');
            buildStyles();
        })['catch'](function (e) {
            return console.log(e);
        });
    });

    QUnit.test('buildStyleTag', function (assert) {
        var el = stylaWidget.buildStyleTag('moon');

        assert.ok(el.nodeType === 1, 'StyleTag is a dom element');
        assert.equal(el.tagName, 'STYLE', 'StyleTag is a style tag');
        assert.equal(el.className, stylaWidget.classes.STYLES, 'StyleTag class is set');
        assert.equal(el.type, 'text/css', 'StyleTag is a css tag');
    });

    QUnit.test('create', function (assert) {
        var el = stylaWidget.create('moon', 'doge');

        assert.ok(el.nodeType === 1, 'element is a dom element');
        assert.equal(el.tagName, 'MOON', 'element is a style tag');
        assert.equal(el.className, 'doge', 'element has the correct class');
    });

    QUnit.test('getDescription', function (assert) {
        var _arr = [{ type: 'moon' }, { type: 'text', content: 'doge' }, { type: 'moon' }, { type: 'moon' }];

        var text = stylaWidget.getDescription(_arr);

        assert.equal(text, 'doge');
    });

    QUnit.test('getImageUrl', function (assert) {
        var url = stylaWidget.getImageUrl('moon', 399);

        assert.equal(url, '//img.styla.com/resizer/sfh_399x0/_moon?still');
    });

    QUnit.test('includeBaseStyles', function (assert) {
        var el = stylaWidget.includeBaseStyles();

        assert.ok(el.nodeType === 1, 'StyleTag is a dom element');
        assert.equal(el.tagName, 'STYLE', 'StyleTag is a style tag');
        assert.equal(el.className, stylaWidget.classes.BASE_STYLES, 'StyleTag class is set');
        assert.equal(el.type, 'text/css', 'StyleTag is a css tag');
        assert.equal(el.parentNode, document.head, 'StyleTag is mounted correctly');
        assert.equal(el.textContent.indexOf('#styla-widget'), 0, 'StyleTag contains the correct info');
    });

    QUnit.test('includeFonts', function (assert) {
        var buildStyles = assert.async();

        stylaWidget.http.get(stylaWidget.domainConfigAPI + stylaWidget.slug).then(function (domainConfig) {
            domainConfig = JSON.parse(domainConfig);

            var el = stylaWidget.includeFonts(domainConfig);

            assert.ok(el.nodeType === 1, 'Font tag is a dom element');
            assert.equal(el.tagName, 'LINK', 'font tag is a style tag');
            assert.equal(el.rel, 'stylesheet', 'font tag class is set');
            assert.equal(el.type, 'text/css', 'font tag is a css tag');
            assert.equal(el.href, window.location.protocol + domainConfig.embed.customFontUrl, 'font tag points to the right css');

            buildStyles();
        })['catch'](function (e) {
            return console.log(e);
        });
    });
};

exports['default'] = tests;
module.exports = exports['default'];

},{}]},{},[3]);
