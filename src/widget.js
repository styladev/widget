
/**
 *
 */
import version  from './version.js';
import classes  from './classes.js';
import { http } from 'microbejs/dist/microbe.http.min';

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
    constructor( { slug, domain } )
    {
        this.slug       = slug;
        this.domain     = domain;
        this.version    = version;

        let url         = `https://www.amazine.com/api/feeds/user/${slug}?domain=${slug}&offset=0&limit=5`;

        http.get( url ).then( this.buildStories );

        return this;
    };


    /**
     * buildStories
     *
     * after recieving the story data, this parses and build the individual
     * stories
     *
     * @param {String} res JSON response from the product api
     *
     * @return {DOMElement} container element
     */
    buildStories = res =>
    {
        res             = JSON.parse( res );
        let container   = this.container = this.create( 'DIV', classes.CONTAINER );

        let images      = {};
        let resImages   = res.images;

        if ( resImages )
        {
            resImages.forEach( function( _i ){ images[ _i.id ] = _i; })

            this.images = images;
            console.log( res.stories );
            let _els    = res.stories.map( this.buildStory );

            document.body.appendChild( container );
        }

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
        let create      = this.create;
        let story       = create( 'div', classes.STORY );
        let storyLink   = create( 'a', classes.STORY_LINK );

        let image       = create( 'img', classes.IMAGE );
        let wrapper     = create( 'div', classes.HEADLINE_WRAPPER );
        let headline    = create( 'h1', classes.HEADLINE );
        let storyBody   = create( 'div', classes.STORY_BODY );

        let id          = images[0].id;
        let imgObj      = this.images[ id ];

        storyLink.href  = this.domain + 'story/' + externalPermalink + '/';
        image.src       = this.getImageUrl( imgObj.fileName, 200 );
        image.alt       = imgObj.caption || title;
        image.title     = title;

        headline.textContent = title;

        story.appendChild( storyLink );
        storyLink.appendChild( image );

        wrapper.appendChild( headline );
        storyLink.appendChild( wrapper );

        storyBody.innerHTML = this.getDescription( JSON.parse( description ) );
        storyLink.appendChild( storyBody );
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
    getImageUrl( filename, size = 200 )
    {
        let url = `//img.styla.com/resizer/sfh_${size}x0/`;

        return url + `_${filename}`;
    }
}

export default StylaWidget;
