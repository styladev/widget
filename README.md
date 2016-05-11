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
The Widget is responsive 🎉, and will automagically fit stories into the space
that it is given. For this to work, the desired width and height must be set on
the wrapping element.

Please allow for a **minimum width of 250px**. There is no technical max width,
but a widget that is given too much horizontal space may suffer from esthetic
challenges. Should a wider widget be desired, its recommended to adjust the
font-size to a higher value.

If no height is set the widget will take as much height that is needed to
display the amount of stories it is set to display. If a height is set however,
it will only display the amount of stories that actually fits within that height.
The height of a story is relative to the base font-size of the widget. If the font
size isset to 14px, one story will be exactly 14 times that value, in this case
196px.

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
