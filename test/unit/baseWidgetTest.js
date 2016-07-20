/*
 * no idea...   nothing working on this side.  maybe a jsdom issue?
 *
 * works in the browser
 *
 * https://github.com/tmpvar/jsdom/issues/1517
 */


import Build        from '/build';
import BaseWidget   from '/baseWidget'
import version      from '/version';
import classes      from '/classes';

import assert       from 'assert';
import sinon        from 'sinon';


let stylaWidget = new BaseWidget( { target: document.body,
                                        slug: 'braunhamburg',
                                        domain: 'test'
                                    } );

let refs = stylaWidget.refs;


/**
 * ## destroy
 *
 * removes the styla widget from the DOM
 *
 * @return _Void_
 */
describe( 'destroy', () =>
{
    it( 'should remove the widget from the DOM', () =>
    {
        stylaWidget.destroy();

        let parent  = refs.wrapper.parentNode;
        assert.equal( parent, null );

        refs.styles.forEach( el =>
        {
            let parent  = el.parentNode;
            assert.equal( parent, null );
        } );
    } );
} );


/**
 * ## attach
 *
 * adds the styla widget to the DOM
 *
 * @return _Void_
 */
describe( 'attach', () =>
{
    it( 'should add the widget to it\'s previous target', () =>
    {
        stylaWidget.attach();

        let parent  = refs.wrapper.parentNode;
        assert.equal( parent.nodeType, 1 );

        refs.styles.forEach( el =>
        {
            let parent  = el.parentNode;
            assert.equal( parent.nodeType, 1 );
        } );
    } );


    it( 'should add the widget to a specified target', () =>
    {
        stylaWidget.attach( 'div' );

        let parent  = refs.wrapper.parentNode;
        assert.equal( parent.nodeType, 1 );

        refs.styles.forEach( el =>
        {
            let parent  = el.parentNode;
            assert.equal( parent.nodeType, 1 );
        } );
    } );
} );


/**
 * ## checkTarget
 *
 * makes sure the target is a DOMelement and wide enough
 *
 * @return _Void_
 */
describe( 'checkTarget', () =>
{
    it( 'should change a string into a DOM element', () =>
    {
        let target = stylaWidget.checkTarget( 'body' );
        assert.deepEqual( document.body, target );
    } );


    it( 'should fallback to the body when no other element is supplied', () =>
    {
        sinon.stub( console, 'error', () => {} );

        let target = stylaWidget.checkTarget( 'moon' );
        assert.deepEqual( document.body, target );

        console.error.restore();
    } );


    it( 'should fail if the element width is under the min width', () =>
    {
        document.body.offsetWidth = 149;
        assert.throws( function(){ stylaWidget.checkTarget( document.body, 250 ); }, `Styla Widget error: Target element too small to render widget ¯\\_(ツ)_/¯` );
        document.body.offsetWidth = 260;
    } );
} );


/**
 * ## constructor
 *
 * grabs the feed from the api and starts everything
 *
 * @param {String} domain target domain to grab products from
 *
 * @return _Object_ this
 */
describe( 'constructor', () =>
{
    it( 'should not build without a slug', () =>
    {
        assert.throws( function(){ new BaseWidget() }, `Styla Widget error: No slug defined, cannot render widget` );
    } );


    it( 'should adds one to the limit if there is a story to ignore', () =>
    {
        let stylaWidget = new BaseWidget( { slug: 'braunhamburg', ignore: 'khfvk' } );
        assert.equal( stylaWidget.limit, 6 );
    } );


    it( 'should be able to build using the tag feed', () =>
    {
        let stylaWidget = new BaseWidget( { slug: 'braunhamburg', tag: 'moon' } );
        assert.equal( stylaWidget.url, 'https://live.styla.com/api/feeds/tags/moon?offset=0&limit=5&domain=braunhamburg' );
    } );

    it( 'should be able to build using the category feed', () =>
    {
        let stylaWidget = new BaseWidget( { slug: 'braunhamburg', category: '2262' } );
        assert.equal( stylaWidget.url, 'https://live.styla.com/api/feeds/boards/2262/user/braunhamburg?domain=braunhamburg&offset=0' );
    } );

    it( 'should set the correct defaults', () =>
    {
        let stylaWidget = new BaseWidget( { slug: 'braunhamburg' } );

        assert.equal( stylaWidget.api, 'https://live.styla.com' );
        assert.equal( stylaWidget.iframe, false );
        assert.equal( stylaWidget.ignore, false );
        assert.equal( stylaWidget.limit, 5 );
        assert.equal( stylaWidget.linkDomain, false );
        assert.equal( stylaWidget.minWidth, 250 );
        assert.equal( stylaWidget.newTab, false );
        assert.equal( stylaWidget.offset, 0 );
        assert.equal( stylaWidget.imageSize, 400 );
        assert.equal( stylaWidget.storiesApi, false );
        assert.equal( stylaWidget.tag, false );
        assert.equal( stylaWidget.category, false );
        assert.equal( stylaWidget.target, document.body );
        assert.equal( stylaWidget.title, false );
    } );


} );
