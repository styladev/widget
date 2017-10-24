/* globals document, console, window */
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
import Build    from '/build.tmpl';

// needs to be imported like this for tests
import { http } from 'microbejs/dist/microbe.http.min';

let layout  = 'TMPL-VARIABLE-LAYOUT';
// TODO this logic should be moved to gulpfile
layout      = layout[ 0 ].toUpperCase() + layout.slice( 1 );


/**
 * StylaWidget base class
 */
class StylaWidget
{
    /**
     * ## attach
     *
     * adds the previously configured widget to the currently
     * defined target or a new selector / el
     *
     * @param {DOMElement} target mount target
     *
     * @return {Void} void
     */
    attach( target = this.target )
    {
        target      = this.checkTarget( target, this.minWidth );

        const refs    = this.refs;
        const styles  = refs.styles;
        const head    = document.head;

        const baseStyle = head.querySelector( `.${classes.BASE_STYLES}` );

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
     * @param {Mixed} target attach point for the widget _String or DOMElement_
     * @param {Number} minWidth minimum acceptable width to fit the widget
     *
     * @return {DOMElelemt} mount point
     */
    checkTarget( target, minWidth )
    {
        if ( typeof target === 'string' )
        {
            target = document.querySelector( target );

            if ( target )
            {
                return target;
            }
        }

        if ( typeof target === 'undefined' || target === null )
        {
            console.error( 'Styla Widget error: Cant find target element in DOM. Widget will render directly in body' ); // eslint-disable-line

            return document.body;
        }
        else if ( target.offsetWidth < minWidth )
        {
            throw 'Styla Widget error: Target element too small to render widget ¯\\_(ツ)_/¯'; // eslint-disable-line
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
     * @return {Object} this
     */
    constructor( {
        slug,
        api             = 'https://live.styla.com',
        domain          = false,
        iframe          = false,
        ignore          = false,
        limit           = 5,
        linkDomain      = false,
        minWidth        = 250,
        newTab          = false,
        offset          = 0,
        imageSize       = 400,
        storiesApi      = false,
        ignoreFonts     = false,
        tag             = false,
        category        = false,
        cta             = false,
        target          = document.body,
        urlParams       = true,
        imageApiDomain  = 'img.styla.com'
    } = {} )
    {
        target = this.checkTarget( target, minWidth );

        if ( !slug )
        {
            throw 'Styla Widget error: No slug defined, cannot render widget';
        }

        this.layout         = layout;
        this.refs           = {};
        this.api            = api;
        this.domain         = domain;
        this.linkDomain     = linkDomain;
        this.ignore         = ignore;
        this.iframe         = iframe;
        this.newTab         = newTab;

        this.limit          = limit = ignore ? limit + 1 : limit;
        this.minWidth       = minWidth;
        this.offset         = offset;
        this.imageSize      = imageSize;
        this.slug           = slug;
        this.storiesApi     = storiesApi;
        this.ignoreFonts    = ignoreFonts;
        this.tag            = tag;
        this.category       = category;
        this.cta            = cta;
        this.target         = target;
        this.urlParams      = urlParams;
        this.imageApiDomain = imageApiDomain;

        const fetchLimit    = limit + offset;

        if ( tag !== false && category !== false )
        {
            console.error( 'Styla Widget error: Both tag and category filter has been added to the configuration, but only one can be used, stories will be filtered only by tag.' ); // eslint-disable-line
        }

        let url;

        if ( tag != false )
        {
            url = `${api}/api/feeds/tags/${tag}?limit=${fetchLimit}&domain=${slug}`; // eslint-disable-line
        }
        else if ( category != false )
        {
            url = `${api}/api/feeds/boards/${category}/user/${slug}?domain=${slug}`; // eslint-disable-line
        }
        else
        {
            url = `${api}/api/feeds/all?domain=${slug}&limit=${fetchLimit}`; // eslint-disable-line
        }

        this.url = url;

        this.http.get( storiesApi || url ).then( res =>
        {
            res         = JSON.parse( res );
            res.stories = res.stories.slice( offset );

            /**
             * ## removeExtraStory
             *
             * recursive - checks if the array is over a limit, removes one,
             * then checks if more need to be removed
             *
             * @param {Array} arr array to check the length of
             * @param {Numbers} limit story count
             *
             * @return {Array} shortened array
             */
            function removeExtraStory( arr, limit )
            {
                const len = arr.length;

                if ( len <= limit )
                {
                    return arr;
                }

                arr.splice( len - 1, 1 );

                return removeExtraStory( arr, limit );
            }

            res.stories = removeExtraStory( res.stories, limit );

            new Build( this, res );
        } );


        Object.defineProperty( this, 'version', {
            value : version
        } );
    }


    /**
     * ## destroy
     *
     * removes the styla widget from the DOM
     *
     * @return {Void} void
     */
    destroy()
    {
        const refs    = this.refs;
        const styles  = refs.styles;
        const wrapper = refs.wrapper;
        const head    = document.head;

        wrapper.parentNode.removeChild( wrapper );

        styles.forEach( el =>
        {
            head.removeChild( el );
        } );

        return this;
    }
}

StylaWidget.prototype.http = http;

window[ `StylaWidget_${layout}` ] = StylaWidget;

Object.defineProperty( StylaWidget, 'version', {
    value : version
} );

export default StylaWidget;
