// 'https://www.amazine.com/api/feeds/user/braunhamburg?offsetTimeCreated=1462191904587&offset=0&limit=5&domain=braunhamburg&_=1462191904020'

import version  from './version.js';
import classes  from './classes.js';
import { http } from 'microbejs/dist/microbe.http.min';

class StylaWidget
{
    /**
     * ## constructor
     *
     * grabs the feed from the api and starts everything
     */
    constructor( domain )
    {
        this.version    = version;

        let url = `https://www.amazine.com/api/feeds/user/${domain}?domain=${domain}&offset=0&limit=5`;

        http.get( url ).then( this.buildStories );

        return this;
    }


    buildStories = res =>
    {
        res             = JSON.parse( res );
        let container   = this.container = this.create( 'DIV', classes.CONTAINER );

        let images      = {};
        let resImages   = res.images;

        if ( resImages )
        {
            resImages.forEach( function( _i ){ images[ _i.id ] = _i; })

            this.images         = images;
            let _els            = res.stories.map( this.buildStory );

            document.body.appendChild( container );
        }
    }


    /**
     * ## buildStory
     *
     * builds each story off the reatrieved json
     *
     * @param {Object} json image data
     *
     * @return {DOMElement} outer story element
     */
    buildStory = ( { title, description, images } ) =>
    {
        let create  = this.create;
        let story   = create( 'div', classes.STORY );
        let image   = create( 'img', classes.IMAGE );

        let id      = images[0].id;
        image.src   = this.getImageUrl( this.images[ id ].fileName, 200 );
        image.alt   = title;
        image.title = title;
        story.appendChild( image );

        let wrapper  = create( 'div', classes.HEADLINE_WRAPPER );

        let headline = create( 'H1', classes.HEADLINE );
        console.log( title );
        headline.textContent = title;
        wrapper.appendChild( headline );

        story.appendChild( wrapper );

        let body            = create( 'DIV', classes.STORY_BODY );
        console.log( description );
        body.textContent    = description;
        story.appendChild( body );
        this.container.appendChild( story );

        return story;
    }


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
    }


    // http://img.styla.com/resizer/sfh_250x0/herno-steppweste-hellbraun-the-one_83061_86820.jpeg
    getImageUrl( filename, size = 200 )
    {
        let url = `//img.styla.com/resizer/sfh_${size}x0/`;

        return url + `_${filename}`;
    }
}

export default StylaWidget;
