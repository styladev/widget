
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
    constructor( {
                    slug    = ``,
                    tag     = false,
                    limit   = 5,
                    offset  = 0,
                    target  = document.body,
                    newTab  = false,
                    iframe  = false,
                    size    = 400,
                    title   = false
                    } )
    {
        if ( typeof target === `string` )
        {
            target = document.querySelector( target );
        }

        if ( typeof target === `undefined` || target === null )
        {
            console.error( `Styla Widget error: Cant find target element in DOM. Widget will render directly in body` );
            target = document.body;
        }
        else if ( target.offsetWidth < 250 )
        {
            throw `Styla Widget error: Target element too small to render widget ¯\\_(ツ)_/¯`;
        }
        else if ( !slug )
        {
            throw `Styla Widget error: No slug defined`;
        }

        this.iframe             = iframe;
        this.newTab             = newTab;
        this.size               = size;
        this.slug               = slug;
        this.tag                = tag;
        this.target             = target;
        this.title              = title;
        this.version            = version;

        let url = tag ? `https://live.styla.com/api/feeds/tags/${tag}?offset=${offset}&limit=${limit}&domain=${slug}` :
                        `https://live.styla.com/api/feeds/user/${slug}?domain=${slug}&offset=${offset}&limit=${limit}`;

        http.get( url ).then( build.getDomainConfig.bind( this ) );

        return this;
    }


    /**
     * ## destroy
     *
     * removes the styla widget from the DOM
     *
     * @return _Void_
     */
    destroy()
    {
        let wrapper = this.wrapper;
        wrapper.parentNode.removeChild( wrapper );
        return wrapper;
    }
};

window.stylaWidget = window.stylaWidget || {};

let alsoOnLoad = typeof window.onload === 'function' ? window.onload : function(){};

window.onload = function( e )
{
    window.stylaWidget = new StylaWidget( window.stylaWidget );
    alsoOnLoad( e );
};
