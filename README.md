Styla Widget  2.0.0
=======


The Styla Widget™ is a simple way to display stories from a Styla Magazine in a
smaller format, anywhere on your site. A story in the widget functions as
a teaser and will send the reader directly to the magazine when clicked on.

Visit the [demo page](http://static.styla.com/test/widget/) to see the
widget in action.

Using the Widget
----------------

Setting up the widget requires only basic HTML knowledge. It's built to adapt
to the available space it is given.

To use the widget, a client must include this script on their site. Modify the
slug `MAGAZINE_NAME` to match the name of the magazine.  This code *MUST* be inserted after
the target element.  To be safe, our recommendation is to insert it after the body in the page

```html
    <script src="http://widget.styla.com/tiles.min.js"></script>
    <script>
        new StylaWidget_Tiles( {
            slug    : 'MAGAZINE_NAME',
            target  : '.styla-widget__target'
        } );
    </script>
```

Tiles is not the only layout available.  Just change the word tiles out for another layout.

 Other layouts include:

+ horizontal
+ related stories
+ list
+ tiles
+ cards


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
    offset      // (default: 0) amount of entries to skip
    slug        // (REQUIRED) Magazine name
    storiesApi  // (default: false) manually set the exact api address to get
                //      stories from
    tag         // (default: false) Filter stories by tag
    category    // (default: false) Filter stories by category
    target      // (default: document.body) mount point of the widget. Accepts
                //      DOM elements and selector strings
};
```

Use this snippet to include the Styla widget on your page. You can build more
than one widget by simply adding it to the script, and picking your options


```html
    <script src="http://widget.styla.com/tiles.v2.min.js"></script>
    <script src="http://widget.styla.com/list.v2.min.js"></script>
    <script>
        new StylaWidget_Tiles( {
            limit   : 10,
            offset  : 2,
            slug    : 'uhrenschmuck24',
            target  : '.styla-widget__target'
        } );

        new StylaWidget_List( {
            newTab  : true,
            slug    : 'braunhamburg',
            target  : '.styla-widget__target2'
        } );
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
npm run build
```


Releasing
--------

When you release a new verion, commit it to dev (keeps dev upto date), commit it
to master, then commit it to release. It must be released from the `release` branch.  
It is the *only* branch that commits the dist files


Versioning
--------

For each major version change the version number in the minified js file will
increase. When the new version is committed to master and deployed to S3 they
will not overwrite the older versions. Which means that clients must manually
upgrade their implementations to use the later version of the widget.

Note that the first versions (beta and 1) did not use versioning in the file name,
so for example tiles.min.js represents the first version.

The non-minified files do not include a version number and will always be
overwritten with the edge version upon deploy.


Contributing
============

We gladly accept and review any pull-requests. Feel free!


This project adheres to the [Contributor Covenant](http://contributor-covenant.org/). By participating, you are expected to honor this code.

[Code of Conduct](https://github.com/styladev/widget/blob/master/CODE_OF_CONDUCT.md)



Change log
==========

### 2.0.0
    + all layouts truncate text with ellipsis instead of using theme styling.
    + cards layout includes custom Call-To-Action option
    + removed iframe option
    + removed newtab option

### 1.3.4
    + deprecated warning

### 1.3.3
    + fix release

### 1.3.2
    + fixed tests

### 1.3.1
    + fix tile widget styling

### 1.3.0
    + fixed theme styling for related stories
    + related stories uses square images

Older Changes
=============

To keep the length of this file down, [older changes are here](./older_changes.md)
