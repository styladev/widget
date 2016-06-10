Styla Widget  0.4.9
=======


The Styla Widget™ is a simple way to display stories from a Styla Magazine in a
smaller format, anywhere on your site. A story in the widget functions as
a teaser and will send the reader directly to the magazine when clicked on.

Visit the [demo page](a href="http://static.styla.com/test/widget/") to see the
widget in action.

Using the Widget
----------------

Setting up the widget requires only basic HTML knowledge. It's built to adapt
to the available space it is given.

To use the widget, a client must include this script on their site. Modify the
slug `MAGAZINE_NAME` to match the name of the magazine.

```html
    <div class="styla-widget__target" style="width: 400px;"></div>
    <script>window.stylaWidget = {slug : 'lavogi', target : '.styla-widget__target'};
    var d=document;var h=d.head;var s=d.createElement('SCRIPT');h.appendChild(s);
    s.src="//widget.styla.com/widget.min.js";</script>
```

See a live example on the [demo page](http://static.styla.com/test/widget/)


### Positioning

The Widget is responsive 🎉, and will automagically fit stories into the space
that it is given. For this to work, the desired width and height must be set on
the wrapping element.

Please allow for a **minimum width of 250px**. There is no technical max width,
but a widget that is given too much horizontal space may suffer cosmetic
challenges. Should a wider widget be desired, it's recommended to adjust the
font-size to a higher value.

If no height is specified the widget will take as much height that is needed to
display the amount of stories it is set to display. If a height is set however,
it will only display the amount of stories that actually fits within that height.
The height of a story is relative to the base font-size of the widget. If the font
size isset to 14px, one story will be exactly 14 times that value, in this case
196px.


### Additional options

```js
window.stylaWidget = {
    api         // (default: 'http://live.styla.com') base api url
    domain      // (default: false) if filled, this manually sets the base url for links
    iframe      // (default: false) open links on parent frame (top)
    ignore      // (default: false) story id to ignore when rendering (generally
                //      this represents the story that you're on)
    imageSize   // (default: 400) requested size (in pixels) of
                //      the image
    limit       // (default: 5) Amount of entries to retrieve. Please note that
                //      the widget will only display the amount of stories that
                //      actually fits within the space its given.
    linkDomain  // (default: false) domain to send links to.  this is ONLY
                //      necessary on domains that do not use the domainConfig
    minWidth    // (default: 250) minimum width (in px) for the mount point of the widget
    newTab      // (default: false) open links in a new tab
    offset      // (default: 0) amount of entries to skip
    slug        // (REQUIRED) Magazine name
    storiesApi  // (default: false) manually set the exact api address to get
                //      stories from
    tag         // (default: none) Filter stories by tag
    target      // (default: document.body) mount point of the widget. Accepts
                //      DOM elements and selector strings
    title       // (default: false) header title
};
```


```html
    <script>
    window.stylaWidget = {slug : 'MAGAZINE_NAME', limit:6, offset:12};
    var d=document;var h=d.head;var s=d.createElement('SCRIPT');
    h.appendChild(s);s.src="//widget.styla.com/widget.min.js";
    </script>
```

Technical requirements and limitations
--------------------------------------

Animated GIFs will be displayed as still images to reduce loading time and the
impact on performance of a client website.


dev installation
----------------

```
git clone git@github.com:styladev/widget.git
cd widget
npm i
npm run gulp
```


Releasing
--------

When you release a new verion, commit it to dev (keeps dev upto date), commit it to master, then commit it to release. It must be released from the `release` branch.  It is the *only* branch that commits the dist files



Contributing
============

We gladly accept and review any pull-requests. Feel free!


This project adheres to the [Contributor Covenant](http://contributor-covenant.org/). By participating, you are expected to honor this code.

[Code of Conduct](https://github.com/styladev/widget/blob/master/CODE_OF_CONDUCT.md)



Change log
==========

### 0.4.9

    + i a !
    + this.els changed to this.refs for readability


### 0.4.8

    + moved this.wrapper and this.container to this.els


### 0.4.7

    + better handling of empty story text
    + tests updated
    + inital load changes


### 0.4.4

    + removed margins for related stories


### 0.4.2

    + docs updated


### 0.4.1

    + center images vertically and horizontally with no cropping


### 0.4.0

    + styles and structure altered slightly
    + size changed to imageSize
    + feed changed to all
    + adjusted theme-style insertion
    + added domain option


Older Changes
=============

To keep the length of this file down, [older changes are here](./older_changes.md)
