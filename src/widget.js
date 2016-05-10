
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

const domainConfigAPI   = 'https://www.amazine.com/api/config/'

class StylaWidget
{
    /**
     * ## constructor
     *
     * grabs the feed from the api and starts everything
     *
     * @param {String} domain target domain to grab products from
     *
     * @return {Object} this
     */
    constructor( { slug = '', tag = false, limit = 5, offset = 0 } )
    {
        this.slug       = slug;
        this.tag        = tag;
        this.domainConfigAPI = domainConfigAPI;
        this.version    = version;

        let url         = tag ? `https://www.amazine.com/api/feeds/userTag/${slug}/tag/${tag}?offset=${offset}&limit=${limit}&domain=${slug}` :
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
     * @return {DOMElement} container element
     */
    buildStories = stories =>
    {
        stories             = JSON.parse( stories );
        let container   = this.container = this.create( 'DIV', classes.CONTAINER );

        let _buildStories = domainConfig =>
        {
            this.domainConfig = domainConfig = JSON.parse( domainConfig );
            let domainConfigEmbed = domainConfig.embed;
            this.domain     = domainConfigEmbed.magazineUrl + '/' + domainConfigEmbed.rootPath;
            let styling     = this.buildStyles( domainConfig );

            /* Include webfonts */
            if ( domainConfig.embed.customFontUrl ){
                let fonts   = this.includeFonts( domainConfig )
                document.head.appendChild( fonts )
            };

            let images      = {};
            let resImages   = stories.images;

            if ( resImages )
            {
                resImages.forEach( function( _i ){ images[ _i.id ] = _i; })

                this.images = images;
                let _els    = stories.stories.map( this.buildStory );

                document.head.appendChild( styling );
                document.body.appendChild( container );
            }
        };

        http.get( this.domainConfigAPI + this.slug ).then( _buildStories ).catch( function(e){console.log(e)} );

        return container;
    };


    /**
     * ## buildStory
     *
     * builds each story off the reatrieved json
     *
     * @param {Object} json image data
     *
     * @return {DOMElement} outer story element
     */
    buildStory = ( { title, description, images, externalPermalink } ) =>
    {
        let create              = this.create;
        let story               = create( 'div', classes.STORY );
        let storyLink           = create( 'a', classes.STORY_LINK );
        let imageWrapper        = create( 'div', classes.IMAGE_WRAPPER );
        let image               = create( 'img', classes.IMAGE );
        let textWrapper         = create( 'div', classes.TEXT_WRAPPER );
        let headlineWrapper     = create( 'div', classes.HEADLINE_WRAPPER );
        let headline            = create( 'h1', classes.HEADLINE );
        let paragraph           = create( 'div', classes.PARAGRAPH );

        let id                  = images[0].id;
        let imgObj              = this.images[ id ];

        storyLink.href          = this.domain + 'story/' + externalPermalink + '/';
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
        this.container.appendChild( story );

        return story;
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
        _el.className   = _class;

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
     * @return {String or Boolean} text content or false
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
        else
        {
            return text.content;
        }
    };


    /**
     * ## getImageUrl
     *
     * builds the image url
     *
     * @param {String} filename from the image data object
     * @param {Number or String} size width to grab from the server
     *
     * @return {String} file name
     */
    getImageUrl( filename, size = 400 )
    {
        return `//img.styla.com/resizer/sfh_${size}x0/_${filename}`;
    };


    /**
    * ## buildStyles
    *
    * builds the styles
    * @param {Object} domain configuration of magazine
    *
    * @return {Object} style element
    *
    */

    buildStyles( domainConfig )
    {
        let theme = domainConfig.theme;
        let css =
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
            `;

        let el = document.createElement('style');
        el.type = 'text/css';
        el.id = `${classes.CONTAINER}__styling`

        let t = document.createTextNode(css)
        el.appendChild(t)

        return el
    };

    /**
    * ## includeFonts
    *
    * includes webfonts
    * @param {Object} domain configuration of magazine
    *
    * @return {Object} link element
    *
    */

    includeFonts ( domainConfig )
    {
        let el = document.createElement('link')
        el.type = 'text/css'
        el.rel = 'stylesheet'
        el.href = domainConfig.embed.customFontUrl

        return el
    };

}

if (!window.config)
{
    window.config = {};
}
let widget = new StylaWidget( window.config );
export default StylaWidget;
