// 'https://www.amazine.com/api/feeds/user/braunhamburg?offsetTimeCreated=1462191904587&offset=0&limit=5&domain=braunhamburg&_=1462191904020'

import version  from './version.js';
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
        try
        {
            res         = JSON.parse( res );

            let container   = this.container = document.createElement( 'DIV' );

            container.className = 'container';

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
        catch(e)
        {
            console.log( e );
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
        let create = function( tag, className )
        {
            let _el         = document.createElement( tag.toUpperCase() );
            _el.className   = className;

            return _el;
        }

        let story = create( 'div', 'story' );

        let image   = create( 'img', 'image' );

        let id      = images[0].id;
        image.src   = this.getImageUrl( this.images[ id ].fileName, 200 );
        image.alt   = title;
        image.title = title;
        story.appendChild( image );

        let wrapper  = create( 'div', 'headlineWrap' );

        let headline = create( 'H1', 'headline' );
        headline.textContent= title;
        wrapper.appendChild( headline );

        story.appendChild( wrapper );

        let body            = document.createElement( 'DIV' );
        body.className      = 'bodyText';
        body.textContent    = description;
        story.appendChild( body );
        this.container.appendChild( story );

        return story;
    }


    // http://img.styla.com/resizer/sfh_250x0/herno-steppweste-hellbraun-the-one_83061_86820.jpeg
    getImageUrl( filename, size = 200 )
    {
        let url = `//img.styla.com/resizer/sfh_${size}x0/`;

        return url + `_${filename}`;
    }
}

export default StylaWidget;
