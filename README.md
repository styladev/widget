Styla Widget  2.5.2
=======

The Styla Widget™ is a simple way to display stories from a Styla Magazine in a
smaller format, anywhere on your site. A story in the widget functions as
a teaser and will send the reader directly to the magazine when clicked on.


Using the Widget
----------------

Setting up the widget requires only basic HTML knowledge. It's built to adapt
to the available space it is given.

To use the widget, a client must include this script on their site. Modify the
slug `MAGAZINE_NAME` to match the name of the magazine.  This code *MUST* be inserted after
the target element.  To be safe, our recommendation is to insert it after the body in the page

```html
    <script src="http://widget.styla.com/tiles.v2.min.js"></script>
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


See a live example on the [demo page](http://widget.styla.com)


### Positioning

*The following documentation on positioning only applies to the list-style widget.*

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
new StylaWidget_List( {
    api             // (default: 'http://live.styla.com') base api url
    domain          // (default: false) if filled, this manually sets the base url for links
    ignore          // (default: false) story id to ignore when rendering (generally
                    //      this represents the story that you're on)
    imageSize       // (default: 400) requested size (in pixels) of
                    //      the image
    limit           // (default: 5) Amount of entries to retrieve. Please note that
                    //      the widget will only display the amount of stories that
                    //      actually fits within the space its given.
    linkDomain      // (default: false) domain to send links to.  this is ONLY
                    //      necessary on domains that do not use the domainConfig
    minWidth        // (default: 250) minimum width (in px) for the mount point of the widget
    offset          // (default: 0) amount of entries to skip
    slug            // (REQUIRED) Magazine name
    storiesApi      // (default: false) manually set the exact api address to get
                    //      stories from
    ignoreFonts     // (default: false) if set to true, external fonts will not be loaded
    tag             // (default: false) Filter stories by tag
    category        // (default: false) Filter stories by category id
    target          // (default: document.body) mount point of the widget. Accepts
                    //      DOM elements and selector strings
    cta             // (default: false) Add custom Call-To-Action string [cards layout only]
    urlParams       // (default: true) Add tracking parameters to the story URL
    imageApiDomain  // (default: "img.styla.com") the domain of the Image API
} );
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
            slug    : 'demo',
            target  : '.styla-widget__target'
        } );

        new StylaWidget_List( {
            slug    : 'demo',
            target  : '.styla-widget__target2'
        } );
    </script>
```



Technical requirements and limitations
--------------------------------------

Animated GIFs will be displayed as still images to reduce loading time and the
impact on performance of a client website.


Dev installation
----------------

```
git clone git@github.com:styladev/widget.git
cd widget
npm install
npm run build
python -m SimpleHTTPServer [port]
```

then, find a demo page at `localhost:8000/dist/stage.html`

To stop the server, press CTRL-C



>In case you get a `primordials is not defined` error when building, make sure you use an older version of Node (`10.*`). This library uses a legacy version of Gulp and there is a known uncompatibility between this version and Node > 10.

Releasing
--------

When you release a new version, commit it to stage, commit it
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

### 2.5.2
    + remove tracking URL parameters

### 2.5.1
    + support text-transform from theme 

### 2.5.0
    + support new routing config

### 2.4.2
    + related stories: set height of container and wrapper to initial value so it only takes the space it needs

### 2.4.1
    + add the imageUrlDomain to distinguish between production and stage environments

### 2.4.0
    + reduce headline font size in list and horizontal layout

### 2.3.1
    + added ignoreFonts parameter to avoid external font loading

### 2.3.0
    + images render as background images on the image wrapper element as a fallback for Internet Explorer

### 2.2.0
    + truncate text after 220 characters
    + replace h3 tags with spans for headlines
    + make url tracking parameters optional

### 2.1.15
    + fix image positioning in tiles layout for firefox

### 2.1.14
    + move after element content from css to js in order to fix minifying

### 2.1.13
    + story text is not limited anymore to the first text element only
    + fix minifying

### 2.1.12
    + generate links correctly regardless of domain config formatting

### 2.1.11
    + only use hashtag navigation when pushstateDefault is explicitly set to false

### 2.1.10
    + broken release

### 2.1.9
    + fix broken release 2.1.8

### 2.1.8
    + related stories layout allows headlines to wrap on two lines

### 2.1.7
    + fix wrapping issue for cards widget

### 2.1.6
    + fixed minimum height of cards widget

### 2.1.5
    + offset behavior changed
    + randomize removed

### 2.1.4
    + fix bug where more than limited amount of stories can be rendered if both
    randomize and ignore story is active
    + get route configuration from domain config to format links correctly

### 2.1.3
    + add top and bottom margin to h3 headlines

### 2.1.2
    + bump version number to replaces borked release 2.1.1 (missing dist files)

### 2.1.1
    + rolling back api changes
    + added randomize option
    + added eslint
    + added stylelint
    + changed `npm run test` from a simple to a coverage test

### 2.1.0
    + added support for links with hashtag navigation
    + new feed API format

### 2.0.0
    + all layouts truncate text with ellipsis instead of using theme styling.
    + cards layout includes custom Call-To-Action option
    + removed iframe option
    + removed newtab option
    + adds tracking parameters to URL

Older Changes
=============

To keep the length of this file down, [older changes are here](./older_changes.md)