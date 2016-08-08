/*!
 * Styla bite-sized widget v1.3.1
 * https://github.com/styladev/widget
 *
 * Copyright 2016 Styla GmbH and other contributors
 * Released under the MIT license
 * https://github.com/styladev/widget/blob/master/license.md
 *
 * Date: Mon Aug 08 2016
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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
/**
 * Styla bite-sized widget
 *
 * lite embeddable widget for non-styla pages
 *
 * @author "Mouse Braun <mouse@styla.com>"
 * @author "Elias Liedholm <elias@styla.com>"
 */

var _version = require('/Users/elias/develop/widget/src/version');

var _version2 = _interopRequireDefault(_version);

var _classes = require('/Users/elias/develop/widget/src/classes');

var _classes2 = _interopRequireDefault(_classes);

var _build = require('/Users/elias/develop/widget/src/build');

var _build2 = _interopRequireDefault(_build);

var _microbeHttp = require('microbejs/dist/microbe.http.min');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var format = 'horizontal';
format = format[0].toUpperCase() + format.slice(1);

var StylaWidget = function () {
    _createClass(StylaWidget, [{
        key: 'attach',

        /**
         * ## attach
         *
         * adds the previously configured widget to the currently
         * defined target or a new selector / el
         *
         * @return _Void_
         */
        value: function attach() {
            var target = arguments.length <= 0 || arguments[0] === undefined ? this.target : arguments[0];

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
         * @param {String or DOMElement} target attach point for the widget
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
                console.error('Styla Widget error: Cant find target element in DOM. Widget will render directly in body');
                return document.body;
            } else if (target.offsetWidth < minWidth) {
                throw 'Styla Widget error: Target element too small to render widget ¯\\_(ツ)_/¯';
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
         * @return _Object_ this
         */

    }]);

    function StylaWidget() {
        var _this = this;

        var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        var slug = _ref.slug;
        var _ref$api = _ref.api;
        var api = _ref$api === undefined ? 'https://live.styla.com' : _ref$api;
        var _ref$domain = _ref.domain;
        var domain = _ref$domain === undefined ? false : _ref$domain;
        var _ref$iframe = _ref.iframe;
        var iframe = _ref$iframe === undefined ? false : _ref$iframe;
        var _ref$ignore = _ref.ignore;
        var ignore = _ref$ignore === undefined ? false : _ref$ignore;
        var _ref$limit = _ref.limit;
        var limit = _ref$limit === undefined ? 5 : _ref$limit;
        var _ref$linkDomain = _ref.linkDomain;
        var linkDomain = _ref$linkDomain === undefined ? false : _ref$linkDomain;
        var _ref$minWidth = _ref.minWidth;
        var minWidth = _ref$minWidth === undefined ? 250 : _ref$minWidth;
        var _ref$newTab = _ref.newTab;
        var newTab = _ref$newTab === undefined ? false : _ref$newTab;
        var _ref$offset = _ref.offset;
        var offset = _ref$offset === undefined ? 0 : _ref$offset;
        var _ref$imageSize = _ref.imageSize;
        var imageSize = _ref$imageSize === undefined ? 400 : _ref$imageSize;
        var _ref$storiesApi = _ref.storiesApi;
        var storiesApi = _ref$storiesApi === undefined ? false : _ref$storiesApi;
        var _ref$tag = _ref.tag;
        var tag = _ref$tag === undefined ? false : _ref$tag;
        var _ref$category = _ref.category;
        var category = _ref$category === undefined ? false : _ref$category;
        var _ref$target = _ref.target;
        var target = _ref$target === undefined ? document.body : _ref$target;

        _classCallCheck(this, StylaWidget);

        target = this.checkTarget(target, minWidth);

        if (!slug) {
            throw 'Styla Widget error: No slug defined, cannot render widget';
        }

        this.format = format;
        this.refs = {};
        this.api = api;
        this.domain = domain;
        this.linkDomain = linkDomain;
        this.iframe = iframe;
        this.ignore = ignore;

        this.limit = limit = ignore ? limit + 1 : limit;
        this.minWidth = minWidth;
        this.newTab = newTab;
        this.offset = offset;
        this.imageSize = imageSize;
        this.slug = slug;
        this.storiesApi = storiesApi;
        this.tag = tag;
        this.category = category;
        this.target = target;

        if (tag !== false && category !== false) {
            console.error('Styla Widget error: Both tag and category filter has been added to the configuration, but only one can be used, stories will be filtered only by tag.');
        }

        var url = void 0;

        if (tag != false) {
            url = api + '/api/feeds/tags/' + tag + '?offset=' + offset + '&limit=' + limit + '&domain=' + slug;
        } else if (category != false) {
            url = api + '/api/feeds/boards/' + category + '/user/' + slug + '?domain=' + slug + '&offset=' + offset;
        } else {
            url = api + '/api/feeds/all?domain=' + slug + '&offset=' + offset + '&limit=' + limit;
        }

        this.url = url;

        this.http.get(storiesApi || url).then(function (stories) {
            var build = new _build2.default(_this, stories);
        });

        Object.defineProperty(this, 'version', { value: _version2.default });
    }

    /**
     * ## destroy
     *
     * removes the styla widget from the DOM
     *
     * @return _Void_
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

;

StylaWidget.prototype.http = _microbeHttp.http;

window['StylaWidget_' + format] = StylaWidget;

Object.defineProperty(StylaWidget, 'version', { value: _version2.default });

exports.default = StylaWidget;

},{"/Users/elias/develop/widget/src/build":3,"/Users/elias/develop/widget/src/classes":4,"/Users/elias/develop/widget/src/version":5,"microbejs/dist/microbe.http.min":1}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * ## this.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * this contains methods to build the bite sized widget that do not need to be
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * outwardly facing
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _classes = require('./classes.js');

var _classes2 = _interopRequireDefault(_classes);

var _microbeHttp = require('microbejs/dist/microbe.http.min');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
    exchanged for css in the gulp build
 */
var baseStyles = '#styla-widget p{margin:0}#styla-widget.styla-widget__wrapper{width:100%;height:100%}#styla-widget .styla-widget__container{box-sizing:border-box;position:relative;overflow:hidden;height:100%;width:100%;min-height:14em;font-size:14px}#styla-widget .styla-widget__story{margin-bottom:1em;position:relative}#styla-widget .styla-widget__link{position:absolute;width:100%;display:-moz-flex;display:-webkit-flex;display:flex;text-decoration:none;color:inherit}#styla-widget__link>div{display:inline-block}#styla-widget .styla-widget__image{max-height:100%;max-width:100%;height:100%;object-fit:contain}#styla-widget .styla-widget__textwrap{display:block;flex-grow:1;-webkit-flex-grow:1;-moz-flex-grow:1;max-height:100%;overflow:hidden;float:left}#styla-widget .styla-widget__headlinewrap{display:flex;flex-direction:column;justify-content:flex-end;-webkit-justify-content:flex-end;-moz-justify-content:flex-end}#styla-widget .styla-widget__headline,#styla-widget .styla-widget__title{line-height:1.25em;max-height:2.5em;overflow:hidden}#styla-widget .styla-widget__title{font-size:2em;text-align:center;margin-bottom:30px}#styla-widget .styla-widget__paragraph{font-size:1em;line-height:1.5em;overflow:hidden;position:relative;word-wrap:break-word}';
var specificStyles = '#styla-widget.horizontal .styla-widget__container{padding:1em;display:-moz-flex;display:-webkit-flex;display:-ms-flex;display:flex;flex-direction:row;-webkit-flex-direction:row;-moz-flex-direction:row;-mz-flex-direction:row;flex-wrap:wrap;-moz-flex-wrap:wrap;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;height:16em}#styla-widget.horizontal .styla-widget__story{margin:0 2em 1em;height:14em;width:24em;display:block;float:left;flex-grow:1;-moz-flex-grow:1;-ms-flex-grow:1;-webkit-flex-grow:1}#styla-widget.horizontal .styla-widget__link{height:14em;top:50%;margin-top:-7em;align-items:center}#styla-widget.horizontal .styla-widget__imagewrap{display:block;vertical-align:top;flex-grow:1;-webkit-flex-grow:1;-moz-flex-grow:1;-ms-flex-grow:1;height:100%;margin:0 6% 0 0;flex:none;-webkit-flex:none;-moz-flex:none;-ms-flex:none;max-width:40%;float:left}#styla-widget.horizontal .styla-widget__textwrap{display:block;max-height:100%;overflow:hidden;float:left}#styla-widget.horizontal .styla-widget__headlinewrap{height:5em;display:-moz-flex;display:-webkit-flex;display:-ms-flex;display:flex;flex-direction:column;-webkit-flex-direction:column;-moz-flex-direction:column;-ms-flex-direction:column;justify-content:flex-end;-webkit-justify-content:flex-end;-moz-justify-content:flex-end;-ms-justify-content:flex-end}#styla-widget.horizontal .styla-widget__headline{font-size:1.9em;line-height:1.25em;max-height:2.5em;overflow:hidden;margin:0 0 .25em;word-wrap:break-word;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2}#styla-widget.horizontal .styla-widget__paragraph{font-size:1em;line-height:1.5em;max-height:7.5em;overflow:hidden;position:relative;word-wrap:break-word}#styla-widget.horizontal .styla-widget__paragraph-after{line-height:1.5em}#styla-widget.horizontal .styla-widget__paragraph p+p{display:none}';
var wrapperID = 'styla-widget';

/* istanbul ignore next */
var _reportError = function _reportError(e) {
    console.log('err', e);
};

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
         * @return _DOMElement_ headlineWrapper
         */
        value: function buildHeadline(title) {
            var create = this.create;
            var headlineWrapper = create('div', _classes2.default.HEADLINE_WRAPPER);
            var headline = create('h3', _classes2.default.HEADLINE);

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
         * @return _DOMElement_ imageWrapper
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
         * @return _Void_
         */

    }, {
        key: 'buildStories',
        value: function buildStories() {
            var domainConfig = arguments.length <= 0 || arguments[0] === undefined ? '{}' : arguments[0];

            var domainConfigParsed = this.domainConfig = JSON.parse(domainConfig);

            if (Object.keys(domainConfigParsed).length === 0) {
                throw 'Styla Widget error: Could not find magazine, please check if slug is configured correctly.';
            }

            var images = {};
            var context = this.context;
            var stories = context.stories;
            var resImages = stories.images;
            var refs = context.refs;

            context.domain = this.setDomain();

            refs.styles = this.includeBaseStyles();

            if (resImages) {

                resImages.forEach(function (_i) {
                    images[_i.id] = _i;
                });
                context.images = images;

                var _els = stories.stories.map(this.buildStory);
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
         * builds each story off the retrieved json.  skips a story if the id matches ignore.
         * no matter what it will always build the number of stories set in the limit
         *
         * @param {Object} json image data
         * @param {Number} i iterator
         *
         * @return _DOMElement_ outer story element
         */

    }, {
        key: 'buildStory',
        value: function buildStory(_ref) {
            var title = _ref.title;
            var description = _ref.description;
            var images = _ref.images;
            var externalPermalink = _ref.externalPermalink;
            var id = _ref.id;
            var i = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

            var context = this.context;

            if ('' + context.ignore !== '' + id && i < this.ignored + context.limit) {
                var create = this.create;

                var story = create('div', _classes2.default.STORY);
                var storyLink = create('a', _classes2.default.STORY_LINK);

                storyLink.href = '//' + context.domain + '/story/' + externalPermalink;

                if (context.newTab) {
                    storyLink.setAttribute('target', '_blank');
                } else if (context.iframe) {
                    storyLink.setAttribute('target', '_top');
                }

                story.appendChild(storyLink);

                storyLink.appendChild(this.buildImage(images, title));
                storyLink.appendChild(this.buildStoryText(title, description));

                var container = context.refs.container;
                var wrapper = context.refs.wrapper;

                container.appendChild(story);
                wrapper.appendChild(container);

                return story;
            } else {
                this.ignored++;

                return false;
            }
        }

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

    }, {
        key: 'buildStoryText',
        value: function buildStoryText(title) {
            var description = arguments.length <= 1 || arguments[1] === undefined ? '{}' : arguments[1];

            var create = this.create;
            var textWrapper = create('div', _classes2.default.TEXT_WRAPPER);

            var headlineWrapper = this.buildHeadline(title);
            textWrapper.appendChild(headlineWrapper);

            var paragraph = create('div', _classes2.default.PARAGRAPH);
            description = this.getDescription(JSON.parse(description));

            if (description) {
                paragraph.innerHTML = description;
                paragraph.innerHTML = paragraph.textContent;
            }

            textWrapper.appendChild(paragraph);

            var paragraphAfter = create('div', _classes2.default.PARAGRAPH_AFTER);
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
         * @return _DOMElement_ style element
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
         * @return _DOMElement_ style element
         */

    }, {
        key: 'compileStyles',
        value: function compileStyles() {
            var theme = this.domainConfig.theme;
            var css = '';
            var now = this.now;
            var context = this.context;

            if (theme) {
                css = '#styla-widget .styla-widget-' + now + ' .' + _classes2.default.HEADLINE + ',\n                #styla-widget .styla-widget-' + now + ' .' + _classes2.default.TITLE + '\n                {\n                    font-family:        ' + theme.hff + ';\n                    font-weight:        ' + theme.hfw + ';\n                    font-style:         ' + theme.hfs + ';\n                    text-decoration:    ' + theme.htd + ';\n                    letter-spacing:     ' + theme.hls + ';\n                    color:              ' + theme.htc + ';\n                }\n                #styla-widget .styla-widget-' + now + ' .' + _classes2.default.PARAGRAPH + ', #styla-widget .styla-widget-' + now + ' .' + _classes2.default.PARAGRAPH_AFTER + '\n                {\n                    font-family:        ' + theme.sff + ';\n                    font-weight:        ' + theme.sfw + ';\n                    color:              ' + theme.stc + ';\n                }\n                #styla-widget .styla-widget-' + now + ' .' + _classes2.default.PARAGRAPH_AFTER + ':after\n                {\n                    content:            \'' + theme.strm + '\';\n                    font-weight:        ' + theme.strmw + ';\n                    text-decoration:    ' + theme.strmd + ';\n                }';
            }

            var el = this.buildStyleTag(css);
            el.className = _classes2.default.THEME_STYLES + '  styla-widget__' + context.format;

            context.refs.themeStyle = el;

            return el;
        }

        /**
         * ## constructor
         *
         * builds build
         *
         * @param {Object} context context to be passed to this.context
         */

    }]);

    function Build(context, stories) {
        _classCallCheck(this, Build);

        this.context = context;
        this.now = Date.now();
        this.ignored = 0;

        this.buildStories = this.buildStories.bind(this);
        this.buildStory = this.buildStory.bind(this);

        if (!context.refs.wrapper) {
            context.stories = JSON.parse(stories);
            var format = context.format.toLowerCase();

            context.refs.container = this.create('DIV', _classes2.default.CONTAINER + '  styla-widget-' + this.now);
            var wrapper = context.refs.wrapper = this.create('DIV', _classes2.default.WRAPPER + '  ' + format);
            wrapper.id = wrapperID;

            var domainConfigAPI = context.api + '/api/config/' + context.slug;

            this.http.get(domainConfigAPI).then(this.buildStories).catch(_reportError);
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
     * @return _DOMElement_ newly created element
     */


    _createClass(Build, [{
        key: 'create',
        value: function create(tag, clss) {
            var _el = document.createElement(tag.toUpperCase());

            if (clss) {
                _el.className = clss;
            }

            return _el;
        }

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

    }, {
        key: 'getDescription',
        value: function getDescription(arr) {
            var i = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

            var text = arr[i];

            if (!text) {
                return false;
            }

            var el = this.create('div');
            el.innerHTML = text.content;
            var actualText = el.textContent;

            if (text.type !== 'text' || actualText === '') {
                return this.getDescription(arr, i + 1);
            }

            return text.content;
        }

        /**
         * ## getImageUrl
         *
         * uses the filename and size to create the full image url
         *
         * @param {String} filename from the image data object
         * @param {Number or String} imageSize width to grab from the server
         *
         * @return _String_ file name
         */

    }, {
        key: 'getImageUrl',
        value: function getImageUrl(filename) {
            var imageSize = arguments.length <= 1 || arguments[1] === undefined ? 400 : arguments[1];

            return '//img.styla.com/resizer/sfh_' + imageSize + 'x0/_' + filename + '?still';
        }

        /**
         * ## includeBaseStyles
         *
         * creates the base styles DOM element and adds it to the head
         *
         * @return _Void_
         */

    }, {
        key: 'includeBaseStyles',
        value: function includeBaseStyles(css) {
            var el = void 0;
            var self = this;
            var context = this.context;
            var formatCaps = context.format.toUpperCase();
            var head = document.head;

            function _addBaseStyle(css, _class, _format) {
                var baseStyle = head.querySelector('.' + _class);

                if (!baseStyle) {
                    el = self.buildStyleTag(css);
                    el.className = _class + '  ' + _classes2.default.STYLES;

                    context.refs[_format + 'Style'] = el;

                    head.appendChild(el);
                }

                return el;
            }

            var arr = new Array(2);

            arr[0] = _addBaseStyle(css || baseStyles, '' + _classes2.default.BASE_STYLES, 'base');
            arr[1] = _addBaseStyle(specificStyles, _classes2.default[formatCaps + '_STYLES'], context.format);

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
         * @return _DOMElement_ link element
         */

    }, {
        key: 'includeFonts',
        value: function includeFonts() {
            var el = document.createElement('link');
            el.className = _classes2.default.FONT_LINK;
            el.type = 'text/css';
            el.rel = 'stylesheet';
            var fontUrl = this.domainConfig.embed.customFontUrl;
            el.href = fontUrl.indexOf('//') !== -1 ? fontUrl : '//' + fontUrl;

            document.head.appendChild(el);

            return el;
        }

        /**
         * ## setDomain
         *
         * takes pieces of the domainConfig and builds the domain
         *
         * @return _String_ domain address
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
                } else {
                    if (embed) {
                        var rootPath = embed.rootPath;

                        if (rootPath[0] === '/') {
                            rootPath = rootPath.slice(1);
                        }

                        domain = embed.magazineUrl + '/' + rootPath;
                    } else {
                        throw 'Styla Widget error: No domain defined or bad domain config.';
                    }
                }

                domain = domain.replace(/^(http(s)?:)?\/\//, '');

                return context.domain = domain;
            }

            return context.domain;
        }
    }]);

    return Build;
}();

;

Build.prototype.http = _microbeHttp.http;

exports.default = Build;

},{"./classes.js":4,"microbejs/dist/microbe.http.min":1}],4:[function(require,module,exports){
'use strict';

/**
 * ## classes.js
 *
 * this sets class constants throughout the widget for the sake of future
 * flexability
 */
module.exports = {
    BASE_STYLES: 'styla-widget__base-styling',
    FONT_LINK: 'styla-widget__font-link',
    TILES_STYLES: 'styla-widget__tiles-styling',
    LIST_STYLES: 'styla-widget__list-styling',
    HORIZONTAL_STYLES: 'styla-widget__horizontal-styling',
    STORIES_STYLES: 'styla-widget__stories-styling',
    CONTAINER: 'styla-widget__container',
    HEADLINE: 'styla-widget__headline',
    HEADLINE_WRAPPER: 'styla-widget__headlinewrap',
    IMAGE: 'styla-widget__image',
    IMAGE_WRAPPER: 'styla-widget__imagewrap',
    PARAGRAPH: 'styla-widget__paragraph',
    PARAGRAPH_AFTER: 'styla-widget__paragraph-after',
    STORY: 'styla-widget__story',
    STORY_LINK: 'styla-widget__link',
    STYLES: 'styla-widget__styling',
    TEXT_WRAPPER: 'styla-widget__textwrap',
    THEME_STYLES: 'styla-widget__theme-styling',
    TITLE: 'styla-widget__title',
    WRAPPER: 'styla-widget__wrapper'
};

},{}],5:[function(require,module,exports){
'use strict';

module.exports = '1.3.1';

},{}]},{},[2]);
