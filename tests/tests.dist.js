(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
/*! Microbe v0.5.2 | (c) 2014-2016 Sociomantic Labs | http://m.icro.be/license */
!function(n){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=n();else if("function"==typeof define&&define.amd)define([],n);else{var t;"undefined"!=typeof window?t=window:"undefined"!=typeof global?t=global:"undefined"!=typeof self&&(t=self),t.µ=n()}}(function(){return function n(t,e,o){function r(u,f){if(!e[u]){if(!t[u]){var s="function"==typeof require&&require;if(!f&&s)return s(u,!0);if(i)return i(u,!0);var c=new Error("Cannot find module '"+u+"'");throw c.code="MODULE_NOT_FOUND",c}var a=e[u]={exports:{}};t[u][0].call(a.exports,function(n){var e=t[u][1][n];return r(e?e:n)},a,a.exports,n,t,e,o)}return e[u].exports}for(var i="function"==typeof require&&require,u=0;u<o.length;u++)r(o[u]);return r}({1:[function(n,t,e){"use strict";var o="[object Microbe-Http]",r={},i=n("./version")+"-http";n("./modules/http")(r),Object.defineProperty(r,"version",{get:function(){return i}}),Object.defineProperty(r,"type",{get:function(){return o}}),t.exports=r},{"./modules/http":9,"./version":10}],2:[function(n,t,e){(function(n){function e(){for(;r.next;){r=r.next;var n=r.task;r.task=void 0;var t=r.domain;t&&(r.domain=void 0,t.enter());try{n()}catch(o){if(s)throw t&&t.exit(),setTimeout(e,0),t&&t.enter(),o;setTimeout(function(){throw o},0)}t&&t.exit()}u=!1}function o(t){i=i.next={task:t,domain:s&&n.domain,next:null},u||(u=!0,f())}var r={task:void 0,next:null},i=r,u=!1,f=void 0,s=!1;if("undefined"!=typeof n&&n.nextTick)s=!0,f=function(){n.nextTick(e)};else if("function"==typeof setImmediate)f="undefined"!=typeof window?setImmediate.bind(window,e):function(){setImmediate(e)};else if("undefined"!=typeof MessageChannel){var c=new MessageChannel;c.port1.onmessage=e,f=function(){c.port2.postMessage(0)}}else f=function(){setTimeout(e,0)};t.exports=o}).call(this,n("_process"))},{_process:3}],3:[function(n,t,e){function o(){}var r=t.exports={};r.nextTick=function(){var n="undefined"!=typeof window&&window.setImmediate,t="undefined"!=typeof window&&window.postMessage&&window.addEventListener;if(n)return function(n){return window.setImmediate(n)};if(t){var e=[];return window.addEventListener("message",function(n){var t=n.source;if((t===window||null===t)&&"process-tick"===n.data&&(n.stopPropagation(),e.length>0)){var o=e.shift();o()}},!0),function(n){e.push(n),window.postMessage("process-tick","*")}}return function(n){setTimeout(n,0)}}(),r.title="browser",r.browser=!0,r.env={},r.argv=[],r.on=o,r.addListener=o,r.once=o,r.off=o,r.removeListener=o,r.removeAllListeners=o,r.emit=o,r.binding=function(n){throw new Error("process.binding is not supported")},r.cwd=function(){return"/"},r.chdir=function(n){throw new Error("process.chdir is not supported")}},{}],4:[function(n,t,e){"use strict";t.exports=n("./lib/core.js"),n("./lib/done.js"),n("./lib/es6-extensions.js"),n("./lib/node-extensions.js")},{"./lib/core.js":5,"./lib/done.js":6,"./lib/es6-extensions.js":7,"./lib/node-extensions.js":8}],5:[function(n,t,e){"use strict";function o(n){function t(n){return null===s?void a.push(n):void u(function(){var t=s?n.onFulfilled:n.onRejected;if(null===t)return void(s?n.resolve:n.reject)(c);var e;try{e=t(c)}catch(o){return void n.reject(o)}n.resolve(e)})}function e(n){try{if(n===p)throw new TypeError("A promise cannot be resolved with itself.");if(n&&("object"==typeof n||"function"==typeof n)){var t=n.then;if("function"==typeof t)return void i(t.bind(n),e,o)}s=!0,c=n,f()}catch(r){o(r)}}function o(n){s=!1,c=n,f()}function f(){for(var n=0,e=a.length;e>n;n++)t(a[n]);a=null}if("object"!=typeof this)throw new TypeError("Promises must be constructed via new");if("function"!=typeof n)throw new TypeError("not a function");var s=null,c=null,a=[],p=this;this.then=function(n,e){return new p.constructor(function(o,i){t(new r(n,e,o,i))})},i(n,e,o)}function r(n,t,e,o){this.onFulfilled="function"==typeof n?n:null,this.onRejected="function"==typeof t?t:null,this.resolve=e,this.reject=o}function i(n,t,e){var o=!1;try{n(function(n){o||(o=!0,t(n))},function(n){o||(o=!0,e(n))})}catch(r){if(o)return;o=!0,e(r)}}var u=n("asap");t.exports=o},{asap:2}],6:[function(n,t,e){"use strict";var o=n("./core.js"),r=n("asap");t.exports=o,o.prototype.done=function(n,t){var e=arguments.length?this.then.apply(this,arguments):this;e.then(null,function(n){r(function(){throw n})})}},{"./core.js":5,asap:2}],7:[function(n,t,e){"use strict";function o(n){this.then=function(t){return"function"!=typeof t?this:new r(function(e,o){i(function(){try{e(t(n))}catch(r){o(r)}})})}}var r=n("./core.js"),i=n("asap");t.exports=r,o.prototype=r.prototype;var u=new o(!0),f=new o(!1),s=new o(null),c=new o(void 0),a=new o(0),p=new o("");r.resolve=function(n){if(n instanceof r)return n;if(null===n)return s;if(void 0===n)return c;if(n===!0)return u;if(n===!1)return f;if(0===n)return a;if(""===n)return p;if("object"==typeof n||"function"==typeof n)try{var t=n.then;if("function"==typeof t)return new r(t.bind(n))}catch(e){return new r(function(n,t){t(e)})}return new o(n)},r.all=function(n){var t=Array.prototype.slice.call(n);return new r(function(n,e){function o(i,u){try{if(u&&("object"==typeof u||"function"==typeof u)){var f=u.then;if("function"==typeof f)return void f.call(u,function(n){o(i,n)},e)}t[i]=u,0===--r&&n(t)}catch(s){e(s)}}if(0===t.length)return n([]);for(var r=t.length,i=0;i<t.length;i++)o(i,t[i])})},r.reject=function(n){return new r(function(t,e){e(n)})},r.race=function(n){return new r(function(t,e){n.forEach(function(n){r.resolve(n).then(t,e)})})},r.prototype["catch"]=function(n){return this.then(null,n)}},{"./core.js":5,asap:2}],8:[function(n,t,e){"use strict";var o=n("./core.js"),r=n("asap");t.exports=o,o.denodeify=function(n,t){return t=t||1/0,function(){var e=this,r=Array.prototype.slice.call(arguments);return new o(function(o,i){for(;r.length&&r.length>t;)r.pop();r.push(function(n,t){n?i(n):o(t)});var u=n.apply(e,r);!u||"object"!=typeof u&&"function"!=typeof u||"function"!=typeof u.then||o(u)})}},o.nodeify=function(n){return function(){var t=Array.prototype.slice.call(arguments),e="function"==typeof t[t.length-1]?t.pop():null,i=this;try{return n.apply(this,arguments).nodeify(e,i)}catch(u){if(null===e||"undefined"==typeof e)return new o(function(n,t){t(u)});r(function(){e.call(i,u)})}}},o.prototype.nodeify=function(n,t){return"function"!=typeof n?this:void this.then(function(e){r(function(){n.call(t,null,e)})},function(e){r(function(){n.call(t,e)})})}},{"./core.js":5,asap:2}],9:[function(n,t,e){t.exports=function(t){"use strict";var e=n("promise");t.http=function(n){var t,o,r,i,u,f,s,c;if(!n)return new Error("No parameters given");if("string"==typeof n&&(n={url:n}),t=new XMLHttpRequest,o=n.method||"GET",r=n.url,i=JSON.stringify(n.data)||null,u=n.user||"",f=n.password||"",s=n.headers||null,c="boolean"==typeof n.async?n.async:!0,t.onreadystatechange=function(){return 4===t.readyState?t:void 0},t.open(o,r,c,u,f),"POST"===o&&t.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),s)for(var a in s)t.setRequestHeader(a,s[a]);if(c)return new e(function(n,e){t.onerror=function(){e(new Error("Network error!"))},t.send(i),t.onload=function(){200===t.status?n(t.response):e(new Error(t.status))}});var p=function(n){var t={then:function(e){return 200===n.status&&e(n.responseText),t},"catch":function(e){return 200!==n.status&&e({status:n.status,statusText:n.statusText}),t}};return t};return t.send(i),t.onloadend=function(){return t.onreadystatechange(),p(t)},t.onloadend()},t.http.get=function(n){return this({url:n,method:"GET"})},t.http.post=function(n,t){return this({url:n,data:t,method:"POST"})}}},{promise:4}],10:[function(n,t,e){t.exports="0.5.2"},{}]},{},[1])(1)});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(require,module,exports){
module.exports={
  "name": "stylaWidget",
  "version": "0.2.6",
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
    "md": "./node_modules/.bin/gulp md",
    "doc": "npm run md && docker -o dist/doc/ -i src --sidebar true --js dist/widget.js -c manni && cp ./dist/doc/widget.js.html ./dist/doc/index.html"
  },
  "devDependencies": {
    "babelify": "^6.3.0",
    "browserify": "^11.2.0",
    "connect": "^3.4.0",
    "docker": "git://github.com/nicolasbrugneaux/docker.git#patch-1",
    "gulp": "^3.9.0",
    "gulp-header": "^1.7.1",
    "gulp-marked": "^1.0.0",
    "gulp-minify-css": "^1.2.4",
    "gulp-rename": "^1.2.2",
    "gulp-replace": "^0.5.4",
    "gulp-uglify": "^1.5.1",
    "microbejs": "^0.5.2",
    "nightmare": "^2.1.1",
    "promise": "^7.1.1",
    "pygmentize-bundled": "^2.3.0",
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
    "liscence.md",
    "dist/",
    "src/"
  ],
  "homepage": "https://github.com/styladev/widget",
  "main": "./dist/widget.min.js",
  "keywords": []
}

},{}],3:[function(require,module,exports){
/**
 * ## build.js
 *
 * this contains methods to build the bite sized widget that do not need to be
 * outwardly facing
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _classesJs = require('./classes.js');

var _classesJs2 = _interopRequireDefault(_classesJs);

var _microbejsDistMicrobeHttpMin = require('microbejs/dist/microbe.http.min');

/*
    exchanged for css in the gulp build
 */
var baseStyles = '#styla-widget p{margin:0}#styla-widget.styla-widget__wrapper{width:100%;height:100%}#styla-widget .styla-widget__container{box-sizing:border-box;position:relative;overflow:hidden;padding:1em 2em;height:100%;width:100%;min-height:14em;display:flex;flex-direction:column;flex-wrap:wrap;font-size:14px}#styla-widget .styla-widget__story{margin-bottom:1em;overflow:hidden;height:5em;position:relative;width:100%;flex-grow:1}#styla-widget .styla-widget__link{position:absolute;height:5em;width:100%;display:flex;text-decoration:none;color:inherit}#styla-widget__link>div{display:inline-block}#styla-widget .styla-widget__imagewrap{height:85px;margin:0 3% 0 0}#styla-widget .styla-widget__image{object-fit:contain}#styla-widget .styla-widget__textwrap{display:block;flex-grow:1;max-height:100%;overflow:hidden;float:left}#styla-widget .styla-widget__headlinewrap{height:2em;display:flex;flex-direction:column;justify-content:flex-end}#styla-widget .styla-widget__headline{font-size:1.4em;line-height:1.25em;max-height:2.5em;overflow:hidden;margin:0 0 .25em;word-wrap:break-word;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2}#styla-widget .styla-widget__paragraph{font-size:1em;line-height:1.5em;height:3em;overflow:hidden;position:relative;word-wrap:break-word}#styla-widget .styla-widget__paragraph:after{position:absolute;left:0;top:7.5em;display:block;background-color:#FFF;width:100%;height:2em}';
var wrapperID = 'styla-widget';
var domainConfigAPI = 'https://live.styla.com/api/config/';
var _reportError = function _reportError(e) {
    console.log('err', e);
};

/*
    sets context for the widget.  this is bound in widget js and set in
    getDomainConfig
 */
var self = undefined;

/*
    retrieved and parsed domain config.  this is declared here to keep it out
    of the global object, yet accessible.
 */
var domainConfig = undefined;

var build = {

    /**
     * ## buildHeadline
     *
     * builds the headline and headline wrapper and fills the wrapper with the
     * element and text
     *
     * @param {String} title story headline
     *
     * @return _DOMElement_ headlineWrapper
     */
    buildHeadline: function buildHeadline(title) {
        var create = build.create;
        var headlineWrapper = create('div', _classesJs2['default'].HEADLINE_WRAPPER);
        var headline = create('h3', _classesJs2['default'].HEADLINE);

        headline.textContent = title;

        headlineWrapper.appendChild(headline);

        return headlineWrapper;
    },

    /**
     * ## buildImage
     *
     * builds the headline and headline wrapper and fills the wrapper with the
     * element and text
     *
     * @param {Array} images array of images from the product api
     * @param {String} title story headline
     * @param {Object} context sub for self - needed for testing
     *
     * @return _DOMElement_ imageWrapper
     */
    buildImage: function buildImage(images, title, context) {
        self = self || context;
        var create = build.create;
        var imageWrapper = create('div', _classesJs2['default'].IMAGE_WRAPPER);
        var id = images[0].id;

        var imgObj = self.images[id];
        var image = create('img', _classesJs2['default'].IMAGE);
        image.src = build.getImageUrl(imgObj.fileName, self.size);
        image.alt = imgObj.caption || title;
        image.title = title;

        imageWrapper.appendChild(image);

        return imageWrapper;
    },

    /**
     * ## buildStories
     *
     * after recieving the story data, this parses and build the individual
     * stories
     *
     * @param {String} domainConfig JSON response from the product api
     * @param {Object} parsedDomainConfig parsed JSON object for testing
     *
     * @return _DOMElement_ wrapper element
     */
    buildStories: function buildStories(resDomainConfig, parsedDomainConfig) {
        domainConfig = parsedDomainConfig || JSON.parse(resDomainConfig);

        if (Object.keys(domainConfig).length === 0) {
            throw 'Styla Widget error: Could not find magazine, please check if slug is configured correctly.';
        }

        build.setDomain();
        build.includeBaseStyles();

        var images = {};
        var stories = self.stories;
        var resImages = stories.images;

        if (resImages) {
            resImages.forEach(function (_i) {
                images[_i.id] = _i;
            });

            self.images = images;
            var _els = stories.stories.map(build.buildStory);

            var styling = build.compileStyles();

            document.head.appendChild(styling);
            self.target.appendChild(self.wrapper);
        }

        return self.wrapper;
    },

    /**
     * ## buildStory
     *
     * builds each story off the retrieved json
     *
     * @param {Object} json image data
     *
     * @return _DOMElement_ outer story element
     */
    buildStory: function buildStory(_ref) {
        var title = _ref.title;
        var description = _ref.description;
        var images = _ref.images;
        var externalPermalink = _ref.externalPermalink;

        var create = build.create;

        var story = create('div', _classesJs2['default'].STORY);
        var storyLink = create('a', _classesJs2['default'].STORY_LINK);
        storyLink.href = '//' + self.domain + '/story/' + externalPermalink + '/';

        if (self.newTab) {
            storyLink.setAttribute('target', '_blank');
        } else if (self.iframe) {
            storyLink.setAttribute('target', '_top');
        }

        story.appendChild(storyLink);

        storyLink.appendChild(build.buildImage(images, title));
        storyLink.appendChild(build.buildStoryText(title, description));

        var container = self.container;

        container.appendChild(story);
        self.wrapper.appendChild(container);

        return story;
    },

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
    buildStoryText: function buildStoryText(title, description) {
        var create = build.create;
        var textWrapper = create('div', _classesJs2['default'].TEXT_WRAPPER);

        var headlineWrapper = build.buildHeadline(title);
        textWrapper.appendChild(headlineWrapper);

        var paragraph = create('div', _classesJs2['default'].PARAGRAPH);
        paragraph.innerHTML = build.getDescription(JSON.parse(description));
        paragraph.innerHTML = paragraph.textContent;
        textWrapper.appendChild(paragraph);

        return textWrapper;
    },

    /**
     * ## buildStyleTag
     *
     * builds a style tag and appends it to the DOM
     *
     * @param {String} css styles to add to the created tag
     *
     * @return _DOMElement_ style element
     */
    buildStyleTag: function buildStyleTag(css) {
        var el = document.createElement('style');
        el.type = 'text/css';
        el.className = _classesJs2['default'].STYLES;

        var t = document.createTextNode(css);
        el.appendChild(t);

        return el;
    },

    /**
     * ## compileStyles
     *
     * compiles the styles and returns them added to the style tag
     *
     * @return _DOMElement_ style element
     */
    compileStyles: function compileStyles() {
        var theme = domainConfig.theme;
        var css = '.' + _classesJs2['default'].HEADLINE + '\n            {\n                font-family:        ' + theme.hff + ';\n                font-weight:        ' + theme.hfw + ';\n                font-style:         ' + theme.hfs + ';\n                text-decoration:    ' + theme.htd + ';\n                letter-spacing:     ' + theme.hls + ';\n                color:              ' + theme.htc + ';\n            }\n            .' + _classesJs2['default'].PARAGRAPH + '\n            {\n                font-family:        ' + theme.sff + ';\n                font-weight:        ' + theme.sfw + ';\n                color:              ' + theme.stc + ';\n            }\n            .' + _classesJs2['default'].PARAGRAPH + ':after\n            {\n                content:            \'' + theme.strm + '\';\n                font-weight:        ' + theme.strmw + ';\n                text-decoration:    ' + theme.strmd + ';\n            }';

        return build.buildStyleTag(css);
    },

    /**
     * ## create
     *
     * creates an element with the supplied tagname and classname
     *
     * @param {String} tag tagname
     * @param {String} clss className to add to the created element
     *
     * @return _DOMElement_ newly created element
     */
    create: function create(tag, clss) {
        var _el = document.createElement(tag.toUpperCase());

        if (clss) {
            _el.className = clss;
        }

        return _el;
    },

    /**
     * ## getDescription
     *
     * gets the first text description in the content and returns that
     *
     * @param {Array} arr array filled w/ content
     * @param {Number} i recursive index
     *
     * @return _String or Boolean_ text content or false
     */
    getDescription: function getDescription(arr) {
        var i = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

        var text = arr[i];

        if (!text) {
            return false;
        } else if (text.type !== 'text') {
            return build.getDescription(arr, i + 1);
        }

        return text.content;
    },

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
    getDomainConfig: function getDomainConfig(stories) {
        self = this;

        self.stories = JSON.parse(stories);
        var container = self.container = build.create('DIV', _classesJs2['default'].CONTAINER);

        var title = self.title = build.create('DIV', 'title');
        title.text = self.title;

        var wrapper = self.wrapper = build.create('DIV', _classesJs2['default'].WRAPPER);
        wrapper.id = wrapperID;

        _microbejsDistMicrobeHttpMin.http.get(domainConfigAPI + self.slug).then(build.buildStories)['catch'](_reportError);

        return container;
    },

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
    getImageUrl: function getImageUrl(filename) {
        var size = arguments.length <= 1 || arguments[1] === undefined ? 400 : arguments[1];

        return '//img.styla.com/resizer/sfh_' + size + 'x0/_' + filename + '?still';
    },

    /**
     * ## includeBaseStyles
     *
     * creates the base styles DOM element and adds it to the head
     *
     * @return _Void_
     */
    includeBaseStyles: function includeBaseStyles() {
        var head = document.head;
        var el = build.buildStyleTag(baseStyles);
        el.className = _classesJs2['default'].BASE_STYLES;

        head.appendChild(el);

        if (domainConfig.embed.customFontUrl) {
            build.includeFonts(head);
        }

        return el;
    },

    /**
     * ## includeFonts
     *
     * includes the webfonts link element
     *
     * @return _DOMElement_ link element
     */
    includeFonts: function includeFonts() {
        var el = document.createElement('link');
        el.type = 'text/css';
        el.rel = 'stylesheet';
        el.href = domainConfig.embed.customFontUrl;

        document.head.appendChild(el);

        return el;
    },

    /**
     * ## setDomain
     *
     * takes pieces of the domainConfig and builds the domain
     *
     * @return _String_ domain address
     */
    setDomain: function setDomain() {
        var embed = domainConfig.embed;
        var domain = self.domain = embed.magazineUrl + '/' + embed.rootPath;

        return domain;
    }
};

exports['default'] = build;
module.exports = exports['default'];

},{"./classes.js":4,"microbejs/dist/microbe.http.min":1}],4:[function(require,module,exports){
/**
 * ## classes.js
 *
 * this sets class constants throughout the widget for the sake of future
 * flexability
 */
'use strict';

module.exports = {
    WRAPPER: 'styla-widget__wrapper',
    CONTAINER: 'styla-widget__container',
    TEXT_WRAPPER: 'styla-widget__textwrap',
    HEADLINE: 'styla-widget__headline',
    HEADLINE_WRAPPER: 'styla-widget__headlinewrap',
    IMAGE: 'styla-widget__image',
    IMAGE_WRAPPER: 'styla-widget__imagewrap',
    STORY: 'styla-widget__story',
    PARAGRAPH: 'styla-widget__paragraph',
    STORY_LINK: 'styla-widget__link',
    BASE_STYLES: 'styla-widget__base-styling',
    STYLES: 'styla-widget__styling'
};

},{}],5:[function(require,module,exports){
'use strict';

module.exports = '0.2.6';

},{}],6:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _unitVersionTest = require('./unit/versionTest');

var _unitVersionTest2 = _interopRequireDefault(_unitVersionTest);

var _unitBuildTest = require('./unit/buildTest');

var _unitBuildTest2 = _interopRequireDefault(_unitBuildTest);

window.onload = function () {
    var widget = window.stylaWidget;

    document.getElementsByTagName('TITLE')[0].textContent = 'StylaWidget - ' + widget.version;

    (0, _unitVersionTest2['default'])(widget);
    (0, _unitBuildTest2['default'])(widget);
};

},{"./unit/buildTest":7,"./unit/versionTest":8}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _srcBuildJs = require('../../src/build.js');

var _srcBuildJs2 = _interopRequireDefault(_srcBuildJs);

var _srcClassesJs = require('../../src/classes.js');

var _srcClassesJs2 = _interopRequireDefault(_srcClassesJs);

var _microbejsDistMicrobeHttpMin = require('microbejs/dist/microbe.http.min');

var domainConfigAPI = 'https://www.amazine.com/api/config/';

var tests = function tests(stylaWidget) {
    _microbejsDistMicrobeHttpMin.http.get(domainConfigAPI + stylaWidget.slug).then(function (domainConfig) {
        domainConfig = JSON.parse(domainConfig);

        var storiesUrl = 'https://www.amazine.com/api/feeds/userTag/' + stylaWidget.slug + '/tag/' + stylaWidget.tag + '?offset=' + stylaWidget.offset + '&limit=' + stylaWidget.limit + '&domain=' + stylaWidget.slug;

        _microbejsDistMicrobeHttpMin.http.get(storiesUrl).then(function (stories) {
            QUnit.module('build.js');

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
                var headlineWrapper = _srcBuildJs2['default'].buildHeadline('moon?');
                var headline = headlineWrapper.childNodes;

                assert.ok(headlineWrapper.nodeType === 1, 'headlineWrapper is a dom element');
                assert.equal(headlineWrapper.className, _srcClassesJs2['default'].HEADLINE_WRAPPER, 'headlineWrapper has correct class name');
                assert.equal(headline.length, 1, 'headlineWrapper has only one child');

                headline = headline[0];
                assert.equal(headline.className, _srcClassesJs2['default'].HEADLINE, 'headline has correct class name');
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
                var id = stylaWidget.stories.images[0].id;

                var imageWrapper = _srcBuildJs2['default'].buildImage([{ id: id }], 'moon?', stylaWidget);

                assert.ok(imageWrapper.nodeType === 1, 'imageWrapper is a dom element');
                assert.equal(imageWrapper.className, _srcClassesJs2['default'].IMAGE_WRAPPER, 'imageWrapper has correct class name');

                var image = imageWrapper.childNodes;

                assert.equal(image.length, 1, 'imageWrapper has only one child');

                image = image[0];
                assert.equal(image.className, _srcClassesJs2['default'].IMAGE, 'image has correct class name');
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
                var wrapper = _srcBuildJs2['default'].buildStories(false, domainConfig);
                assert.ok(wrapper.nodeType === 1, 'Wrapper is a dom element');
                assert.equal(wrapper.className, _srcClassesJs2['default'].WRAPPER, 'Wrapper has correct class name');
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

                var story = _srcBuildJs2['default'].buildStory(storyObj);

                assert.ok(story.nodeType === 1, 'Wrapper is a dom element');
                assert.equal(story.className, _srcClassesJs2['default'].STORY, 'Wrapper has correct class name');

                var storyLink = story.childNodes;
                assert.equal(storyLink.length, 1, 'story has only one child');
                storyLink = storyLink[0];

                assert.equal(storyLink.className, _srcClassesJs2['default'].STORY_LINK, 'storyLink has correct class name');

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
                var textWrapper = _srcBuildJs2['default'].buildStoryText('moon?', '[{"type":"text","content":"description"}]');

                assert.ok(textWrapper.nodeType === 1, 'Wrapper is a dom element');
                assert.equal(textWrapper.className, _srcClassesJs2['default'].TEXT_WRAPPER, 'Wrapper has correct class name');

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
                var el = _srcBuildJs2['default'].buildStyleTag('moon');

                assert.ok(el.nodeType === 1, 'StyleTag is a dom element');
                assert.equal(el.tagName, 'STYLE', 'StyleTag is a style tag');
                assert.equal(el.className, _srcClassesJs2['default'].STYLES, 'StyleTag class is set');
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
                var el = _srcBuildJs2['default'].compileStyles(domainConfig);

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
                var el = _srcBuildJs2['default'].create('moon', 'doge');

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

                var text = _srcBuildJs2['default'].getDescription(_arr);

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
                var el = _srcBuildJs2['default'].getDomainConfig.call(stylaWidget, stories);
                assert.ok(el.nodeType === 1, 'Story is a dom element');
                assert.equal(el.className, _srcClassesJs2['default'].CONTAINER, 'Story has correct class name');
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
                var url = _srcBuildJs2['default'].getImageUrl('moon', 399);

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
                var el = _srcBuildJs2['default'].includeBaseStyles(domainConfig);

                assert.ok(el.nodeType === 1, 'StyleTag is a dom element');
                assert.equal(el.tagName, 'STYLE', 'StyleTag is a style tag');
                assert.equal(el.className, _srcClassesJs2['default'].BASE_STYLES, 'StyleTag class is set');
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
                var el = _srcBuildJs2['default'].includeFonts(domainConfig);

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
                var domain = _srcBuildJs2['default'].setDomain(domainConfig);

                var embed = domainConfig.embed;
                var _domain = embed.magazineUrl + '/' + embed.rootPath;

                assert.equal(typeof domain, 'string', 'domain is a string');
                assert.equal(domain, _domain, 'domain is correct');
            });
        })['catch'](function (e) {
            return console.log('stories retrieval error: ', e);
        });
    })['catch'](function (e) {
        return console.log('domainConfig retrieval error: ', e);
    });
};

exports['default'] = tests;
module.exports = exports['default'];

},{"../../src/build.js":3,"../../src/classes.js":4,"microbejs/dist/microbe.http.min":1}],8:[function(require,module,exports){

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

},{"../../package.json":2,"../../src/version.js":5}]},{},[6]);
