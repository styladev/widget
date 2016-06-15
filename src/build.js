/**
 * ## this.js
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
const specificStyles    = `styla-build-specific-css-goes-here`;
const wrapperID         = `styla-widget`;
const _reportError      = function( e ){ console.log( `err`, e ) };

/*
    retrieved and parsed domain config.  this is declared here to keep it out
    of the global object, yet accessible.
 */
let domainConfig;

/*
    used in tracking ignored stories for the sake of getting the right amount later
 */
let ignored = 0;


class Build
{
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
    buildHeadline( title )
    {
        let create              = this.create;
        let headlineWrapper     = create( `div`, classes.HEADLINE_WRAPPER );
        let headline            = create( `h3`,  classes.HEADLINE );

        headline.textContent    = title;

        headlineWrapper.appendChild( headline );

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
    buildImage( images, title, context )
    {
        this.context           = this.context || context;
        let create              = this.create;
        let imageWrapper        = create( `div`, classes.IMAGE_WRAPPER );
        let imageSize           = this.context.imageSize;
        let id                  = images[0].id;
        let imgObj              = this.context.images[ id ];

        let url                 = this.getImageUrl( imgObj.fileName, imageSize );

        let image               = create( `img`, classes.IMAGE );
        image.src               = url;
        image.alt               = imgObj.caption || title;
        image.title             = title;

        imageWrapper.appendChild( image );

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
    buildStories = ( resDomainConfig, parsedDomainConfig ) =>
    {
        domainConfig = parsedDomainConfig || JSON.parse( resDomainConfig );

        if ( Object.keys( domainConfig ).length === 0 )
        {
            throw `Styla Widget error: Could not find magazine, please check if slug is configured correctly.`;
        }
        this.setDomain();
        this.includeBaseStyles();

        let images      = {};
        let context     = this.context;
        let stories     = context.stories;
        let resImages   = stories.images;

        if ( resImages )
        {
            context.title = this.buildTitle();

            resImages.forEach( function( _i ){ images[ _i.id ] = _i; });

            context.images = images;
            let _els    = stories.stories.map( this.buildStory );

            let styling = this.compileStyles();

            document.head.appendChild( styling );
            context.target.appendChild( context.refs.wrapper );
        }
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
    buildStory = ( { title, description, images, externalPermalink, id }, i ) =>
    {
        let context     = this.context;

        if ( `${context.ignore}` !== `${id}` && i - ignored < context.limit )
        {
            let create              = this.create;

            let story               = create( `div`,    classes.STORY );
            let storyLink           = create( `a`,      classes.STORY_LINK );
            storyLink.href          = `//${context.domain}/story/${externalPermalink}/`;

            if ( context.newTab )
            {
                storyLink.setAttribute( `target`, `_blank` );
            }
            else if ( context.iframe )
            {
                storyLink.setAttribute( `target`, `_top` );
            }

            story.appendChild( storyLink );

            storyLink.appendChild( this.buildImage( images, title ) );
            storyLink.appendChild( this.buildStoryText( title, description ) );

            let container   = context.refs.container;
            let wrapper     = context.refs.wrapper;

            container.appendChild( story );
            wrapper.appendChild( container );

            return story;
        }
        else
        {
            ignored++;

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
    buildStoryText( title, description )
    {
        let create          = this.create;
        let textWrapper     = create( `div`,    classes.TEXT_WRAPPER );

        let headlineWrapper = this.buildHeadline( title );
        textWrapper.appendChild( headlineWrapper );

        let paragraph       = create( `div`,    classes.PARAGRAPH );
        description         = this.getDescription( JSON.parse( description ) );

        if ( description )
        {
            paragraph.innerHTML = description;
            paragraph.innerHTML = paragraph.textContent;
        }

        textWrapper.appendChild( paragraph );

        let paragraphAfter  = create( `div`,    classes.PARAGRAPH_AFTER );
        textWrapper.appendChild( paragraphAfter );

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
    buildStyleTag( css )
    {
        let el          = document.createElement( `style` );
        el.type         = `text/css`;
        el.className    = classes.STYLES;

        let t   = document.createTextNode( css );
        el.appendChild( t );

        return el;
    }


    /**
     * ## buildTitle
     *
     * builds the title element, fills it, and attaches it to the container
     *
     * @return _DOMElement_
     */
    buildTitle()
    {
        let context     = this.context;

        if ( context.title === true && domainConfig.title )
        {
            context.title = domainConfig.title;
        }

        if ( context.title )
        {
            let text        = context.title;
            let title       = context.title    = this.create( `DIV`, classes.TITLE );
            title.innerHTML = text;

            context.refs.container.appendChild( title );
        }

        return context.title;
    }


    /**
     * ## compileStyles
     *
     * compiles the styles and returns them added to the style tag
     *
     * @return _DOMElement_ style element
     */
    compileStyles()
    {
        let theme   = domainConfig.theme;
        let css     = ``;
        let now     = this.now;
        let context = this.context;

        if ( theme )
        {
            css =
                `.styla-widget-${now} .${classes.HEADLINE},
                .styla-widget-${now} .${classes.TITLE}
                {
                    font-family:        ${theme.hff};
                    font-weight:        ${theme.hfw};
                    font-style:         ${theme.hfs};
                    text-decoration:    ${theme.htd};
                    letter-spacing:     ${theme.hls};
                    color:              ${theme.htc};
                }
                .styla-widget-${now} .${classes.PARAGRAPH}, .styla-widget-${now} .${classes.PARAGRAPH_AFTER}
                {
                    font-family:        ${theme.sff};
                    font-weight:        ${theme.sfw};
                    color:              ${theme.stc};
                }
                .styla-widget-${now} .${classes.PARAGRAPH_AFTER}:after
                {
                    content:            '${theme.strm}';
                    font-weight:        ${theme.strmw};
                    text-decoration:    ${theme.strmd};
                }`;
        }

        let el          = this.buildStyleTag( css );
        el.className    = `${classes.THEME_STYLES}  styla-widget__${context.format}`;

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
    constructor( context, stories )
    {
        this.context    = context;
        this.now        = Date.now();

        if ( !context.refs.wrapper )
        {
            context.stories = JSON.parse( stories );
            let format      = context.format.toLowerCase();

            let container   = context.refs.container = this.create( `DIV`, `${classes.CONTAINER}  styla-widget-${this.now}` );
            let wrapper     = context.refs.wrapper   = this.create( `DIV`, `${classes.WRAPPER}  ${format}` );
            wrapper.id      = wrapperID;

            let domainConfigAPI   = `https://live.styla.com/api/config/`;
            http.get( domainConfigAPI + context.slug ).then( this.buildStories ).catch( _reportError );

            return container;
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
    create( tag, clss )
    {
        let _el = document.createElement( tag.toUpperCase() );

        if ( clss )
        {
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
    getDescription( arr, i = 0 )
    {
        let text        = arr[ i ];
        let el          = this.create( `div` );
        el.innerHTML    = text.content;
        let actualText  = el.textContent;

        if ( !text )
        {
            return false;
        }
        else if ( text.type !== `text` || actualText === `` )
        {
            return this.getDescription( arr, i + 1 );
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
    getImageUrl( filename, imageSize = 400 )
    {
        return `//img.styla.com/resizer/sfh_${imageSize}x0/_${filename}?still`;
    }


    /**
     * ## includeBaseStyles
     *
     * creates the base styles DOM element and adds it to the head
     *
     * @return _Void_
     */
    includeBaseStyles( css )
    {
        let self        = this;
        let context     = this.context;
        let formatCaps  = context.format.toUpperCase();
        let head        = document.head;

        function _addBaseStyle( css, _class, _format )
        {
            let el          = self.buildStyleTag( css );
            el.className    = _class;

            context.refs[ `${_format}Style` ] = el;

            let baseStyle = head.querySelector( `.${_class}` );

            if ( !baseStyle )
            {
                head.appendChild( el );
            }

            return el;
        }

        _addBaseStyle( css || baseStyles, classes.BASE_STYLES, 'base' );
        _addBaseStyle( specificStyles, classes[ `${formatCaps}_STYLES` ], context.format );


        if ( domainConfig.embed.customFontUrl )
        {
            this.includeFonts( head );
        }
    }


    /**
     * ## includeFonts
     *
     * includes the webfonts link element
     *
     * @return _DOMElement_ link element
     */
    includeFonts()
    {
        let el      = document.createElement( `link` );
        el.type     = `text/css`;
        el.rel      = `stylesheet`;
        let fontUrl = domainConfig.embed.customFontUrl
        el.href     = fontUrl.indexOf( '//' ) !== -1 ? fontUrl : `//${fontUrl}`;

        document.head.appendChild( el );

        return el;
    }


    /**
     * ## setDomain
     *
     * takes pieces of the domainConfig and builds the domain
     *
     * @return _String_ domain address
     */
    setDomain()
    {
        let embed   = domainConfig.embed;
        let context = this.context;

        if ( context.domain )
        {
            return context.domain;
        }
        else if ( context.linkDomain )
        {
            return context.domain = context.linkDomain;
        }
        else if ( embed )
        {
            return context.domain = `${embed.magazineUrl}/${embed.rootPath}`;
        }
        else
        {
            throw `Styla Widget error: No domain defined or bad domain config`;
        }
    }
};


export default Build;
