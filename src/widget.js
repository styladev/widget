
/**
 * Styla bite-sized widget
 *
 * lite embeddable widget for non-styla pages
 *
 * @author "Mouse Braun <mouse@styla.com>"
 * @author "Elias Liedholm <elias@styla.com>"
 */
import version  from './version.js';
import classes  from './classes.js';
import { http } from 'microbejs/dist/microbe.http.min';

const domainConfigAPI   = 'https://www.amazine.com/api/config/';
const _reportError      = function( e ){ console.log( 'err', e ) };

/*
    exchanged for css in the gulp build
 */
const baseStyles        = 'styla-widget-css-goes-here';
const wrapperID         = 'styla-widget';

class StylaWidget
{
    /**
     * ## constructor
     *
     * grabs the feed from the api and starts everything
     *
     * @param {String} domain target domain to grab products from
     *
     * @return _Object_ this
     */
    constructor( { slug = '', tag = false, limit = 5, offset = 0, target = document.body } )
    {
        if ( typeof target === 'string' )
        {
            target = document.querySelector( target );
        }
        this.target             = target;

        this.http               = http;
        this.classes            = classes;
        this.slug               = slug;
        this.tag                = tag;
        this.domainConfigAPI    = domainConfigAPI;
        this.version            = version;

        let url  = tag ? `https://www.amazine.com/api/feeds/userTag/${slug}/tag/${tag}?offset=${offset}&limit=${limit}&domain=${slug}` :
                        `https://www.amazine.com/api/feeds/user/${slug}?domain=${slug}&offset=${offset}&limit=${limit}`;

        http.get( url ).then( this.buildStories );

        return this;
    };


    /**
     * ## buildStories
     *
     * after recieving the story data, this parses and build the individual
     * stories
     *
     * @param {String} res JSON response from the product api
     *
     * @return _DOMElement_ container element
     */
    buildStories = stories =>
    {
        stories         = JSON.parse( stories );
        let container   = this.container    = this.create( 'DIV', classes.CONTAINER );
        let wrapper     = this.wrapper      = this.create( 'DIV', classes.WRAPPER );
        wrapper.id      = wrapperID;

        let _buildStories = domainConfig =>
        {
            this.domainConfig       = domainConfig = JSON.parse( domainConfig );
            let domainConfigEmbed   = domainConfig.embed;
            this.domain             = domainConfigEmbed.magazineUrl + '/' +
                                        domainConfigEmbed.rootPath;
            let styling             = this.buildStyles( domainConfig );

            let head                = document.head;

            this.includeBaseStyles( head );

            if ( domainConfig.embed.customFontUrl )
            {
                this.includeFonts( domainConfig, head );
            };

            let images      = {};
            let resImages   = stories.images;

            if ( resImages )
            {
                resImages.forEach( function( _i ){ images[ _i.id ] = _i; });

                this.images = images;
                let _els    = stories.stories.map( this.buildStory );

                document.head.appendChild( styling );
                this.target.appendChild( wrapper );
            }
        };

        http.get( this.domainConfigAPI + this.slug ).then( _buildStories ).catch( _reportError );

        return container;
    };


    /**
     * ## buildStory
     *
     * builds each story off the retrieved json
     *
     * @param {Object} json image data
     *
     * @return _DOMElement_ outer story element
     */
    buildStory = ( { title, description, images, externalPermalink } ) =>
    {
        let create              = this.create;
        let story               = create( 'div',    classes.STORY );
        let storyLink           = create( 'a',      classes.STORY_LINK );
        let imageWrapper        = create( 'div',    classes.IMAGE_WRAPPER );
        let image               = create( 'img',    classes.IMAGE );
        let textWrapper         = create( 'div',    classes.TEXT_WRAPPER );
        let headlineWrapper     = create( 'div',    classes.HEADLINE_WRAPPER );
        let headline            = create( 'h1',     classes.HEADLINE );
        let paragraph           = create( 'div',    classes.PARAGRAPH );

        let id                  = images[0].id;
        let imgObj              = this.images[ id ];

        storyLink.href          = '//' + this.domain + 'story/' + externalPermalink + '/';
        image.src               = this.getImageUrl( imgObj.fileName, 400 );
        image.alt               = imgObj.caption || title;
        image.title             = title;

        headline.textContent    = title;

        story.appendChild( storyLink );
        imageWrapper.appendChild( image )
        storyLink.appendChild( imageWrapper );
        storyLink.appendChild( textWrapper );

        headlineWrapper.appendChild( headline );
        textWrapper.appendChild( headlineWrapper );

        paragraph.innerHTML     = this.getDescription( JSON.parse( description ) );
        paragraph.innerHTML     = paragraph.textContent;
        textWrapper.appendChild( paragraph );

        let container = this.container;

        container.appendChild( story );
        this.wrapper.appendChild( container );

        return story;
    };


    /**
    * ## buildStyles
    *
    * builds the styles
    *
    * @param {Object} domain configuration of magazine
    *
    * @return _DOMElement_ style element
    */
    buildStyles( domainConfig )
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
                color:              ${theme.htc}
            }
            .${classes.PARAGRAPH}
            {
                font-family:        ${theme.sff};
                font-weight:        ${theme.sfw};
                color:              ${theme.stc}
            }
            .${classes.PARAGRAPH}:after
            {
                content:            '${theme.strm}';
                font-weight:        ${theme.strmw};
                text-decoration:    ${theme.strmd}
            }
            `;

        return this.buildStyleTag( css );
    };


    /**
    * ## buildStyleTag
    *
    * builds a style tag and appends it to the DOM
    *
    * @param {Object} domain configuration of magazine
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
    };


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
    create( _tag, _class )
    {
        let _el         = document.createElement( _tag.toUpperCase() );

        if ( _class )
        {
            _el.className   = _class;
        }

        return _el;
    };


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
    getDescription( _arr, i = 0 )
    {
        let text = _arr[ i ]

        if ( !text )
        {
            return false
        }
        else if ( text.type !== 'text' )
        {
            return this.getDescription( _arr, i + 1 );
        }

        return text.content;
    };


    /**
     * ## getImageUrl
     *
     * builds the image url
     *
     * @param {String} filename from the image data object
     * @param {Number or String} size width to grab from the server
     *
     * @return _String_ file name
     */
    getImageUrl( filename, size = 400 )
    {
        return `//img.styla.com/resizer/sfh_${size}x0/_${filename}?still`;
    };


    /**
     * ## includeBaseStyles
     *
     * includes the base styles.
     *
     * @return _DOMElement_ style tag
     */
    includeBaseStyles()
    {
        let el = this.buildStyleTag( baseStyles );
        el.className = classes.BASE_STYLES;
        document.head.appendChild( el );

        return el;
    };


    /**
     * ## includeFonts
     *
     * includes webfonts
     *
     * @param {Object} domain configuration of magazine
     *
     * @return _DOMElement_ link element
     */
    includeFonts( domainConfig )
    {
        let el  = document.createElement( 'link' );
        el.type = 'text/css';
        el.rel  = 'stylesheet';
        el.href = domainConfig.embed.customFontUrl;

        document.head.appendChild( el );

        return el;
    };
};

if ( ! window.stylaWidget )
{
    window.stylaWidget = {};
}

window.stylaWidget.instance = new StylaWidget( window.stylaWidget );
