
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
     * ## attach
     *
     * adds the previously configured widget to the currently 
     * defined target or a new selector / el
     *
     * @return _Void_
     */
    attach( target = this.target )
    {
        target      = this.checkTarget( target );

        let els     = this.els;
        let head    = document.head;

        head.appendChild( els.baseStyle );
        head.appendChild( els.themeStyle );
        target.appendChild( els.wrapper );

        return this;
    }


    checkTarget( target )
    {
        if ( typeof target === `string` )
        {
            return document.querySelector( target );
        }

        if ( typeof target === `undefined` || target === null )
        {
            console.error( `Styla Widget error: Cant find target element in DOM. Widget will render directly in body` );
            return document.body;
        }
        else if ( target.offsetWidth < 250 )
        {
            throw `Styla Widget error: Target element too small to render widget ¯\\_(ツ)_/¯`;
        }

        return target;
    }


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
                    api         = 'https://live.styla.com',
                    iframe      = false,
                    ignore      = false,
                    limit       = 5,
                    linkDomain  = false,
                    newTab      = false,
                    offset      = 0,
                    size        = 400,
                    storiesApi  = false,
                    slug        = false,
                    tag         = false,
                    target      = document.body,
                    title       = false
                    } = {} )
    {
        target = this.checkTarget( target );

        if ( !slug )
        {
            throw `Styla Widget error: No slug defined, cannot render widget`;
        }
        
        this.els        = {};
        this.api        = api;
        this.linkDomain = linkDomain;
        this.iframe     = iframe;
        this.ignore     = ignore;

        let ignoreBonus = ignore ? 1 : 0; // adds an extra story if one is set to be ignored.  

        this.limit      = limit;
        this.newTab     = newTab;
        this.offset     = offset;
        this.size       = size;
        this.slug       = slug;
        this.storiesApi = storiesApi;
        this.tag        = tag;
        this.target     = target;
        this.title      = title;


        let url = tag ? `${api}/api/feeds/tags/${tag}?offset=${offset}&limit=${limit + ignoreBonus}&domain=${slug}` :
                        `${api}/api/feeds/user/${slug}?domain=${slug}&offset=${offset}&limit=${limit + ignoreBonus}`;

        http.get( storiesApi || url ).then( build.getDomainConfig.bind( this ) );

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
        let els = this.els;

        Object.keys( els ).forEach( function( key )
        {
            let el      = els[ key ];
            let parent  = el.parentNode;

            if ( parent )
            {
                parent.removeChild( el );
            }
        } );

        return this;
    }
};

window.StylaWidget = StylaWidget;

let alsoOnLoad = typeof window.onload === 'function' ? window.onload : function(){};

window.onload = function( e )
{
    if ( window.stylaWidget )
    {
        window.stylaWidget = new StylaWidget( window.stylaWidget );
    }
    
    alsoOnLoad( e );
};

export default StylaWidget;

