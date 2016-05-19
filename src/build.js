/**
 * ## build.js
 *
 * this contains methods to build the bite sized widget that do not need to be
 * outwardly facing
 */

import classes  from './classes.js';
import { http } from 'microbejs/dist/microbe.http.min';


/*
    exchanged for css in the gulp build
 */
const baseStyles        = `styla-widget-css-goes-here`;
const wrapperID         = `styla-widget`;
const domainConfigAPI   = `https://www.amazine.com/api/config/`;
const _reportError      = function( e ){ console.log( `err`, e ) };

/*
    sets context for the widget.  this is bound in widget js and set in
    getDomainConfig
 */
let self;

/*
    retrieved and parsed domain config.  this is declared here to keep it out
    of the global object, yet accessible.
 */
let domainConfig;


let build = {

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
    buildHeadline : function( title )
    {
        let create              = build.create;
        let headlineWrapper     = create( `div`, classes.HEADLINE_WRAPPER );
        let headline            = create( `h1`,  classes.HEADLINE );

        headline.textContent    = title;

        headlineWrapper.appendChild( headline );

        return headlineWrapper;
    },


    /**
     * ## buildImage
     *
     * builds the headline and headline wrapper and fills the wrapper with the
     * element and text
     *
     * @param {Array} images array of images from the product api
     * @param {String} title story headline
     *
     * @return _DOMElement_ imageWrapper
     */
    buildImage : function( images, title )
    {
        let create              = build.create;
        let imageWrapper        = create( `div`, classes.IMAGE_WRAPPER );
        let id                  = images[0].id;
        let imgObj              = self.images[ id ];
        let image               = create( `img`, classes.IMAGE );
        image.src               = build.getImageUrl( imgObj.fileName, 400 );
        image.alt               = imgObj.caption || title;
        image.title             = title;

        imageWrapper.appendChild( image );

        return imageWrapper;
    },


    /**
     * ## buildStories
     *
     * after recieving the story data, this parses and build the individual
     * stories
     *
     * @param {String} domainConfig JSON response from the product api
     * @param {Object} parsedDomainConfig parsed JSON object for testing
     *
     * @return _DOMElement_ wrapper element
     */
    buildStories : function( resDomainConfig, parsedDomainConfig )
    {
        domainConfig = parsedDomainConfig || JSON.parse( resDomainConfig );

        if ( Object.keys( domainConfig ).length === 0 )
        {
            throw `Styla Widget error: Could not find magazine, please check if slug is configured correctly.`;
        }

        build.setDomain();
        build.includeBaseStyles();

        let images      = {};
        let stories     = self.stories;
        let resImages   = stories.images;

        if ( resImages )
        {
            resImages.forEach( function( _i ){ images[ _i.id ] = _i; });

            self.images = images;
            let _els    = stories.stories.map( build.buildStory );

            let styling = build.compileStyles();

            document.head.appendChild( styling );
            self.target.appendChild( self.wrapper );
        }

        return self.wrapper;
    },


    /**
     * ## buildStory
     *
     * builds each story off the retrieved json
     *
     * @param {Object} json image data
     *
     * @return _DOMElement_ outer story element
     */
    buildStory : function( { title, description, images, externalPermalink } )
    {
        let create              = build.create;

        let story               = create( `div`,    classes.STORY );
        let storyLink           = create( `a`,      classes.STORY_LINK );
        storyLink.href          = `//${self.domain}/story/${externalPermalink}/`;
        story.appendChild( storyLink );


        storyLink.appendChild( build.buildImage( images, title ) );
        storyLink.appendChild( build.buildStoryText( title, description ) );

        let container = self.container;

        container.appendChild( story );
        self.wrapper.appendChild( container );

        return story;
    },


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
    buildStoryText : function( title, description )
    {
        let create          = build.create;
        let textWrapper     = create( `div`,    classes.TEXT_WRAPPER );

        let headlineWrapper = build.buildHeadline( title );
        textWrapper.appendChild( headlineWrapper );

        let paragraph       = create( `div`,    classes.PARAGRAPH );
        paragraph.innerHTML = build.getDescription( JSON.parse( description ) );
        paragraph.innerHTML = paragraph.textContent;
        textWrapper.appendChild( paragraph );

        return textWrapper;
    },


    /**
     * ## buildStyleTag
     *
     * builds a style tag and appends it to the DOM
     *
     * @param {String} css styles to add to the created tag
     *
     * @return _DOMElement_ style element
     */
    buildStyleTag : function( css )
    {
        let el          = document.createElement( `style` );
        el.type         = `text/css`;
        el.className    = classes.STYLES;

        let t   = document.createTextNode( css );
        el.appendChild( t );

        return el;
    },



    /**
     * ## compileStyles
     *
     * compiles the styles and returns them added to the style tag
     *
     * @return _DOMElement_ style element
     */
    compileStyles : function()
    {
        let theme   = domainConfig.theme;
        let css     =
            `.${classes.HEADLINE}
            {
                font-family:        ${theme.hff};
                font-weight:        ${theme.hfw};
                font-style:         ${theme.hfs};
                text-decoration:    ${theme.htd};
                letter-spacing:     ${theme.hls};
                color:              ${theme.htc};
            }
            .${classes.PARAGRAPH}
            {
                font-family:        ${theme.sff};
                font-weight:        ${theme.sfw};
                color:              ${theme.stc};
            }
            .${classes.PARAGRAPH}:after
            {
                content:            '${theme.strm}';
                font-weight:        ${theme.strmw};
                text-decoration:    ${theme.strmd};
            }`;

        return build.buildStyleTag( css );
    },


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
    create : function( _tag, _class )
    {
        let _el = document.createElement( _tag.toUpperCase() );

        if ( _class )
        {
            _el.className = _class;
        }

        return _el;
    },


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
    getDescription : function( _arr, i = 0 )
    {
        let text = _arr[ i ]

        if ( !text )
        {
            return false
        }
        else if ( text.type !== `text` )
        {
            return build.getDescription( _arr, i + 1 );
        }

        return text.content;
    },


    /**
     * ## getDomainConfig
     *
     * after recieving the story data this sends it to buildStories for
     * processing
     *
     * @param {String} res JSON response from the product api
     *
     * @return _DOMElement_ container element
     */
    getDomainConfig : function( stories )
    {
        self = this;

        self.stories    = JSON.parse( stories );
        let container   = self.container    = build.create( `DIV`, classes.CONTAINER );
        let wrapper     = self.wrapper      = build.create( `DIV`, classes.WRAPPER );
        wrapper.id      = wrapperID;

        http.get( domainConfigAPI + self.slug ).then( build.buildStories ).catch( _reportError );

        return container;
    },


    /**
     * ## getImageUrl
     *
     * uses the filename and size to create the full image url
     *
     * @param {String} filename from the image data object
     * @param {Number or String} size width to grab from the server
     *
     * @return _String_ file name
     */
    getImageUrl : function( filename, size = 400 )
    {
        return `//img.styla.com/resizer/sfh_${size}x0/_${filename}?still`;
    },


    /**
     * ## includeBaseStyles
     *
     * creates the base styles DOM element and adds it to the head
     *
     * @return _Void_
     */
    includeBaseStyles : function()
    {
        let head        = document.head;
        let el          = build.buildStyleTag( baseStyles );
        el.className    = classes.BASE_STYLES;

        head.appendChild( el );

        if ( domainConfig.embed.customFontUrl )
        {
            build.includeFonts( head );
        }

        return el;
    },


    /**
     * ## includeFonts
     *
     * includes the webfonts link element
     *
     * @return _DOMElement_ link element
     */
    includeFonts : function()
    {
        let el  = document.createElement( `link` );
        el.type = `text/css`;
        el.rel  = `stylesheet`;
        el.href = domainConfig.embed.customFontUrl;

        document.head.appendChild( el );

        return el;
    },


    /**
     * ## setDomain
     *
     * takes pieces of the domainConfig and builds the domain
     *
     * @return _String_ domain address
     */
    setDomain : function()
    {
        let embed   = domainConfig.embed;
        let domain  = self.domain = `${embed.magazineUrl}/${embed.rootPath}`;

        return domain;
    }
};


export default build;
