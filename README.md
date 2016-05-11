Styla Widget  0.0.2
===================
The Styla Widget™ is a simple way to display stories from a Styla Magazine in a
smaller format, anywhere on your site. A story in the widget functions as
a teaser and will send the reader directly to the magazine when clicked on.

Stories can be filtered based on author, tag and category.

Using the Widget
-----
Setting up the widget requires only basic HTML knowledge. It's built to adapt
to the available space it is given.

To use the widget, a client must include this script on their site. Modify the
slug `MAGAZINE_NAME` to match the name of the magazine.

```html
    <script>
    window.stylaWidget = {slug : 'MAGAZINE_NAME'};
    var d=document;var h=d.head;var s=d.createElement('SCRIPT');
    h.appendChild(s);s.src="../dist/widget.js";
    </script>
```

###Positioning###
The widget is responsive 🎉

###Additional options###

Stories can be filtered based on tags by adding `tag : 'TAG',` to the configuration
object.

The amount of stories can be adjusted by setting the limit: `limit: 10`. The
default is 5 stories. Please note that the widget will only display the amount
of stories that actually fits within the space its given.

```html
    <script>
    window.stylaWidget = {slug : 'MAGAZINE_NAME', tag : 'TAG', limit: 10};
    var d=document;var h=d.head;var s=d.createElement('SCRIPT');
    h.appendChild(s);s.src="../dist/widget.js";
    </script>
```

Technical requirements and limitations
-----
The widget container must be allowed a **minimum width of 250px**.

Animated GIFs will be displayed as still images to reduce loading time and the
impact on performance of a client website.

dev installation
----------------

`npm i`



Contributing
============

We gladly accept and review any pull-requests. Feel free!


This project adheres to the [Contributor Covenant](http://contributor-covenant.org/). By participating, you are expected to honor this code.

[Code of Conduct](https://github.com/styladev/widget/blob/master/CODE_OF_CONDUCT.md)

Need to report something? [hr](mailto:hr)


See more examples on the [demo page](./demo/index.html)
