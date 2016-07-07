
/**
 * Styla bite-sized widget
 *
 * lite embeddable widget for non-styla pages
 *
 * @author "Mouse Braun <mouse@styla.com>"
 * @author "Elias Liedholm <elias@styla.com>"
 */

import version  from '/version';
import classes  from '/classes';
import Build    from '/build';

import { http } from 'microbejs/dist/microbe.http.min';

let format  = `styla-widget-format-goes-here`;
format      = format[0].toUpperCase() + format.slice( 1 );


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
        target      = this.checkTarget( target, this.minWidth );

        let refs    = this.refs;
        let styles  = refs.styles;
        let head    = document.head;

        let baseStyle = head.querySelector( `.${classes.BASE_STYLES}` );

        if ( baseStyle )
        {
            head.removeChild( baseStyle );
        }

        target.appendChild( refs.wrapper );

        styles.forEach( el =>
        {
            head.appendChild( el );
        } );

        return this;
    }


    /**
     * ## checkTarget
     *
     * makes sure the target is a DOMelement and wide enough
     *
     * @param {String or DOMElement} target attach point for the widget
     */
    checkTarget( target, minWidth )
    {
        if ( typeof target === `string` )
        {
            target = document.querySelector( target );

            if ( target )
            {
                return target;
            }
        }

        if ( typeof target === `undefined` || target === null )
        {
            console.error( `Styla Widget error: Cant find target element in DOM. Widget will render directly in body` );
            return document.body;
        }
        else if ( target.offsetWidth < minWidth )
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
                    domain      = false,
                    iframe      = false,
                    ignore      = false,
                    limit       = 5,
                    linkDomain  = false,
                    minWidth    = 250,
                    newTab      = false,
                    offset      = 0,
                    imageSize   = 400,
                    storiesApi  = false,
                    slug,
                    tag         = false,
                    target      = document.body,
                    title       = false
                    } = {} )
    {
        target = this.checkTarget( target, minWidth );

        if ( !slug )
        {
            throw `Styla Widget error: No slug defined, cannot render widget`;
        }

        this.format     = format;
        this.refs       = {};
        this.api        = api;
        this.domain     = domain;
        this.linkDomain = linkDomain;
        this.iframe     = iframe;
        this.ignore     = ignore;

        this.limit      = limit = ignore ? limit + 1 : limit;
        this.minWidth   = minWidth;
        this.newTab     = newTab;
        this.offset     = offset;
        this.imageSize  = imageSize;
        this.slug       = slug;
        this.storiesApi = storiesApi;
        this.tag        = tag;
        this.target     = target;
        this.title      = title;

        let url = tag ? `${api}/api/feeds/tags/${tag}?offset=${offset}&limit=${limit}&domain=${slug}` :
                        `${api}/api/feeds/all?domain=${slug}&offset=${offset}&limit=${limit}`;

        this.url        = url;

        this.http.get( storiesApi || url ).then( stories =>
        {
            let build = new Build( this, stories );
        } );


        Object.defineProperty( this, 'version', { value : version } );
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
        let refs    = this.refs;
        let styles  = refs.styles;
        let wrapper = refs.wrapper;
        let head    = document.head;

        wrapper.parentNode.removeChild( wrapper );

        styles.forEach( el =>
        {
            head.removeChild( el );
        } );

        return this;
    }
};

StylaWidget.prototype.http = http;

window[ `StylaWidget_${format}` ] = StylaWidget;

Object.defineProperty( StylaWidget, 'version', { value : version } );

export default StylaWidget;

