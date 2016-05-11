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

add this script to the html in your page:

```html
    <script>
    window.stylaWidget = {slug : 'CLIENT_DOMAIN', tag : 'TAG'};
    var d=document;var h=d.head;var s=d.createElement('SCRIPT');
    h.appendChild(s);s.src="../dist/widget.js";
    </script>
```

Technical requirements
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
