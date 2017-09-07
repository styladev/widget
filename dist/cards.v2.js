/*!
 * Styla bite-sized widget v2.4.1
 * https://github.com/styladev/widget
 *
 * Copyright 2016-2017 Styla GmbH and other contributors
 * Released under the MIT license
 * https://github.com/styladev/widget/blob/master/license.md
 *
 * Date: Wed Sep 06 2017
 * */
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
/*! Microbe v0.5.2 | (c) 2014-2016 Sociomantic Labs | http://m.icro.be/license */
!function(n){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=n();else if("function"==typeof define&&define.amd)define([],n);else{var t;"undefined"!=typeof window?t=window:"undefined"!=typeof global?t=global:"undefined"!=typeof self&&(t=self),t.µ=n()}}(function(){return function n(t,e,o){function r(u,f){if(!e[u]){if(!t[u]){var s="function"==typeof require&&require;if(!f&&s)return s(u,!0);if(i)return i(u,!0);var c=new Error("Cannot find module '"+u+"'");throw c.code="MODULE_NOT_FOUND",c}var a=e[u]={exports:{}};t[u][0].call(a.exports,function(n){var e=t[u][1][n];return r(e?e:n)},a,a.exports,n,t,e,o)}return e[u].exports}for(var i="function"==typeof require&&require,u=0;u<o.length;u++)r(o[u]);return r}({1:[function(n,t,e){"use strict";var o="[object Microbe-Http]",r={},i=n("./version")+"-http";n("./modules/http")(r),Object.defineProperty(r,"version",{get:function(){return i}}),Object.defineProperty(r,"type",{get:function(){return o}}),t.exports=r},{"./modules/http":9,"./version":10}],2:[function(n,t,e){(function(n){function e(){for(;r.next;){r=r.next;var n=r.task;r.task=void 0;var t=r.domain;t&&(r.domain=void 0,t.enter());try{n()}catch(o){if(s)throw t&&t.exit(),setTimeout(e,0),t&&t.enter(),o;setTimeout(function(){throw o},0)}t&&t.exit()}u=!1}function o(t){i=i.next={task:t,domain:s&&n.domain,next:null},u||(u=!0,f())}var r={task:void 0,next:null},i=r,u=!1,f=void 0,s=!1;if("undefined"!=typeof n&&n.nextTick)s=!0,f=function(){n.nextTick(e)};else if("function"==typeof setImmediate)f="undefined"!=typeof window?setImmediate.bind(window,e):function(){setImmediate(e)};else if("undefined"!=typeof MessageChannel){var c=new MessageChannel;c.port1.onmessage=e,f=function(){c.port2.postMessage(0)}}else f=function(){setTimeout(e,0)};t.exports=o}).call(this,n("_process"))},{_process:3}],3:[function(n,t,e){function o(){}var r=t.exports={};r.nextTick=function(){var n="undefined"!=typeof window&&window.setImmediate,t="undefined"!=typeof window&&window.postMessage&&window.addEventListener;if(n)return function(n){return window.setImmediate(n)};if(t){var e=[];return window.addEventListener("message",function(n){var t=n.source;if((t===window||null===t)&&"process-tick"===n.data&&(n.stopPropagation(),e.length>0)){var o=e.shift();o()}},!0),function(n){e.push(n),window.postMessage("process-tick","*")}}return function(n){setTimeout(n,0)}}(),r.title="browser",r.browser=!0,r.env={},r.argv=[],r.on=o,r.addListener=o,r.once=o,r.off=o,r.removeListener=o,r.removeAllListeners=o,r.emit=o,r.binding=function(n){throw new Error("process.binding is not supported")},r.cwd=function(){return"/"},r.chdir=function(n){throw new Error("process.chdir is not supported")}},{}],4:[function(n,t,e){"use strict";t.exports=n("./lib/core.js"),n("./lib/done.js"),n("./lib/es6-extensions.js"),n("./lib/node-extensions.js")},{"./lib/core.js":5,"./lib/done.js":6,"./lib/es6-extensions.js":7,"./lib/node-extensions.js":8}],5:[function(n,t,e){"use strict";function o(n){function t(n){return null===s?void a.push(n):void u(function(){var t=s?n.onFulfilled:n.onRejected;if(null===t)return void(s?n.resolve:n.reject)(c);var e;try{e=t(c)}catch(o){return void n.reject(o)}n.resolve(e)})}function e(n){try{if(n===p)throw new TypeError("A promise cannot be resolved with itself.");if(n&&("object"==typeof n||"function"==typeof n)){var t=n.then;if("function"==typeof t)return void i(t.bind(n),e,o)}s=!0,c=n,f()}catch(r){o(r)}}function o(n){s=!1,c=n,f()}function f(){for(var n=0,e=a.length;e>n;n++)t(a[n]);a=null}if("object"!=typeof this)throw new TypeError("Promises must be constructed via new");if("function"!=typeof n)throw new TypeError("not a function");var s=null,c=null,a=[],p=this;this.then=function(n,e){return new p.constructor(function(o,i){t(new r(n,e,o,i))})},i(n,e,o)}function r(n,t,e,o){this.onFulfilled="function"==typeof n?n:null,this.onRejected="function"==typeof t?t:null,this.resolve=e,this.reject=o}function i(n,t,e){var o=!1;try{n(function(n){o||(o=!0,t(n))},function(n){o||(o=!0,e(n))})}catch(r){if(o)return;o=!0,e(r)}}var u=n("asap");t.exports=o},{asap:2}],6:[function(n,t,e){"use strict";var o=n("./core.js"),r=n("asap");t.exports=o,o.prototype.done=function(n,t){var e=arguments.length?this.then.apply(this,arguments):this;e.then(null,function(n){r(function(){throw n})})}},{"./core.js":5,asap:2}],7:[function(n,t,e){"use strict";function o(n){this.then=function(t){return"function"!=typeof t?this:new r(function(e,o){i(function(){try{e(t(n))}catch(r){o(r)}})})}}var r=n("./core.js"),i=n("asap");t.exports=r,o.prototype=r.prototype;var u=new o(!0),f=new o(!1),s=new o(null),c=new o(void 0),a=new o(0),p=new o("");r.resolve=function(n){if(n instanceof r)return n;if(null===n)return s;if(void 0===n)return c;if(n===!0)return u;if(n===!1)return f;if(0===n)return a;if(""===n)return p;if("object"==typeof n||"function"==typeof n)try{var t=n.then;if("function"==typeof t)return new r(t.bind(n))}catch(e){return new r(function(n,t){t(e)})}return new o(n)},r.all=function(n){var t=Array.prototype.slice.call(n);return new r(function(n,e){function o(i,u){try{if(u&&("object"==typeof u||"function"==typeof u)){var f=u.then;if("function"==typeof f)return void f.call(u,function(n){o(i,n)},e)}t[i]=u,0===--r&&n(t)}catch(s){e(s)}}if(0===t.length)return n([]);for(var r=t.length,i=0;i<t.length;i++)o(i,t[i])})},r.reject=function(n){return new r(function(t,e){e(n)})},r.race=function(n){return new r(function(t,e){n.forEach(function(n){r.resolve(n).then(t,e)})})},r.prototype["catch"]=function(n){return this.then(null,n)}},{"./core.js":5,asap:2}],8:[function(n,t,e){"use strict";var o=n("./core.js"),r=n("asap");t.exports=o,o.denodeify=function(n,t){return t=t||1/0,function(){var e=this,r=Array.prototype.slice.call(arguments);return new o(function(o,i){for(;r.length&&r.length>t;)r.pop();r.push(function(n,t){n?i(n):o(t)});var u=n.apply(e,r);!u||"object"!=typeof u&&"function"!=typeof u||"function"!=typeof u.then||o(u)})}},o.nodeify=function(n){return function(){var t=Array.prototype.slice.call(arguments),e="function"==typeof t[t.length-1]?t.pop():null,i=this;try{return n.apply(this,arguments).nodeify(e,i)}catch(u){if(null===e||"undefined"==typeof e)return new o(function(n,t){t(u)});r(function(){e.call(i,u)})}}},o.prototype.nodeify=function(n,t){return"function"!=typeof n?this:void this.then(function(e){r(function(){n.call(t,null,e)})},function(e){r(function(){n.call(t,e)})})}},{"./core.js":5,asap:2}],9:[function(n,t,e){t.exports=function(t){"use strict";var e=n("promise");t.http=function(n){var t,o,r,i,u,f,s,c;if(!n)return new Error("No parameters given");if("string"==typeof n&&(n={url:n}),t=new XMLHttpRequest,o=n.method||"GET",r=n.url,i=JSON.stringify(n.data)||null,u=n.user||"",f=n.password||"",s=n.headers||null,c="boolean"==typeof n.async?n.async:!0,t.onreadystatechange=function(){return 4===t.readyState?t:void 0},t.open(o,r,c,u,f),"POST"===o&&t.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),s)for(var a in s)t.setRequestHeader(a,s[a]);if(c)return new e(function(n,e){t.onerror=function(){e(new Error("Network error!"))},t.send(i),t.onload=function(){200===t.status?n(t.response):e(new Error(t.status))}});var p=function(n){var t={then:function(e){return 200===n.status&&e(n.responseText),t},"catch":function(e){return 200!==n.status&&e({status:n.status,statusText:n.statusText}),t}};return t};return t.send(i),t.onloadend=function(){return t.onreadystatechange(),p(t)},t.onloadend()},t.http.get=function(n){return this({url:n,method:"GET"})},t.http.post=function(n,t){return this({url:n,data:t,method:"POST"})}}},{promise:4}],10:[function(n,t,e){t.exports="0.5.2"},{}]},{},[1])(1)});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* globals document, console, window */
/**
 * Styla bite-sized widget
 *
 * lite embeddable widget for non-styla pages
 *
 * @author "Mouse Braun <mouse@styla.com>"
 * @author "Elias Liedholm <elias@styla.com>"
 */

// needs to be imported like this for tests


var _version = require('/styla/widget/src/version');

var _version2 = _interopRequireDefault(_version);

var _classes = require('/styla/widget/src/classes');

var _classes2 = _interopRequireDefault(_classes);

var _build = require('/styla/widget/src/build.tmpl');

var _build2 = _interopRequireDefault(_build);

var _microbeHttp = require('microbejs/dist/microbe.http.min');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var layout = 'cards';
// TODO this logic should be moved to gulpfile
layout = layout[0].toUpperCase() + layout.slice(1);

/**
 * StylaWidget base class
 */

var StylaWidget = function () {
    _createClass(StylaWidget, [{
        key: 'attach',

        /**
         * ## attach
         *
         * adds the previously configured widget to the currently
         * defined target or a new selector / el
         *
         * @param {DOMElement} target mount target
         *
         * @return {Void} void
         */
        value: function attach() {
            var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.target;

            target = this.checkTarget(target, this.minWidth);

            var refs = this.refs;
            var styles = refs.styles;
            var head = document.head;

            var baseStyle = head.querySelector('.' + _classes2.default.BASE_STYLES);

            if (baseStyle) {
                head.removeChild(baseStyle);
            }

            target.appendChild(refs.wrapper);

            styles.forEach(function (el) {
                head.appendChild(el);
            });

            return this;
        }

        /**
         * ## checkTarget
         *
         * makes sure the target is a DOMelement and wide enough
         *
         * @param {Mixed} target attach point for the widget _String or DOMElement_
         * @param {Number} minWidth minimum acceptable width to fit the widget
         *
         * @return {DOMElelemt} mount point
         */

    }, {
        key: 'checkTarget',
        value: function checkTarget(target, minWidth) {
            if (typeof target === 'string') {
                target = document.querySelector(target);

                if (target) {
                    return target;
                }
            }

            if (typeof target === 'undefined' || target === null) {
                console.error('Styla Widget error: Cant find target element in DOM. Widget will render directly in body'); // eslint-disable-line

                return document.body;
            } else if (target.offsetWidth < minWidth) {
                throw 'Styla Widget error: Target element too small to render widget ¯\\_(ツ)_/¯'; // eslint-disable-line
            }

            return target;
        }

        /**
         * ## constructor
         *
         * grabs the feed from the api and starts everything
         *
         * @param {String} domain target domain to grab products from
         *
         * @return {Object} this
         */

    }]);

    function StylaWidget() {
        var _this = this;

        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            slug = _ref.slug,
            _ref$api = _ref.api,
            api = _ref$api === undefined ? 'https://live.styla.com' : _ref$api,
            _ref$domain = _ref.domain,
            domain = _ref$domain === undefined ? false : _ref$domain,
            _ref$iframe = _ref.iframe,
            iframe = _ref$iframe === undefined ? false : _ref$iframe,
            _ref$ignore = _ref.ignore,
            ignore = _ref$ignore === undefined ? false : _ref$ignore,
            _ref$limit = _ref.limit,
            limit = _ref$limit === undefined ? 5 : _ref$limit,
            _ref$linkDomain = _ref.linkDomain,
            linkDomain = _ref$linkDomain === undefined ? false : _ref$linkDomain,
            _ref$minWidth = _ref.minWidth,
            minWidth = _ref$minWidth === undefined ? 250 : _ref$minWidth,
            _ref$newTab = _ref.newTab,
            newTab = _ref$newTab === undefined ? false : _ref$newTab,
            _ref$offset = _ref.offset,
            offset = _ref$offset === undefined ? 0 : _ref$offset,
            _ref$imageSize = _ref.imageSize,
            imageSize = _ref$imageSize === undefined ? 400 : _ref$imageSize,
            _ref$storiesApi = _ref.storiesApi,
            storiesApi = _ref$storiesApi === undefined ? false : _ref$storiesApi,
            _ref$ignoreFonts = _ref.ignoreFonts,
            ignoreFonts = _ref$ignoreFonts === undefined ? false : _ref$ignoreFonts,
            _ref$tag = _ref.tag,
            tag = _ref$tag === undefined ? false : _ref$tag,
            _ref$category = _ref.category,
            category = _ref$category === undefined ? false : _ref$category,
            _ref$cta = _ref.cta,
            cta = _ref$cta === undefined ? false : _ref$cta,
            _ref$target = _ref.target,
            target = _ref$target === undefined ? document.body : _ref$target,
            _ref$urlParams = _ref.urlParams,
            urlParams = _ref$urlParams === undefined ? true : _ref$urlParams,
            _ref$imageApiDomain = _ref.imageApiDomain,
            imageApiDomain = _ref$imageApiDomain === undefined ? 'img.styla.com' : _ref$imageApiDomain;

        _classCallCheck(this, StylaWidget);

        target = this.checkTarget(target, minWidth);

        if (!slug) {
            throw 'Styla Widget error: No slug defined, cannot render widget';
        }

        this.layout = layout;
        this.refs = {};
        this.api = api;
        this.domain = domain;
        this.linkDomain = linkDomain;
        this.ignore = ignore;
        this.iframe = iframe;
        this.newTab = newTab;

        this.limit = limit = ignore ? limit + 1 : limit;
        this.minWidth = minWidth;
        this.offset = offset;
        this.imageSize = imageSize;
        this.slug = slug;
        this.storiesApi = storiesApi;
        this.ignoreFonts = ignoreFonts;
        this.tag = tag;
        this.category = category;
        this.cta = cta;
        this.target = target;
        this.urlParams = urlParams;
        this.imageApiDomain = imageApiDomain;

        var fetchLimit = limit + offset;

        if (tag !== false && category !== false) {
            console.error('Styla Widget error: Both tag and category filter has been added to the configuration, but only one can be used, stories will be filtered only by tag.'); // eslint-disable-line
        }

        var url = void 0;

        if (tag != false) {
            url = api + '/api/feeds/tags/' + tag + '?limit=' + fetchLimit + '&domain=' + slug; // eslint-disable-line
        } else if (category != false) {
            url = api + '/api/feeds/boards/' + category + '/user/' + slug + '?domain=' + slug; // eslint-disable-line
        } else {
            url = api + '/api/feeds/all?domain=' + slug + '&limit=' + fetchLimit; // eslint-disable-line
        }

        this.url = url;

        this.http.get(storiesApi || url).then(function (res) {
            res = JSON.parse(res);
            res.stories = res.stories.slice(offset);

            /**
             * ## removeExtraStory
             *
             * recursive - checks if the array is over a limit, removes one,
             * then checks if more need to be removed
             *
             * @param {Array} arr array to check the length of
             * @param {Numbers} limit story count
             *
             * @return {Array} shortened array
             */
            function removeExtraStory(arr, limit) {
                var len = arr.length;

                if (len <= limit) {
                    return arr;
                }

                arr.splice(len - 1, 1);

                return removeExtraStory(arr, limit);
            }

            res.stories = removeExtraStory(res.stories, limit);

            new _build2.default(_this, res);
        });

        Object.defineProperty(this, 'version', {
            value: _version2.default
        });
    }

    /**
     * ## destroy
     *
     * removes the styla widget from the DOM
     *
     * @return {Void} void
     */


    _createClass(StylaWidget, [{
        key: 'destroy',
        value: function destroy() {
            var refs = this.refs;
            var styles = refs.styles;
            var wrapper = refs.wrapper;
            var head = document.head;

            wrapper.parentNode.removeChild(wrapper);

            styles.forEach(function (el) {
                head.removeChild(el);
            });

            return this;
        }
    }]);

    return StylaWidget;
}();

StylaWidget.prototype.http = _microbeHttp.http;

window['StylaWidget_' + layout] = StylaWidget;

Object.defineProperty(StylaWidget, 'version', {
    value: _version2.default
});

exports.default = StylaWidget;

},{"/styla/widget/src/build.tmpl":3,"/styla/widget/src/classes":4,"/styla/widget/src/version":5,"microbejs/dist/microbe.http.min":1}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* globals document, window */
/**
 * ## build.js
 *
 * this contains methods to build the bite sized widget that do not need to be
 * outwardly facing
 */

// needs to be imported like this for tests


var _classes = require('/styla/widget/src/classes');

var _classes2 = _interopRequireDefault(_classes);

var _microbeHttp = require('microbejs/dist/microbe.http.min');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
    exchanged for css in the gulp build
 */
var baseStyles = '#styla-widget p{margin:0}#styla-widget.styla-widget__wrapper{width:100%;height:100%}#styla-widget .styla-widget__container{box-sizing:border-box;position:relative;overflow:hidden;height:100%;width:100%;min-height:14em;font-size:14px}#styla-widget .styla-widget__story{margin-bottom:1em;position:relative}#styla-widget .styla-widget__link{position:absolute;width:100%;display:-moz-flex;display:-webkit-flex;display:flex;text-decoration:none;color:inherit}#styla-widget__link>div{display:inline-block}#styla-widget .styla-widget__imagewrap{background-repeat:no-repeat;background-position:50%;background-size:contain}#styla-widget .styla-widget__image{max-height:100%;max-width:100%;height:100%;object-fit:contain;opacity:0}#styla-widget .styla-widget__textwrap{display:block;-moz-flex-grow:1;-webkit-flex-grow:1;flex-grow:1;max-height:100%;overflow:hidden;float:left}#styla-widget .styla-widget__headlinewrap{display:flex;flex-direction:column;-moz-justify-content:flex-end;-webkit-justify-content:flex-end;justify-content:flex-end}#styla-widget .styla-widget__headline,#styla-widget .styla-widget__title{line-height:1.25em;max-height:2.5em;overflow:hidden;margin-top:1em;margin-bottom:1em}#styla-widget .styla-widget__title{font-size:2em;text-align:center;margin-bottom:30px}#styla-widget .styla-widget__paragraph{font-size:1em;line-height:1.5em;overflow:hidden;position:relative;word-wrap:break-word}'; // eslint-disable-line
var specificStyles = '#styla-widget.cards .styla-widget__container{display:-moz-flex;display:-ms-flex;display:-webkit-flex;display:flex;-moz-flex-direction:row;-ms-flex-direction:row;-webkit-flex-direction:row;flex-direction:row;-moz-flex-wrap:wrap;-ms-flex-wrap:wrap;-webkit-flex-wrap:wrap;flex-wrap:wrap;padding:0 .5em;height:26em;overflow:hidden}#styla-widget.cards .styla-widget__story{margin:.5em;width:18em;height:25em;display:block;float:left;-moz-flex-grow:1;-ms-flex-grow:1;-webkit-flex-grow:1;flex-grow:1}#styla-widget.cards .styla-widget__link{display:block}#styla-widget.cards .styla-widget__imagewrap{height:11em;width:100%;background-size:cover}#styla-widget.cards .styla-widget__image{width:100%;object-fit:cover}#styla-widget.cards .styla-widget__textwrap{width:100%}#styla-widget.cards .styla-widget__headline{font-size:1.5em}#styla-widget.cards .styla-widget__paragraph{max-height:6em}#styla-widget.cards .styla-widget__calltoaction{line-height:2em}#styla-widget.cards .styla-widget__calltoaction:hover{text-decoration:underline}'; // eslint-disable-line

var wrapperID = 'styla-widget';

/* istanbul ignore next */
var reportError = function reportError() {};

/**
 * StylaWidget build tools
 */

var Build = function () {
    _createClass(Build, [{
        key: 'buildHeadline',

        /**
         * ## buildHeadline
         *
         * builds the headline and headline wrapper and fills the wrapper with the
         * element and text
         *
         * @param {String} title story headline
         *
         * @return {DOMElement} headlineWrapper
         */
        value: function buildHeadline(title) {
            var create = this.create;
            var headlineWrapper = create('div', _classes2.default.HEADLINE_WRAPPER);
            var headline = create('span', _classes2.default.HEADLINE);

            headline.textContent = title;

            headlineWrapper.appendChild(headline);

            return headlineWrapper;
        }

        /**
         * ## buildImage
         *
         * builds the headline and headline wrapper and fills the wrapper with the
         * element and text
         *
         * @param {Array} images array of images from the product api
         * @param {String} title story headline
         * @param {Object} context sub for this.context - needed for testing
         *
         * @return {DOMElement} imageWrapper
         */

    }, {
        key: 'buildImage',
        value: function buildImage(images, title) {
            var create = this.create;
            var imageWrapper = create('div', _classes2.default.IMAGE_WRAPPER);

            var imageSize = this.context.imageSize;
            var id = images[0].id;
            var imgObj = this.context.images[id];

            var url = this.getImageUrl(imgObj.fileName, imageSize);

            /* The image is rendered as a background image on the wrapper element
            since IE is lacking support for CSS object-fit. The actual image element
            must still be rendered in order for flexbox to take up the space it needs,
            but it is then hidden by CSS. */
            imageWrapper.style.cssText = 'background-image: url(' + url + ')';

            var image = create('img', _classes2.default.IMAGE);
            image.src = url;
            image.alt = imgObj.caption || title;
            image.title = title;

            imageWrapper.appendChild(image);

            return imageWrapper;
        }

        /**
         * ## buildStories
         *
         * after recieving the story data, this parses and build the individual
         * stories
         *
         * @param {String} domainConfig JSON response from the product api
         * @param {Object} parsedDomainConfig parsed JSON object for testing
         *
         @return {DOMElement} wrapper element
         */

    }, {
        key: 'buildStories',
        value: function buildStories() {
            var domainConfig = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '{}';

            var domainConfigParsed = this.domainConfig = JSON.parse(domainConfig);

            if (Object.keys(domainConfigParsed).length === 0) {
                throw 'Styla Widget error: Could not find magazine, please check if slug is configured correctly.'; // eslint-disable-line
            }

            var images = {};
            var context = this.context;
            var stories = context.stories;
            var resImages = stories.images;
            var refs = context.refs;

            context.route = domainConfigParsed.routes.story;
            context.pushstate = domainConfigParsed.embed.pushstateDefault === false ? '#' : '/';
            context.domain = this.setDomain();

            refs.styles = this.includeBaseStyles();

            if (resImages) {

                resImages.forEach(function (i) {
                    return images[i.id] = i;
                });
                context.images = images;

                stories.stories.forEach(this.buildStory);
                var styling = this.compileStyles();

                document.head.appendChild(styling);
                context.target.appendChild(context.refs.wrapper);

                return refs.wrapper;
            }

            return false;
        }

        /**
         * ## buildStory
         *
         * builds each story off the retrieved json.  skips a story if the id #
         * matches ignore.  no matter what it will always build the number of
         * stories set in the limit
         *
         * @param {Object} json image data
         * @param {Number} i iterator
         *
         * @return {DOMElement} outer story element
         */

    }, {
        key: 'buildStory',
        value: function buildStory(_ref) {
            var title = _ref.title,
                description = _ref.description,
                images = _ref.images,
                externalPermalink = _ref.externalPermalink,
                id = _ref.id;
            var i = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

            var context = this.context;

            if (context.ignore != false && i == context.limit - 1 && this.ignored == 0) {
                return false;
            }

            if ('' + context.ignore !== '' + id && i < this.ignored + context.limit) {
                var create = this.create;

                var story = create('div', _classes2.default.STORY);
                var storyLink = create('a', _classes2.default.STORY_LINK);

                storyLink.href = this.buildStoryLink(externalPermalink);

                story.appendChild(storyLink);

                storyLink.appendChild(this.buildImage(images, title));
                storyLink.appendChild(this.buildStoryText(title, description));

                if (context.cta) {
                    var callToAction = create('div', _classes2.default.CALL_TO_ACTION);

                    callToAction.innerHTML = context.cta;

                    storyLink.appendChild(callToAction);
                }

                var container = context.refs.container;
                var wrapper = context.refs.wrapper;

                container.appendChild(story);
                wrapper.appendChild(container);

                return story;
            }

            this.ignored++;

            return false;
        }

        /**
         * ## buildStoryLink
         *
         * builds unique link for each story
         *
         * @param {String} slug for story
         *
         * @return {String} complete url
         */

    }, {
        key: 'buildStoryLink',
        value: function buildStoryLink(slug) {
            var context = this.context;

            var layout = encodeURIComponent(context.layout);
            var location = encodeURIComponent(window.location.href);
            var parameters = context.urlParams ? '?styla_ref=' + location + '&styla_wdgt_var=' + layout : '';

            var path = context.route.replace(/%2\$s_%3\$s/, slug);

            return '//' + context.domain + context.pushstate + path + parameters;
        }

        /**
         * ## buildStoryText
         *
         * builds the story text (including headline and content), combines them
         * and returns the outer wrapper
         *
         * @param {String} title story headline
         * @param {Object} description copy of the story to be inserted
         *
         * @return {DOMElement} style element
         */

    }, {
        key: 'buildStoryText',
        value: function buildStoryText(title) {
            var description = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '{}';

            var create = this.create;
            var textWrapper = create('div', _classes2.default.TEXT_WRAPPER);

            var headlineWrapper = this.buildHeadline(title);
            textWrapper.appendChild(headlineWrapper);

            var paragraph = create('div', _classes2.default.PARAGRAPH);
            description = this.getDescription(JSON.parse(description));

            paragraph.innerHTML = description;

            /* Magic: strips HTML and truncates text from description */
            paragraph.innerHTML = paragraph.textContent.slice(0, 220);

            textWrapper.appendChild(paragraph);

            var paragraphAfter = create('div', _classes2.default.PARAGRAPH_AFTER);
            paragraphAfter.innerHTML = '…';

            textWrapper.appendChild(paragraphAfter);

            return textWrapper;
        }

        /**
         * ## buildStyleTag
         *
         * builds a style tag and appends it to the DOM
         *
         * @param {String} css styles to add to the created tag
         *
         * @return {DOMElement} style element
         */

    }, {
        key: 'buildStyleTag',
        value: function buildStyleTag(css) {
            var el = document.createElement('style');
            el.type = 'text/css';
            el.className = _classes2.default.STYLES;

            var t = document.createTextNode(css);
            el.appendChild(t);

            return el;
        }

        /**
         * ## compileStyles
         *
         * compiles the styles and returns them added to the style tag
         *
         * @return {DOMElement} style element
         */

    }, {
        key: 'compileStyles',
        value: function compileStyles() {
            var theme = this.domainConfig.theme;
            var css = '';
            var now = this.now;
            var context = this.context;

            if (theme) {
                css = '#styla-widget .styla-widget-' + now + ' .' + _classes2.default.HEADLINE + '\n                {\n                    font-family:        ' + theme.hff + ';\n                    font-weight:        ' + theme.hfw + ';\n                    font-style:         ' + theme.hfs + ';\n                    text-decoration:    ' + theme.htd + ';\n                    letter-spacing:     ' + theme.hls + ';\n                    color:              ' + theme.htc + ';\n                }\n                #styla-widget .styla-widget-' + now + ' .' + _classes2.default.PARAGRAPH + ',\n                #styla-widget .styla-widget-' + now + ' .' + _classes2.default.PARAGRAPH_AFTER + ',\n                #styla-widget .styla-widget-' + now + ' .' + _classes2.default.CALLTOACTION + '\n                {\n                    font-family:        ' + theme.sff + ';\n                    font-weight:        ' + theme.sfw + ';\n                    color:              ' + theme.stc + ';\n                }\n                #styla-widget .styla-widget-' + now + ' .' + _classes2.default.CALLTOACTION + '\n                {\n                    color:              ' + theme.ltc + ';\n                }';
            }

            var el = this.buildStyleTag(css);
            el.className = _classes2.default.THEME_STYLES + '  styla-widget__' + context.layout; // eslint-disable-line

            context.refs.themeStyle = el;

            return el;
        }

        /**
         * ## constructor
         *
         * builds build
         *
         * @param {Object} context context to be passed to this.context
         * @param {String} stories json string of the stories object
         *
         * @return {Class} instance of build class
         */

    }]);

    function Build(context, stories) {
        _classCallCheck(this, Build);

        this.context = context;
        this.now = Date.now();
        this.ignored = 0;

        this.buildStories = this.buildStories.bind(this);
        this.buildStory = this.buildStory.bind(this);
        this.buildStoryLink = this.buildStoryLink.bind(this);

        if (!context.refs.wrapper) {
            context.stories = stories;
            var layout = context.layout.toLowerCase();

            context.refs.container = this.create('DIV', _classes2.default.CONTAINER + '  styla-widget-' + this.now);
            var wrapper = context.refs.wrapper = this.create('DIV', _classes2.default.WRAPPER + '  ' + layout);
            wrapper.id = wrapperID;

            var domainConfigAPI = context.api + '/api/config/' + context.slug;

            this.http.get(domainConfigAPI).then(this.buildStories).catch(reportError);
        }

        return this;
    }

    /**
     * ## create
     *
     * creates an element with the supplied tagname and classname
     *
     * @param {String} tag tagname
     * @param {String} clss className to add to the created element
     *
     * @return {DOMElement} newly created element
     */


    _createClass(Build, [{
        key: 'create',
        value: function create(tag, clss) {
            var el = document.createElement(tag.toUpperCase());

            if (clss) {
                el.className = clss;
            }

            return el;
        }

        /**
         * ## getDescription
         *
         * gets description from the content and returns that. Either returns full text or only from
         * the first block
         *
         * @param {Array} textBlocks array filled w/ content
         * @param {Boolean} useFullText when false, use only the first text content block
         * @param {Number} i recursive index
         *
         * @return {String} text content. Might be empty if no text.
         */

    }, {
        key: 'getDescription',
        value: function getDescription(textBlocks) {
            var useFullText = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
            var i = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

            var text = textBlocks[i];

            if (!text) {
                return '';
            }

            // TODO this is dogey! A getter must not have side effects like
            // manipulating the dom. At least remove it after use!
            var el = this.create('div');
            el.innerHTML = text.content;
            var actualText = el.textContent;

            var isTextValid = text.type == 'text' && actualText !== '';

            if (isTextValid) {
                if (useFullText) {
                    return actualText + ' ' + this.getDescription(textBlocks, useFullText, i + 1);
                }

                return actualText;
            }

            // !isTextValid
            return this.getDescription(textBlocks, useFullText, i + 1);
        }

        /**
         * ## getImageUrl
         *
         * uses the filename and size to create the full image url
         *
         * @param {String} filename from the image data object
         * @param {Mixed} imageSize width to grab from the server _Number or String_
         *
         * @return {String} file name
         */

    }, {
        key: 'getImageUrl',
        value: function getImageUrl(filename) {
            var imageSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 400;

            var imageApiDomain = this.context.imageApiDomain;

            return '//' + imageApiDomain + '/resizer/sfh_' + imageSize + 'x0/_' + filename + '?still';
        }

        /**
         * ## includeBaseStyles
         *
         * creates the base styles DOM element and adds it to the head
         *
         * @param {String} css style in css for tag insertion
         *
         * @return {Void} void
         */

    }, {
        key: 'includeBaseStyles',
        value: function includeBaseStyles(css) {
            var el = void 0;
            var self = this;
            var context = this.context;
            var layoutCaps = context.layout.toUpperCase();
            var head = document.head;

            /**
             * ## addBaseStyle
             *
             * @param {String} css style in css for tag insertion
             * @param {String} clss class to add to the baseStyle tag
             * @param {String} layout layout of the widget
             *
             * @return {DOMElement} style tag
             */
            function addBaseStyle(css, clss, layout) {
                var baseStyle = head.querySelector('.' + clss);

                if (!baseStyle) {
                    el = self.buildStyleTag(css);
                    el.className = clss + '  ' + _classes2.default.STYLES;

                    context.refs[layout + 'Style'] = el;

                    head.appendChild(el);
                }

                return el;
            }

            var arr = new Array(2);

            arr[0] = addBaseStyle(css || baseStyles, '' + _classes2.default.BASE_STYLES, 'base');
            arr[1] = addBaseStyle(specificStyles, _classes2.default[layoutCaps + '_STYLES'], context.layout);

            if (this.domainConfig.embed.customFontUrl) {
                arr.push(this.includeFonts());
            }

            arr = arr.filter(function (el) {
                return el;
            });

            return arr;
        }

        /**
         * ## includeFonts
         *
         * includes the webfonts link element
         *
         * @return {DOMElement} link element
         */

    }, {
        key: 'includeFonts',
        value: function includeFonts() {
            var ignoreFonts = this.context.ignoreFonts;
            if (!ignoreFonts) {
                var el = document.createElement('link');
                el.className = _classes2.default.FONT_LINK;
                el.type = 'text/css';
                el.rel = 'stylesheet';
                var fontUrl = this.domainConfig.embed.customFontUrl;
                el.href = fontUrl.indexOf('//') !== -1 ? fontUrl : '//' + fontUrl;

                document.head.appendChild(el);

                return el;
            }
        }

        /**
         * ## setDomain
         *
         * takes pieces of the domainConfig and builds the complete domain
         * including root path
         *
         * @return {String} domain address
         */

    }, {
        key: 'setDomain',
        value: function setDomain() {
            var embed = this.domainConfig.embed;
            var context = this.context;

            var domain = void 0;

            if (!context.domain) {
                if (context.linkDomain) {
                    domain = context.linkDomain;
                } else if (embed) {
                    var rootPath = embed.rootPath;

                    if (rootPath[0] !== '/') {
                        rootPath = '/' + rootPath;
                    }

                    if (rootPath.length > 1 && rootPath[rootPath.length - 1] == '/') {
                        rootPath = rootPath.substring(0, rootPath.length - 1);
                    }

                    if (rootPath === '/') {
                        rootPath = '';
                    }

                    domain = '' + embed.magazineUrl + rootPath;
                } else {
                    throw 'Styla Widget error: No domain defined or bad domain config.'; // eslint-disable-line
                }

                domain = domain.replace(/^(http(s)?:)?\/\//, '');

                return context.domain = domain;
            }

            return context.domain;
        }
    }]);

    return Build;
}();

Build.prototype.http = _microbeHttp.http;

exports.default = Build;

},{"/styla/widget/src/classes":4,"microbejs/dist/microbe.http.min":1}],4:[function(require,module,exports){
'use strict';

/* globals module */
/**
 * ## classes.js
 *
 * this sets class constants throughout the widget for the sake of future
 * flexibility
 */
module.exports = {
    BASE_STYLES: 'styla-widget__base-styling',
    CALL_TO_ACTION: 'styla-widget__calltoaction',
    CONTAINER: 'styla-widget__container',
    FONT_LINK: 'styla-widget__font-link',
    HEADLINE: 'styla-widget__headline',
    HEADLINE_WRAPPER: 'styla-widget__headlinewrap',
    HORIZONTAL_STYLES: 'styla-widget__horizontal-styling',
    IMAGE: 'styla-widget__image',
    IMAGE_WRAPPER: 'styla-widget__imagewrap',
    LIST_STYLES: 'styla-widget__list-styling',
    PARAGRAPH: 'styla-widget__paragraph',
    PARAGRAPH_AFTER: 'styla-widget__paragraph-after',
    STORIES_STYLES: 'styla-widget__stories-styling',
    STORY: 'styla-widget__story',
    STORY_LINK: 'styla-widget__link',
    STYLES: 'styla-widget__styling',
    TEXT_WRAPPER: 'styla-widget__textwrap',
    THEME_STYLES: 'styla-widget__theme-styling',
    TILES_STYLES: 'styla-widget__tiles-styling',
    TITLE: 'styla-widget__title',
    WRAPPER: 'styla-widget__wrapper'
};

},{}],5:[function(require,module,exports){
'use strict';

/* globals module */
module.exports = '2.4.1';

},{}]},{},[2]);