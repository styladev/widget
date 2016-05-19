(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports={
  "name": "stylaWidget",
  "version": "0.2.0",
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
    "doc":"docker -o dist/doc/ -i src --sidebar true --js dist/widget.js -c manni && cp ./dist/doc/widget.js.html ./dist/doc/index.html && cp ./src/distIndex.html ./dist/index.html"
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

module.exports = '0.2.0';

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

// import build    from './build.js';
// import classes  from './classes.js';

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
var tests = function tests(stylaWidget) {
    var http = stylaWidget.http;

    http.get(stylaWidget.domainConfigAPI + stylaWidget.slug).then(function (domainConfig) {
        domainConfig = JSON.parse(domainConfig);

        var storiesUrl = 'https://www.amazine.com/api/feeds/userTag/' + stylaWidget.slug + '/tag/' + stylaWidget.tag + '?offset=' + stylaWidget.offset + '&limit=' + stylaWidget.limit + '&domain=' + stylaWidget.slug;

        http.get(storiesUrl).then(function (stories) {
            QUnit.module('widget.js');

            /**
             * ## buildHeadline - tests
             *
             * builds the headline and headline wrapper and fills the wrapper with the
             * element and text
             *
             * @param {String} title story headline
             *
             * @return _DOMElement_ headlineWrapper
             */
            QUnit.test('buildHeadline', function (assert) {
                var headlineWrapper = stylaWidget.buildHeadline('moon?');
                var headline = headlineWrapper.childNodes;

                assert.ok(headlineWrapper.nodeType === 1, 'headlineWrapper is a dom element');
                assert.equal(headlineWrapper.className, classes.HEADLINE_WRAPPER, 'headlineWrapper has correct class name');
                assert.equal(headline.length, 1, 'headlineWrapper has only one child');

                headline = headline[0];
                assert.equal(headline.className, classes.HEADLINE, 'headline has correct class name');
                assert.equal(headline.textContent, 'moon?', 'headline has correct text');
            });

            /**
             * ## buildImage - tests
             *
             * builds the headline and headline wrapper and fills the wrapper with the
             * element and text
             *
             * @param {Array} images array of images from the product api
             * @param {String} title story headline
             *
             * @return _DOMElement_ imageWrapper
             */
            QUnit.test('buildImage', function (assert) {
                var classes = classes;
                var id = Object.keys(stylaWidget.images)[0];
                var imageWrapper = stylaWidget.buildImage([{ id: id }], 'moon?');

                assert.ok(imageWrapper.nodeType === 1, 'imageWrapper is a dom element');
                assert.equal(imageWrapper.className, classes.IMAGE_WRAPPER, 'imageWrapper has correct class name');

                var image = imageWrapper.childNodes;

                assert.equal(image.length, 1, 'imageWrapper has only one child');

                image = image[0];
                assert.equal(image.className, classes.IMAGE, 'image has correct class name');
                assert.equal(image.title, 'moon?', 'image has correct title');
            });

            /**
             * ## buildStories - tests
             *
             * after recieving the story data, this parses and build the individual
             * stories
             *
             * @param {String} domainConfig JSON response from the product api
             * @param {Object} parsedDomainConfig parsed JSON object for testing
             *
             * @return _DOMElement_ wrapper element
             */
            QUnit.test('buildStories', function (assert) {
                var wrapper = stylaWidget.buildStories(false, domainConfig);
                assert.ok(wrapper.nodeType === 1, 'Wrapper is a dom element');
                assert.equal(wrapper.className, classes.WRAPPER, 'Wrapper has correct class name');
            });

            /**
             * ## buildStory
             *
             * builds each story off the retrieved json
             *
             * @param {Object} json image data
             *
             * @return _DOMElement_ outer story element
             */
            QUnit.test('buildStory', function (assert) {
                var id = Object.keys(stylaWidget.images)[0];

                var storyObj = {
                    title: 'moon?',
                    description: '[{"type":"text","content":"description"}]',
                    images: [{ id: id }],
                    externalPermalink: 'externalPermalink'
                };

                var story = stylaWidget.buildStory(storyObj);

                assert.ok(story.nodeType === 1, 'Wrapper is a dom element');
                assert.equal(story.className, classes.STORY, 'Wrapper has correct class name');

                var storyLink = story.childNodes;
                assert.equal(storyLink.length, 1, 'story has only one child');
                storyLink = storyLink[0];

                assert.equal(storyLink.className, classes.STORY_LINK, 'storyLink has correct class name');

                var href = storyLink.href.replace(/^https?:/, '');
                assert.equal(href, '//' + stylaWidget.domain + '/story/externalPermalink/', 'storyLink has correct href');
            });

            /**
             * ## buildStoryText
             *
             * builds the story text (including headline and content), combines them
             * and returns the outer wrapper
             *
             * @param {String} title story headline
             * @param {String} description copy of the story to be inserted
             *
             * @return _DOMElement_ style element
             */
            QUnit.test('buildStoryText', function (assert) {
                var textWrapper = stylaWidget.buildStoryText('moon?', '[{"type":"text","content":"description"}]');

                assert.ok(textWrapper.nodeType === 1, 'Wrapper is a dom element');
                assert.equal(textWrapper.className, classes.TEXT_WRAPPER, 'Wrapper has correct class name');

                var children = textWrapper.childNodes;
                assert.equal(children.length, 2, 'textWrapper has 2 children');

                assert.equal(children[0].innerHTML, '<h1 class="styla-widget__headline">moon?</h1>', 'headline is set right');
                assert.equal(children[1].innerHTML, 'description', 'description is set right');
            });

            /**
             * ## buildStyleTag
             *
             * builds a style tag and appends it to the DOM
             *
             * @param {Object} domain configuration of magazine
             *
             * @return _DOMElement_ style element
             */
            QUnit.test('buildStyleTag', function (assert) {
                var el = stylaWidget.buildStyleTag('moon');

                assert.ok(el.nodeType === 1, 'StyleTag is a dom element');
                assert.equal(el.tagName, 'STYLE', 'StyleTag is a style tag');
                assert.equal(el.className, classes.STYLES, 'StyleTag class is set');
                assert.equal(el.type, 'text/css', 'StyleTag is a css tag');
            });

            /**
             * ## compileStyles
             *
             * compiles the styles and returns them added to the style tag
             *
             * @param {Object} domain configuration of magazine
             *
             * @return _DOMElement_ style element
             */
            QUnit.test('compileStyles', function (assert) {
                var el = stylaWidget.compileStyles(domainConfig);

                assert.ok(el.nodeType === 1, 'Styles is a dom element');
                assert.equal(el.textContent[0], '.', 'Styles css is set');
            });

            /**
             * ## create
             *
             * creates an element with the supplied tagname and classname
             *
             * @param {String} _tag tagname
             * @param {String} _class className to add to the created element
             *
             * @return _DOMElement_ newly created element
             */
            QUnit.test('create', function (assert) {
                var el = stylaWidget.create('moon', 'doge');

                assert.ok(el.nodeType === 1, 'element is a dom element');
                assert.equal(el.tagName, 'MOON', 'element is a style tag');
                assert.equal(el.className, 'doge', 'element has the correct class');
            });

            /**
             * ## getDescription
             *
             * gets the first text description in the content and returns that
             *
             * @param {Array} _arr array filled w/ content
             * @param {Number} i recursive index
             *
             * @return _String or Boolean_ text content or false
             */
            QUnit.test('getDescription', function (assert) {
                var _arr = [{ type: 'moon' }, { type: 'text', content: 'doge' }, { type: 'moon' }, { type: 'moon' }];

                var text = stylaWidget.getDescription(_arr);

                assert.equal(text, 'doge', 'story text is set correctly');
            });

            /**
             * ## getDomainConfig
             *
             * after recieving the story data this sends it to buildStories for
             * processing
             *
             * @param {String} res JSON response from the product api
             *
             * @return _DOMElement_ container element
             */
            QUnit.test('getDomainConfig', function (assert) {
                var el = stylaWidget.getDomainConfig(stories);
                assert.ok(el.nodeType === 1, 'Story is a dom element');
                assert.equal(el.className, classes.CONTAINER, 'Story has correct class name');
            });

            /**
             * ## getImageUrl
             *
             * uses the filename and size to create the full image url
             *
             * @param {String} filename from the image data object
             * @param {Number or String} size width to grab from the server
             *
             * @return _String_ file name
             */
            QUnit.test('getImageUrl', function (assert) {
                var url = stylaWidget.getImageUrl('moon', 399);

                assert.equal(url, '//img.styla.com/resizer/sfh_399x0/_moon?still', 'image url is set correctly');
            });

            /**
             * ## includeBaseStyles
             *
             * creates the base styles DOM element and adds it to the head
             *
             * @return _Void_
             */
            QUnit.test('includeBaseStyles', function (assert) {
                var el = stylaWidget.includeBaseStyles(domainConfig);

                assert.ok(el.nodeType === 1, 'StyleTag is a dom element');
                assert.equal(el.tagName, 'STYLE', 'StyleTag is a style tag');
                assert.equal(el.className, classes.BASE_STYLES, 'StyleTag class is set');
                assert.equal(el.type, 'text/css', 'StyleTag is a css tag');
                assert.equal(el.parentNode, document.head, 'StyleTag is mounted correctly');
                assert.equal(el.textContent.indexOf('#styla-widget'), 0, 'StyleTag contains the correct info');
            });

            /**
             * ## includeFonts
             *
             * includes the webfonts link element
             *
             * @param {Object} domain configuration of magazine
             *
             * @return _DOMElement_ link element
             */
            QUnit.test('includeFonts', function (assert) {
                var el = stylaWidget.includeFonts(domainConfig);

                assert.ok(el.nodeType === 1, 'Font tag is a dom element');
                assert.equal(el.tagName, 'LINK', 'font tag is a style tag');
                assert.equal(el.rel, 'stylesheet', 'font tag class is set');
                assert.equal(el.type, 'text/css', 'font tag is a css tag');
                assert.equal(el.href, window.location.protocol + domainConfig.embed.customFontUrl, 'font tag points to the right css');
            });

            /**
             * ## setDomain
             *
             * takes pieces of the domainConfig and builds the domain
             *
             * @param {Object} domainConfig main config object
             *
             * @return _String_ domain address
             */
            QUnit.test('setDomain', function (assert) {
                var domain = stylaWidget.setDomain(domainConfig);

                var embed = domainConfig.embed;
                var _domain = embed.magazineUrl + '/' + embed.rootPath;

                assert.equal(typeof domain, 'string', 'domain is a string');
                assert.equal(domain, _domain, 'domain is correct');
            });
        })['catch'](function (e) {
            return console.log(e);
        });
    })['catch'](function (e) {
        return console.log(e);
    });
};

exports['default'] = tests;
module.exports = exports['default'];

},{}]},{},[3]);
