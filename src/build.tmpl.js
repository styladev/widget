/* globals console, document, window */
/**
 * ## build.js
 *
 * this contains methods to build the bite sized widget that do not need to be
 * outwardly facing
 */

import classes  from '/classes';

// needs to be imported like this for tests
import { http } from 'microbejs/dist/microbe.http.min';


/*
    exchanged for css in the gulp build
 */
const baseStyles        = `TMPL-VARIABLE-BASESTYLES`;     // eslint-disable-line
const specificStyles    = `TMPL-VARIABLE-SPECIFICSTYLES`; // eslint-disable-line

const wrapperID         = 'styla-widget';

/* istanbul ignore next */
const reportError      =  () =>
{
};


/**
 * StylaWidget build tools
 */
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
     * @return {DOMElement} headlineWrapper
     */
    buildHeadline( title )
    {
        const create              = this.create;
        const headlineWrapper     = create( 'div', classes.HEADLINE_WRAPPER );
        const headline            = create( 'span',  classes.HEADLINE );

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
     * @return {DOMElement} imageWrapper
     */
    buildImage( images, title )
    {
        const create                = this.create;
        const imageWrapper          = create( 'div', classes.IMAGE_WRAPPER );

        const imageSize             = this.context.imageSize;
        const id                    = images[ 0 ].id;
        const imgObj                = this.context.images[ id ];

        const url                   = this.getImageUrl( imgObj.fileName,
            imageSize );

        /* The image is rendered as a background image on the wrapper element
        since IE is lacking support for CSS object-fit. The actual image element
        must still be rendered in order for flexbox to take up the space it needs,
        but it is then hidden by CSS. */
        imageWrapper.style.cssText  = `background-image: url(${url})`;

        const image                 = create( 'img', classes.IMAGE );
        image.src                   = url;
        image.alt                   = imgObj.caption || title;
        image.title                 = title;

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
     @return {DOMElement} wrapper element
     */
    buildStories( domainConfig = '{}' )
    {
        const domainConfigParsed = this.domainConfig =
                                                    JSON.parse( domainConfig );

        if ( Object.keys( domainConfigParsed ).length === 0 )
        {
            throw 'Styla Widget error: Could not find magazine, please check if slug is configured correctly.'; // eslint-disable-line
        }

        const images      = {};
        const context     = this.context;
        const stories     = context.stories;
        const resImages   = stories.images;
        const refs        = context.refs;



        context.routesOle = domainConfigParsed.routes;
        context.routesNle = domainConfigParsed.embed.routes;

        context.pushstate = domainConfigParsed.embed.pushstateDefault === false ? '#' : '/';
        context.domain    = this.setDomain();

        refs.styles = this.includeBaseStyles();

        if ( resImages )
        {

            resImages.forEach( i => images[ i.id ] = i );
            context.images  = images;

            stories.stories.forEach( this.buildStory );
            const styling     = this.compileStyles();

            document.head.appendChild( styling );
            context.target.appendChild( context.refs.wrapper );

            return refs.wrapper;
        }

        return false;
    }


    /**
     * ## buildStory
     *
     * builds each story off the retrieved json.  skips a story if the id #
     * matches ignore.  no matter what it will always build the number of
     * stories set in the limit
     *
     * @param {Object} json story data
     * @param {Number} i iterator
     *
     * @return {DOMElement} outer story element
     */
    buildStory(
        { title, description, id, images, externalPermalink, boards:categories = [] },
        i = 0
    )
    {
        const context     = this.context;

        if ( context.ignore != false
            && i == context.limit - 1
            && this.ignored == 0 )
        {
            return false;
        }

        if ( `${context.ignore}` !== `${id}` &&
                    i < this.ignored + context.limit )
        {
            const create    = this.create;

            const story     = create( 'div',    classes.STORY );
            const storyLink = create( 'a',      classes.STORY_LINK );

            storyLink.href  = this.buildStoryLink( externalPermalink, categories );

            story.appendChild( storyLink );

            storyLink.appendChild( this.buildImage( images, title ) );
            storyLink.appendChild( this.buildStoryText( title, description ) );

            if ( context.cta )
            {
                const callToAction = create( 'div', classes.CALL_TO_ACTION );

                callToAction.innerHTML  =  context.cta ;

                storyLink.appendChild( callToAction );
            }

            const container   = context.refs.container;
            const wrapper     = context.refs.wrapper;

            container.appendChild( story );
            wrapper.appendChild( container );

            return story;
        }

        this.ignored++;

        return false;
    }


    /**
     * ## buildStoryLink
     *
     * builds unique link for each story
     *
     * @param {String} slug for story
     * @param {Array} categories A list of categories to which this slug belongs to
     *
     * @return {String} complete url
     */
    buildStoryLink( slug, categories = [] )
    {
        const context       = this.context;

        const layout        = encodeURIComponent( context.layout );
        const location      = encodeURIComponent( window.location.href );
        const parameters    = context.urlParams ?
            `?styla_ref=${location}&styla_wdgt_var=${layout}` : '';

        let path;
        if ( context.routesNle )
        {
            // must match `getStoryPathname()` functionality from
            // https://github.com/styladev/layoutEngine/blob/stage/app/utils/helperUtils.js#L150
            const primaryCategorySlug =
                ( categories[ 0 ] && categories[ 0 ].slug ) || 'no-category';

            path = context.routesNle.magazine ? context.routesNle.magazine.path : '';

            // beware, in the new route object there's a `/` at the beginning
            path = ( path + context.routesNle.story.path
                .replace( /:storySlug/, slug )
                .replace( /:categorySlug/, primaryCategorySlug ) )
                .substring( 1 );

        }
        if ( context.routesOle )
        {
            path = context.routesOle.story.replace( /%2\$s_%3\$s/, slug );
        }
        if ( context.routesOle && context.routesNle )
        {
            console.warn( 'Both old and new routes defined in config. Ignoring new route.' );
        }

        return `//${context.domain}${context.pushstate}${path}${parameters}`;
    }


    /**
     * ## buildStoryText
     *
     * builds the story text (including headline and content), combines them
     * and returns the outer wrapper
     *
     * @param {String} title story headline
     * @param {Object} description copy of the story to be inserted
     *
     * @return {DOMElement} style element
     */
    buildStoryText( title, description = '{}' )
    {
        const create                = this.create;
        const textWrapper           = create( 'div', classes.TEXT_WRAPPER );

        const headlineWrapper       = this.buildHeadline( title );
        textWrapper.appendChild( headlineWrapper );

        const paragraph             = create( 'div', classes.PARAGRAPH );
        description                 = this.getDescription( JSON.parse( description ) );

        paragraph.innerHTML         = description;

        /* Magic: strips HTML and truncates text from description */
        paragraph.innerHTML         = paragraph.textContent.slice( 0, 220 );

        textWrapper.appendChild( paragraph );

        const paragraphAfter        = create( 'div', classes.PARAGRAPH_AFTER );
        paragraphAfter.innerHTML    = '…';

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
     * @return {DOMElement} style element
     */
    buildStyleTag( css )
    {
        const el          = document.createElement( 'style' );
        el.type         = 'text/css';
        el.className    = classes.STYLES;

        const t   = document.createTextNode( css );
        el.appendChild( t );

        return el;
    }


    /**
     * ## compileStyles
     *
     * compiles the styles and returns them added to the style tag
     *
     * @return {DOMElement} style element
     */
    compileStyles()
    {
        const theme   = this.domainConfig.theme;
        let css     = '';
        const now     = this.now;
        const context = this.context;

        if ( theme )
        {
            css =
                `#styla-widget .styla-widget-${now} .${classes.HEADLINE}
                {
                    font-family:        ${theme.hff};
                    font-weight:        ${theme.hfw};
                    font-style:         ${theme.hfs};
                    text-decoration:    ${theme.htd};
                    letter-spacing:     ${theme.hls};
                    color:              ${theme.htc};
                }
                #styla-widget .styla-widget-${now} .${classes.PARAGRAPH},
                #styla-widget .styla-widget-${now} .${classes.PARAGRAPH_AFTER},
                #styla-widget .styla-widget-${now} .${classes.CALLTOACTION}
                {
                    font-family:        ${theme.sff};
                    font-weight:        ${theme.sfw};
                    color:              ${theme.stc};
                }
                #styla-widget .styla-widget-${now} .${classes.CALLTOACTION}
                {
                    color:              ${theme.ltc};
                }`;
        }

        const el        = this.buildStyleTag( css );
        el.className    = `${classes.THEME_STYLES}  styla-widget__${context.layout}`; // eslint-disable-line

        context.refs.themeStyle = el;

        return el;
    }


    /**
     * ## constructor
     *
     * builds build
     *
     * @param {Object} context context to be passed to this.context
     * @param {String} stories json string of the stories object
     *
     * @return {Class} instance of build class
     */
    constructor( context, stories )
    {
        this.context        = context;
        this.now            = Date.now();
        this.ignored        = 0;

        this.buildStories   = this.buildStories.bind( this );
        this.buildStory     = this.buildStory.bind( this );
        this.buildStoryLink = this.buildStoryLink.bind( this );

        if ( !context.refs.wrapper )
        {
            context.stories = stories;
            const layout    = context.layout.toLowerCase();

            context.refs.container = this.create( 'DIV',
                `${classes.CONTAINER}  styla-widget-${this.now}` );
            const wrapper   = context.refs.wrapper   = this.create( 'DIV',
                `${classes.WRAPPER}  ${layout}` );
            wrapper.id      = wrapperID;

            const domainConfigAPI = `${context.api}/api/config/${context.slug}`;

            this.http.get( domainConfigAPI )
                .then( this.buildStories )
                .catch( reportError );
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
     * @return {DOMElement} newly created element
     */
    create( tag, clss )
    {
        const el = document.createElement( tag.toUpperCase() );

        if ( clss )
        {
            el.className = clss;
        }

        return el;
    }


    /**
     * ## getDescription
     *
     * gets description from the content and returns that. Either returns full text or only from
     * the first block
     *
     * @param {Array} textBlocks array filled w/ content
     * @param {Boolean} useFullText when false, use only the first text content block
     * @param {Number} i recursive index
     *
     * @return {String} text content. Might be empty if no text.
     */
    getDescription( textBlocks, useFullText = true, i = 0 )
    {
        const text = textBlocks[ i ];

        if ( !text )
        {
            return '';
        }

        // TODO this is dogey! A getter must not have side effects like
        // manipulating the dom. At least remove it after use!
        const el          = this.create( 'div' );
        el.innerHTML      = text.content;
        const actualText  = el.textContent;

        const isTextValid = text.type == 'text' && actualText !== '';

        if ( isTextValid )
        {
            if ( useFullText )
            {
                return `${actualText} ${this.getDescription( textBlocks, useFullText, i + 1 )}`;
            }

            return actualText;
        }

        // !isTextValid
        return this.getDescription( textBlocks, useFullText, i + 1 );
    }


    /**
     * ## getImageUrl
     *
     * uses the filename and size to create the full image url
     *
     * @param {String} filename from the image data object
     * @param {Mixed} imageSize width to grab from the server _Number or String_
     *
     * @return {String} file name
     */
    getImageUrl( filename, imageSize = 400 )
    {
        const imageApiDomain = this.context.imageApiDomain;

        return `//${imageApiDomain}/resizer/sfh_${imageSize}x0/_${filename}?still`;
    }


    /**
     * ## includeBaseStyles
     *
     * creates the base styles DOM element and adds it to the head
     *
     * @param {String} css style in css for tag insertion
     *
     * @return {Void} void
     */
    includeBaseStyles( css )
    {
        let el;
        const self        = this;
        const context     = this.context;
        const layoutCaps  = context.layout.toUpperCase();
        const head        = document.head;

        /**
         * ## addBaseStyle
         *
         * @param {String} css style in css for tag insertion
         * @param {String} clss class to add to the baseStyle tag
         * @param {String} layout layout of the widget
         *
         * @return {DOMElement} style tag
         */
        function addBaseStyle( css, clss, layout )
        {
            const baseStyle = head.querySelector( `.${clss}` );

            if ( !baseStyle )
            {
                el              = self.buildStyleTag( css );
                el.className    = `${clss}  ${classes.STYLES}`;

                context.refs[ `${layout}Style` ] = el;

                head.appendChild( el );
            }

            return el;
        }


        let arr = new Array( 2 );

        arr[ 0 ] = addBaseStyle( css || baseStyles,
            `${classes.BASE_STYLES}`,
            'base'
        );
        arr[ 1 ] = addBaseStyle( specificStyles,
            classes[ `${layoutCaps}_STYLES` ],
            context.layout
        );


        if ( this.domainConfig.embed.customFontUrl )
        {
            arr.push( this.includeFonts() );
        }

        arr = arr.filter( el => el );

        return arr;
    }


    /**
     * ## includeFonts
     *
     * includes the webfonts link element
     *
     * @return {DOMElement} link element
     */
    includeFonts()
    {
        const ignoreFonts   = this.context.ignoreFonts;
        if ( !ignoreFonts )
        {
            const el            = document.createElement( 'link' );
            el.className        = classes.FONT_LINK;
            el.type             = 'text/css';
            el.rel              = 'stylesheet';
            const fontUrl       = this.domainConfig.embed.customFontUrl;
            el.href             = fontUrl.indexOf( '//' ) !== -1 ?
                fontUrl :
                `//${fontUrl}`;

            document.head.appendChild( el );

            return el;
        }

    }


    /**
     * ## setDomain
     *
     * takes pieces of the domainConfig and builds the complete domain
     * including root path
     *
     * @return {String} domain address
     */
    setDomain()
    {
        const embed   = this.domainConfig.embed;
        const context = this.context;

        let domain;

        if ( !context.domain )
        {
            if ( context.linkDomain )
            {
                domain = context.linkDomain;
            }
            else if ( embed )
            {
                let rootPath = embed.rootPath;

                if ( rootPath[ 0 ] !== '/' )
                {
                    rootPath = `/${rootPath}`;
                }

                if ( rootPath.length > 1 && rootPath[ rootPath.length - 1 ] == '/' )
                {
                    rootPath = rootPath.substring( 0, rootPath.length - 1 );
                }

                if ( rootPath === '/' )
                {
                    rootPath = '';
                }

                domain = `${embed.magazineUrl}${rootPath}`;
            }
            else
            {
                throw 'Styla Widget error: No domain defined or bad domain config.'; // eslint-disable-line
            }

            domain = domain.replace( /^(http(s)?:)?\/\//, '' );

            return context.domain = domain;
        }

        return context.domain;
    }
}


Build.prototype.http = http;

export default Build;
