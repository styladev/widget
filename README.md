Styla Widget  0.2.7
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
    slug        // Magazine name
    tag         // (default: none) Filter stories by tag
    limit       // (default: 5) Amount of entries to retrieve. Please note that
                // the widget will only display the amount of stories that
                // actually fits within the space its given.
    offset      // (default: 0) amount of entries to skip
    target      // (default: document.body) mount point of the widget. Accepts
                // DOM elements and selector strings
    newTab      // (default: false) open links in a new tab
    iframe      // (default: false) open links on parent frame (top)
    size        // (default: 400) requested size (in pixels) of the image
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
```


Contributing
============

We gladly accept and review any pull-requests. Feel free!


This project adheres to the [Contributor Covenant](http://contributor-covenant.org/). By participating, you are expected to honor this code.

[Code of Conduct](https://github.com/styladev/widget/blob/master/CODE_OF_CONDUCT.md)



Change log
==========

#### 0.2.4

    + src and liscence are now included with npm install


#### 0.2.3

    + added iframe


#### 0.2.2

    + added newTab


#### 0.2.1

    + gulp build adjusted for doc


#### 0.2.0

    + build object seperated from the widget


#### 0.1.6

    + fixed a bug where links were malformed missing a `/`
    + internal refactoring
