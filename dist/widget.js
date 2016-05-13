/*!
 * Styla bite-sized widget v0.1.4
 * https://github.com/styladev/widget
 *
 * Copyright 2016 Styla GmbH and other contributors
 * Released under the MIT license
 * https://github.com/styladev/widget/license.md
 *
 * Date: Fri May 13 2016
 * */
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
/*! Microbe v0.5.2 | (c) 2014-2016 Sociomantic Labs | http://m.icro.be/license */
!function(n){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=n();else if("function"==typeof define&&define.amd)define([],n);else{var t;"undefined"!=typeof window?t=window:"undefined"!=typeof global?t=global:"undefined"!=typeof self&&(t=self),t.µ=n()}}(function(){return function n(t,e,o){function r(u,f){if(!e[u]){if(!t[u]){var s="function"==typeof require&&require;if(!f&&s)return s(u,!0);if(i)return i(u,!0);var c=new Error("Cannot find module '"+u+"'");throw c.code="MODULE_NOT_FOUND",c}var a=e[u]={exports:{}};t[u][0].call(a.exports,function(n){var e=t[u][1][n];return r(e?e:n)},a,a.exports,n,t,e,o)}return e[u].exports}for(var i="function"==typeof require&&require,u=0;u<o.length;u++)r(o[u]);return r}({1:[function(n,t,e){"use strict";var o="[object Microbe-Http]",r={},i=n("./version")+"-http";n("./modules/http")(r),Object.defineProperty(r,"version",{get:function(){return i}}),Object.defineProperty(r,"type",{get:function(){return o}}),t.exports=r},{"./modules/http":9,"./version":10}],2:[function(n,t,e){(function(n){function e(){for(;r.next;){r=r.next;var n=r.task;r.task=void 0;var t=r.domain;t&&(r.domain=void 0,t.enter());try{n()}catch(o){if(s)throw t&&t.exit(),setTimeout(e,0),t&&t.enter(),o;setTimeout(function(){throw o},0)}t&&t.exit()}u=!1}function o(t){i=i.next={task:t,domain:s&&n.domain,next:null},u||(u=!0,f())}var r={task:void 0,next:null},i=r,u=!1,f=void 0,s=!1;if("undefined"!=typeof n&&n.nextTick)s=!0,f=function(){n.nextTick(e)};else if("function"==typeof setImmediate)f="undefined"!=typeof window?setImmediate.bind(window,e):function(){setImmediate(e)};else if("undefined"!=typeof MessageChannel){var c=new MessageChannel;c.port1.onmessage=e,f=function(){c.port2.postMessage(0)}}else f=function(){setTimeout(e,0)};t.exports=o}).call(this,n("_process"))},{_process:3}],3:[function(n,t,e){function o(){}var r=t.exports={};r.nextTick=function(){var n="undefined"!=typeof window&&window.setImmediate,t="undefined"!=typeof window&&window.postMessage&&window.addEventListener;if(n)return function(n){return window.setImmediate(n)};if(t){var e=[];return window.addEventListener("message",function(n){var t=n.source;if((t===window||null===t)&&"process-tick"===n.data&&(n.stopPropagation(),e.length>0)){var o=e.shift();o()}},!0),function(n){e.push(n),window.postMessage("process-tick","*")}}return function(n){setTimeout(n,0)}}(),r.title="browser",r.browser=!0,r.env={},r.argv=[],r.on=o,r.addListener=o,r.once=o,r.off=o,r.removeListener=o,r.removeAllListeners=o,r.emit=o,r.binding=function(n){throw new Error("process.binding is not supported")},r.cwd=function(){return"/"},r.chdir=function(n){throw new Error("process.chdir is not supported")}},{}],4:[function(n,t,e){"use strict";t.exports=n("./lib/core.js"),n("./lib/done.js"),n("./lib/es6-extensions.js"),n("./lib/node-extensions.js")},{"./lib/core.js":5,"./lib/done.js":6,"./lib/es6-extensions.js":7,"./lib/node-extensions.js":8}],5:[function(n,t,e){"use strict";function o(n){function t(n){return null===s?void a.push(n):void u(function(){var t=s?n.onFulfilled:n.onRejected;if(null===t)return void(s?n.resolve:n.reject)(c);var e;try{e=t(c)}catch(o){return void n.reject(o)}n.resolve(e)})}function e(n){try{if(n===p)throw new TypeError("A promise cannot be resolved with itself.");if(n&&("object"==typeof n||"function"==typeof n)){var t=n.then;if("function"==typeof t)return void i(t.bind(n),e,o)}s=!0,c=n,f()}catch(r){o(r)}}function o(n){s=!1,c=n,f()}function f(){for(var n=0,e=a.length;e>n;n++)t(a[n]);a=null}if("object"!=typeof this)throw new TypeError("Promises must be constructed via new");if("function"!=typeof n)throw new TypeError("not a function");var s=null,c=null,a=[],p=this;this.then=function(n,e){return new p.constructor(function(o,i){t(new r(n,e,o,i))})},i(n,e,o)}function r(n,t,e,o){this.onFulfilled="function"==typeof n?n:null,this.onRejected="function"==typeof t?t:null,this.resolve=e,this.reject=o}function i(n,t,e){var o=!1;try{n(function(n){o||(o=!0,t(n))},function(n){o||(o=!0,e(n))})}catch(r){if(o)return;o=!0,e(r)}}var u=n("asap");t.exports=o},{asap:2}],6:[function(n,t,e){"use strict";var o=n("./core.js"),r=n("asap");t.exports=o,o.prototype.done=function(n,t){var e=arguments.length?this.then.apply(this,arguments):this;e.then(null,function(n){r(function(){throw n})})}},{"./core.js":5,asap:2}],7:[function(n,t,e){"use strict";function o(n){this.then=function(t){return"function"!=typeof t?this:new r(function(e,o){i(function(){try{e(t(n))}catch(r){o(r)}})})}}var r=n("./core.js"),i=n("asap");t.exports=r,o.prototype=r.prototype;var u=new o(!0),f=new o(!1),s=new o(null),c=new o(void 0),a=new o(0),p=new o("");r.resolve=function(n){if(n instanceof r)return n;if(null===n)return s;if(void 0===n)return c;if(n===!0)return u;if(n===!1)return f;if(0===n)return a;if(""===n)return p;if("object"==typeof n||"function"==typeof n)try{var t=n.then;if("function"==typeof t)return new r(t.bind(n))}catch(e){return new r(function(n,t){t(e)})}return new o(n)},r.all=function(n){var t=Array.prototype.slice.call(n);return new r(function(n,e){function o(i,u){try{if(u&&("object"==typeof u||"function"==typeof u)){var f=u.then;if("function"==typeof f)return void f.call(u,function(n){o(i,n)},e)}t[i]=u,0===--r&&n(t)}catch(s){e(s)}}if(0===t.length)return n([]);for(var r=t.length,i=0;i<t.length;i++)o(i,t[i])})},r.reject=function(n){return new r(function(t,e){e(n)})},r.race=function(n){return new r(function(t,e){n.forEach(function(n){r.resolve(n).then(t,e)})})},r.prototype["catch"]=function(n){return this.then(null,n)}},{"./core.js":5,asap:2}],8:[function(n,t,e){"use strict";var o=n("./core.js"),r=n("asap");t.exports=o,o.denodeify=function(n,t){return t=t||1/0,function(){var e=this,r=Array.prototype.slice.call(arguments);return new o(function(o,i){for(;r.length&&r.length>t;)r.pop();r.push(function(n,t){n?i(n):o(t)});var u=n.apply(e,r);!u||"object"!=typeof u&&"function"!=typeof u||"function"!=typeof u.then||o(u)})}},o.nodeify=function(n){return function(){var t=Array.prototype.slice.call(arguments),e="function"==typeof t[t.length-1]?t.pop():null,i=this;try{return n.apply(this,arguments).nodeify(e,i)}catch(u){if(null===e||"undefined"==typeof e)return new o(function(n,t){t(u)});r(function(){e.call(i,u)})}}},o.prototype.nodeify=function(n,t){return"function"!=typeof n?this:void this.then(function(e){r(function(){n.call(t,null,e)})},function(e){r(function(){n.call(t,e)})})}},{"./core.js":5,asap:2}],9:[function(n,t,e){t.exports=function(t){"use strict";var e=n("promise");t.http=function(n){var t,o,r,i,u,f,s,c;if(!n)return new Error("No parameters given");if("string"==typeof n&&(n={url:n}),t=new XMLHttpRequest,o=n.method||"GET",r=n.url,i=JSON.stringify(n.data)||null,u=n.user||"",f=n.password||"",s=n.headers||null,c="boolean"==typeof n.async?n.async:!0,t.onreadystatechange=function(){return 4===t.readyState?t:void 0},t.open(o,r,c,u,f),"POST"===o&&t.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),s)for(var a in s)t.setRequestHeader(a,s[a]);if(c)return new e(function(n,e){t.onerror=function(){e(new Error("Network error!"))},t.send(i),t.onload=function(){200===t.status?n(t.response):e(new Error(t.status))}});var p=function(n){var t={then:function(e){return 200===n.status&&e(n.responseText),t},"catch":function(e){return 200!==n.status&&e({status:n.status,statusText:n.statusText}),t}};return t};return t.send(i),t.onloadend=function(){return t.onreadystatechange(),p(t)},t.onloadend()},t.http.get=function(n){return this({url:n,method:"GET"})},t.http.post=function(n,t){return this({url:n,data:t,method:"POST"})}}},{promise:4}],10:[function(n,t,e){t.exports="0.5.2"},{}]},{},[1])(1)});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(require,module,exports){
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
    STORY_LINK: 'styla-widget__link'
};

},{}],3:[function(require,module,exports){
'use strict';

module.exports = '0.1.4';

},{}],4:[function(require,module,exports){

/**
 * Styla bite-sized widget
 *
 * lite embeddable widget for non-styla pages
 *
 * @author "Mouse Braun <mouse@styla.com>"
 * @author "Elias Liedholm <elias@styla.com>"
 */
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _versionJs = require('./version.js');

var _versionJs2 = _interopRequireDefault(_versionJs);

var _classesJs = require('./classes.js');

var _classesJs2 = _interopRequireDefault(_classesJs);

var _microbejsDistMicrobeHttpMin = require('microbejs/dist/microbe.http.min');

var domainConfigAPI = 'https://www.amazine.com/api/config/';
var _reportError = function _reportError(e) {
    console.log('err', e);
};

/*
    exchanged for css in the gulp build
 */
var baseStyles = '#styla-widget p{margin:0}#styla-widget.styla-widget__wrapper{width:100%;height:100%}#styla-widget .styla-widget__container{box-sizing:border-box;position:relative;overflow:hidden;padding:1em 2em;height:100%;width:100%;min-height:14em;display:flex;flex-direction:column;flex-wrap:wrap;font-size:14px}#styla-widget .styla-widget__story{margin-bottom:1em;margin-right:2em;height:14em;position:relative;width:100%;flex-grow:1}#styla-widget .styla-widget__story:nth-child(even){text-align:right}#styla-widget .styla-widget__link{position:absolute;height:14em;top:50%;margin-top:-7em;width:100%;display:flex;align-items:center;text-decoration:none;color:inherit}#styla-widget .styla-widget__imagewrap{display:block;vertical-align:top;flex-grow:1;height:100%;margin:0 6% 0 0;flex:none;max-width:40%;float:left}#styla-widget .styla-widget__story:nth-child(even) .styla-widget__imagewrap{margin:0 0 0 6%;float:right;clear:both;order:2}#styla-widget .styla-widget__image{height:100%;max-width:100%;max-height:100%;object-fit:contain}#styla-widget .styla-widget__textwrap{display:block;flex-grow:1;max-height:100%;overflow:hidden;float:left}#styla-widget .styla-widget__story:nth-child(even) .styla-widget__textwrap{float:right}#styla-widget .styla-widget__headlinewrap{height:5em;display:flex;flex-direction:column;justify-content:flex-end}#styla-widget .styla-widget__headline{font-size:1.9em;line-height:1.2em;max-height:2.4em;overflow:hidden;margin:0 0 .25em;word-wrap:break-word;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2}#styla-widget .styla-widget__paragraph{font-size:1em;line-height:1.5em;max-height:calc(100% - 5em);overflow:hidden;position:relative;word-wrap:break-word}#styla-widget .styla-widget__paragraph:after{position:absolute;left:0;top:7.5em;display:block;background-color:#FFF;width:100%;height:2em}#styla-widget .styla-widget__paragraph p+p{display:none}';
var wrapperID = 'styla-widget';

var StylaWidget = (function () {
    /**
     * ## constructor
     *
     * grabs the feed from the api and starts everything
     *
     * @param {String} domain target domain to grab products from
     *
     * @return _Object_ this
     */

    function StylaWidget(_ref) {
        var _this = this;

        var _ref$slug = _ref.slug;
        var slug = _ref$slug === undefined ? '' : _ref$slug;
        var _ref$tag = _ref.tag;
        var tag = _ref$tag === undefined ? false : _ref$tag;
        var _ref$limit = _ref.limit;
        var limit = _ref$limit === undefined ? 5 : _ref$limit;
        var _ref$offset = _ref.offset;
        var offset = _ref$offset === undefined ? 0 : _ref$offset;
        var _ref$target = _ref.target;
        var target = _ref$target === undefined ? document.body : _ref$target;

        _classCallCheck(this, StylaWidget);

        this.buildStories = function (stories) {
            stories = JSON.parse(stories);
            var container = _this.container = _this.create('DIV', _classesJs2['default'].CONTAINER);
            var wrapper = _this.wrapper = _this.create('DIV', _classesJs2['default'].WRAPPER);
            wrapper.id = wrapperID;

            var _buildStories = function _buildStories(domainConfig) {

                _this.domainConfig = domainConfig = JSON.parse(domainConfig);

                if (Object.keys(_this.domainConfig).length === 0) {
                    throw "Styla Widget error: Could not find magazine, please check if slug is configured correctly.";
                };

                var domainConfigEmbed = domainConfig.embed;
                _this.domain = domainConfigEmbed.magazineUrl + '/' + domainConfigEmbed.rootPath;
                var styling = _this.buildStyles(domainConfig);

                var head = document.head;

                _this.includeBaseStyles(head);

                if (domainConfig.embed.customFontUrl) {
                    _this.includeFonts(domainConfig, head);
                };

                var images = {};
                var resImages = stories.images;

                if (resImages) {
                    resImages.forEach(function (_i) {
                        images[_i.id] = _i;
                    });

                    _this.images = images;
                    var _els = stories.stories.map(_this.buildStory);

                    document.head.appendChild(styling);
                    _this.target.appendChild(wrapper);
                }
            };

            _microbejsDistMicrobeHttpMin.http.get(_this.domainConfigAPI + _this.slug).then(_buildStories)['catch'](_reportError);

            return container;
        };

        this.buildStory = function (_ref2) {
            var title = _ref2.title;
            var description = _ref2.description;
            var images = _ref2.images;
            var externalPermalink = _ref2.externalPermalink;

            var create = _this.create;
            var story = create('div', _classesJs2['default'].STORY);
            var storyLink = create('a', _classesJs2['default'].STORY_LINK);
            var imageWrapper = create('div', _classesJs2['default'].IMAGE_WRAPPER);
            var image = create('img', _classesJs2['default'].IMAGE);
            var textWrapper = create('div', _classesJs2['default'].TEXT_WRAPPER);
            var headlineWrapper = create('div', _classesJs2['default'].HEADLINE_WRAPPER);
            var headline = create('h1', _classesJs2['default'].HEADLINE);
            var paragraph = create('div', _classesJs2['default'].PARAGRAPH);

            var id = images[0].id;
            var imgObj = _this.images[id];

            storyLink.href = '//' + _this.domain + 'story/' + externalPermalink + '/';
            image.src = _this.getImageUrl(imgObj.fileName, 400);
            image.alt = imgObj.caption || title;
            image.title = title;

            headline.textContent = title;

            story.appendChild(storyLink);
            imageWrapper.appendChild(image);
            storyLink.appendChild(imageWrapper);
            storyLink.appendChild(textWrapper);

            headlineWrapper.appendChild(headline);
            textWrapper.appendChild(headlineWrapper);

            paragraph.innerHTML = _this.getDescription(JSON.parse(description));
            paragraph.innerHTML = paragraph.textContent;
            textWrapper.appendChild(paragraph);

            var container = _this.container;

            container.appendChild(story);
            _this.wrapper.appendChild(container);

            return story;
        };

        if (typeof target === 'string') {
            target = document.querySelector(target);
            if (typeof target === 'undefined' || target === null) {
                console.log("%c Styla Widget error: Can't find target element in DOM. Widget will render directly in body", 'color: red');
                target = document.body;
            } else if (target.offsetWidth < 250) {
                throw "Styla Widget error: Target element too small to render widget ¯\\_(ツ)_/¯";
            }
        }
        this.target = target;

        this.http = _microbejsDistMicrobeHttpMin.http;
        this.classes = _classesJs2['default'];
        this.slug = slug;
        this.tag = tag;
        this.domainConfigAPI = domainConfigAPI;
        this.version = _versionJs2['default'];

        var url = tag ? 'https://www.amazine.com/api/feeds/userTag/' + slug + '/tag/' + tag + '?offset=' + offset + '&limit=' + limit + '&domain=' + slug : 'https://www.amazine.com/api/feeds/user/' + slug + '?domain=' + slug + '&offset=' + offset + '&limit=' + limit;

        _microbejsDistMicrobeHttpMin.http.get(url).then(this.buildStories);

        return this;
    }

    _createClass(StylaWidget, [{
        key: 'buildStyles',

        /**
        * ## buildStyles
        *
        * builds the styles
        *
        * @param {Object} domain configuration of magazine
        *
        * @return _Object_ style element
        */
        value: function buildStyles(domainConfig) {
            var theme = domainConfig.theme;
            var css = '.' + _classesJs2['default'].HEADLINE + '\n            {\n                font-family:        ' + theme.hff + ';\n                font-weight:        ' + theme.hfw + ';\n                font-style:         ' + theme.hfs + ';\n                text-decoration:    ' + theme.htd + ';\n                letter-spacing:     ' + theme.hls + ';\n                color:              ' + theme.htc + '\n            }\n            .' + _classesJs2['default'].PARAGRAPH + '\n            {\n                font-family:        ' + theme.sff + ';\n                font-weight:        ' + theme.sfw + ';\n                color:              ' + theme.stc + '\n            }\n            .' + _classesJs2['default'].PARAGRAPH + ':after\n            {\n                content:            \'' + theme.strm + '\';\n                font-weight:        ' + theme.strmw + ';\n                text-decoration:    ' + theme.strmd + '\n            }\n            ';

            return this.buildStyleTag(css);
        }
    }, {
        key: 'buildStyleTag',

        /**
        * ## buildStyleTag
        *
        * builds a style tag and appends it to the DOM
        *
        * @param {Object} domain configuration of magazine
        *
        * @return _DOMElement_ style element
        */
        value: function buildStyleTag(css) {
            var el = document.createElement('style');
            el.type = 'text/css';
            el.id = 'styla-widget__styling';

            var t = document.createTextNode(css);
            el.appendChild(t);

            return el;
        }
    }, {
        key: 'create',

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
        value: function create(_tag, _class) {
            var _el = document.createElement(_tag.toUpperCase());

            if (_class) {
                _el.className = _class;
            }

            return _el;
        }
    }, {
        key: 'getDescription',

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
        value: function getDescription(_arr) {
            var i = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

            var text = _arr[i];

            if (!text) {
                return false;
            } else if (text.type !== 'text') {
                return this.getDescription(_arr, i + 1);
            }

            return text.content;
        }
    }, {
        key: 'getImageUrl',

        /**
         * ## getImageUrl
         *
         * builds the image url
         *
         * @param {String} filename from the image data object
         * @param {Number or String} size width to grab from the server
         *
         * @return _String_ file name
         */
        value: function getImageUrl(filename) {
            var size = arguments.length <= 1 || arguments[1] === undefined ? 400 : arguments[1];

            return '//img.styla.com/resizer/sfh_' + size + 'x0/_' + filename + '?still';
        }
    }, {
        key: 'includeBaseStyles',

        /**
         * ## includeBaseStyles
         *
         * includes the base styles.
         *
         * @return _DOMElement_ style tag
         */
        value: function includeBaseStyles() {
            var el = this.buildStyleTag(baseStyles);
            document.head.appendChild(el);

            return el;
        }
    }, {
        key: 'includeFonts',

        /**
         * ## includeFonts
         *
         * includes webfonts
         *
         * @param {Object} domain configuration of magazine
         *
         * @return _DOMElement_ link element
         */
        value: function includeFonts(domainConfig) {
            var el = document.createElement('link');
            el.type = 'text/css';
            el.rel = 'stylesheet';
            el.href = domainConfig.embed.customFontUrl;

            document.head.appendChild(el);

            return el;
        }
    }]);

    return StylaWidget;
})();

;

if (!window.stylaWidget) {
    window.stylaWidget = {};
}

window.stylaWidget.instance = new StylaWidget(window.stylaWidget);

/**
 * ## buildStories
 *
 * after recieving the story data, this parses and build the individual
 * stories
 *
 * @param {String} res JSON response from the product api
 *
 * @return _DOMElement_ container element
 */

/**
 * ## buildStory
 *
 * builds each story off the retrieved json
 *
 * @param {Object} json image data
 *
 * @return _DOMElement_ outer story element
 */

},{"./classes.js":2,"./version.js":3,"microbejs/dist/microbe.http.min":1}]},{},[4]);
