
/**
 * Styla bite-sized widget
 *
 * lite embeddable widget for non-styla pages
 *
 * @author "Mouse Braun <mouse@styla.com>"
 * @author "Elias Liedholm <elias@styla.com>"
 */
import version  from './version.js';
import build    from './build.js';

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
     * @return _Object_ this
     */
    constructor( { slug = ``, tag = false, limit = 5, offset = 0, target = document.body } )
    {
        if ( typeof target === `string` )
        {
            target = document.querySelector( target );
            if ( typeof target === `undefined` || target === null )
            {
                console.log( `%c Styla Widget error: Cant find target element in DOM. Widget will render directly in body`, `color: red` );
                target = document.body
            }
            else if ( target.offsetWidth < 250 )
            {
                throw `Styla Widget error: Target element too small to render widget ¯\\_(ツ)_/¯`;
            }
        }

        this.target             = target;
        this.slug               = slug;
        this.tag                = tag;
        this.version            = version;

        let url  = tag ? `https://www.amazine.com/api/feeds/userTag/${slug}/tag/${tag}?offset=${offset}&limit=${limit}&domain=${slug}` :
                        `https://www.amazine.com/api/feeds/user/${slug}?domain=${slug}&offset=${offset}&limit=${limit}`;

        http.get( url ).then( build.getDomainConfig.bind( this ) );

        return this;
    }
};


window.stylaWidget = new StylaWidget( window.stylaWidget );
