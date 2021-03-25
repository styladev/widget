/* globals document, describe, it */
import Build        from '/build.tmpl';
import BaseWidget   from '/baseWidget.tmpl';
import classes      from '/classes';

import domainConfig from '../domainConfig';
import feed         from '../feed';

import assert       from 'assert';
import clone        from 'clone';
import sinon        from 'sinon';


const getStub = url =>
{
    let res = ( /config/ ).test( url ) ?  domainConfig : feed;
    res     = JSON.stringify( res );

    return {
        then    : _func =>
        {
            try
            {
                _func( res );
                const result  = {
                    catch : _func => _func( {} )
                };

                return result;
            }
            catch ( e )
            {
                return {
                    catch : _func => _func( e )
                };
            }
        },
        catch   : () =>
        {
        }
    };
};


sinon.stub( Build.prototype.http, 'get', getStub );

const stylaWidget = new BaseWidget( {
    target         : document.body,
    slug           : 'braunhamburg',
    domain         : 'test',
    imageApiDomain : 'honeybee.stage.eu.magalog.net'
} );



describe( 'buildHeadline', () =>
{
    const build           = new Build( stylaWidget, JSON.stringify( feed.stories ) );
    const headlineWrapper = build.buildHeadline( 'moon?' );
    let   headline        = headlineWrapper.childNodes;

    it( 'should correctly build the headlineWrapper', () =>
    {
        assert.ok( headlineWrapper.nodeType === 1 );
        assert.equal( headlineWrapper.className, classes.HEADLINE_WRAPPER );
        assert.equal( headline.length, 1 );
    } );


    it( 'should correctly build the headline', () =>
    {
        headline = headline[ 0 ];
        assert.equal( headline.className, classes.HEADLINE );
        assert.equal( headline.textContent, 'moon?' );
    } );
} );


describe( 'buildImage', () =>
{
    const build  = new Build( stylaWidget, JSON.stringify( feed.stories ) );

    const id     = feed.images[ 0 ].id;
    const images = {};

    feed.images.forEach( i => images[ i.id ] = i );
    build.context.images = images;

    const imageWrapper   = build.buildImage( [ {
        id : id
    } ], 'moon?' );

    it( 'should correctly build the imageWrapper', () =>
    {
        assert.ok( imageWrapper.nodeType === 1,
            'imageWrapper is a dom element' );
        assert.equal( imageWrapper.className, classes.IMAGE_WRAPPER,
            'imageWrapper has correct class name' );
    } );


    it( 'should correctly build the image tag', () =>
    {
        let image = imageWrapper.childNodes;
        assert.equal( image.length, 1, 'imageWrapper has only one child' );

        image = image[ 0 ];
        assert.equal( image.className, classes.IMAGE,
            'image has correct class name' );
        assert.equal( image.title, 'moon?', 'image has correct title' );
    } );
} );


describe( 'buildStories', () =>
{
    const build  = new Build( stylaWidget, JSON.stringify( feed.stories ) );
    const config = clone( domainConfig );

    it( 'should correctly build the stories wrapper', () =>
    {
        const wrapper = build.buildStories( JSON.stringify( config ) );

        assert.ok( wrapper.nodeType === 1, 'Wrapper is a dom element' );
        assert.ok( wrapper.className.indexOf( classes.WRAPPER ) !== -1,
            'Wrapper has correct class name' );
    } );


    it( 'should fail if no JSON is passed', () =>
    {
        assert.throws( build.buildStories,
            `Styla Widget error: Could not find magazine,
                        please check if slug is configured correctly.` );
    } );


    it( 'should return nothing if there are no images', () =>
    {
        build.context.stories.images = false;

        assert.equal( build.buildStories( JSON.stringify( config ) ),
            false,
            'no images' );
    } );


    it( 'should correctly determine the pushstateDefault', () =>
    {
        config.embed.pushstateDefault = true;
        build.buildStories( JSON.stringify( config ) );
        assert.equal(  build.context.pushstate, '/' );

        config.embed.pushstateDefault = false;
        build.buildStories( JSON.stringify( config ) );
        assert.equal(  build.context.pushstate, '#' );
    } );
} );


describe( 'buildStory', () =>
{
    const build         = new Build( stylaWidget, JSON.stringify( feed.stories ) );
    build.domainConfig  = clone( domainConfig );

    const id            = Object.keys( stylaWidget.images )[ 0 ];

    const storyObj = {
        title               : 'moon?',
        description         : '[{"type":"text","content":"description"}]',
        images              : [ {
            id : id
        } ],
        id                  : 666,
        externalPermalink   : 'externalPermalink'
    };


    let story = build.buildStory( storyObj );

    it( 'should correctly build the story wrapper', () =>
    {
        assert.ok( story.nodeType === 1, 'Story wrapper is a dom element' );
        assert.equal( story.className, classes.STORY,
            'Wrapper has correct class name' );
    } );


    it( 'should build story link with hashtag navigation', () =>
    {
        let storyLink = story.childNodes;
        assert.equal( storyLink.length, 1, 'story has only one child' );
        storyLink = storyLink[ 0 ];

        assert.equal( storyLink.className, classes.STORY_LINK,
            'storyLink has correct class name' );

        const href = storyLink.href.replace( /^\/\/test/, '' );
        assert.equal( href.charAt( 0 ), '#', 'storyLink uses hashtag naviagtion' );
    } );


    it( 'should build story link with pushstate navigation', () =>
    {
        build.context.pushstate = '/';

        story = build.buildStory( storyObj );

        let storyLink   = story.childNodes;
        storyLink       = storyLink[ 0 ];

        const href = storyLink.href.replace( /^\/\/test/, '' );
        assert.equal( href.charAt( 0 ), '/', 'storyLink uses slash navigation' );

        build.context.pushstate = '#';
    } );


    it( 'should build the Call-To-Action', () =>
    {
        build.context.cta = 'boop';
        story = build.buildStory( storyObj );

        const storyLink = story.childNodes;

        assert.equal( storyLink[ 0 ].childNodes[ 2 ].className,
            'styla-widget__calltoaction', 'Call To Action element exists' );
        assert.equal( storyLink[ 0 ].childNodes[ 2 ].innerHTML,
            'boop', 'Call to Action element is displaying the correct text' );
    } );


    it( 'should ignore a story with the passed ignore id', () =>
    {
        build.context.ignore = 666;
        story = build.buildStory( storyObj );

        assert.equal( story, false, 'story ignored' );
    } );
} );


describe( 'buildStoryLink', () =>
{
    const build      = new Build( stylaWidget, JSON.stringify( feed.stories ) );
    build.domainConfig  = clone( domainConfig );
    const ignoreSlug = 'ignore-slug';


    it( 'should build a story link for old style routing', () =>
    {
        build.context.routesOle = {
            'story' : 'oldpath/%2$s_%3$s'
        };
        build.context.routesNle = undefined;

        const url    = build.buildStoryLink( ignoreSlug );

        assert.equal( url,
            '//test#oldpath/ignore-slug', //eslint-disable-line
            'link has correct format' );
    } );

    it( 'should build a story link for old style routing, in case both are defined', () =>
    {
        build.context.routesOle = {
            'story' : 'oldpath/%2$s_%3$s'
        };
        build.context.routesNle = {
            'story' : {
                'path' : '/newpath/:storySlug'
            }
        };

        const url    = build.buildStoryLink( ignoreSlug );

        assert.equal( url,
            '//test#oldpath/ignore-slug', //eslint-disable-line
            'link has correct format' );
    } );

    it( 'should build a story link for basic new style routing', () =>
    {
        build.context.routesOle = undefined;
        build.context.routesNle = {
            'story' : {
                'path' : '/newpath/:storySlug'
            }
        };

        const url = build.buildStoryLink( ignoreSlug );

        assert.equal( url,
            '//test#newpath/ignore-slug, //eslint-disable-line
            'link has correct format' );
    } );

    it( 'should build a story link for advanced new style routing', () =>
    {
        build.context.routesOle = undefined;
        build.context.routesNle = {
            'magazine' : {
                'path' : '/testmagazine'
            },
            'story' : {
                'path' : '/:categorySlug/:storySlug'
            }
        };
        const categories = [ {
            'slug' : 'use-category'
        },
            {
                'slug' : 'ignore-category'
            } ];


        const url    = build.buildStoryLink( ignoreSlug, categories );

        assert.equal( url,
            '//test#testmagazine/use-category/ignore-slug, //eslint-disable-line
            'link has correct format' );
    } );
} );


describe( 'buildStoryText', () =>
{
    const build       = new Build( stylaWidget, JSON.stringify( feed.stories ) );
    const textWrapper = build.buildStoryText( 'moon?',
        '[{"type":"text","content":"description"}]' );

    it( 'should correctly build the story wrapper', () =>
    {
        assert.ok( textWrapper.nodeType === 1, 'Wrapper is a dom element' );
        assert.equal( textWrapper.className, classes.TEXT_WRAPPER,
            'Wrapper has correct class name' );
    } );


    it( 'should correctly build the story text children', () =>
    {
        const children = textWrapper.childNodes;
        assert.equal( children.length, 3, 'textWrapper has 3 children' );

        assert.equal( children[ 0 ].innerHTML,
            '<span class="styla-widget__headline">moon?</span>',
            'headline is set right' );
        assert.equal( children[ 1 ].innerHTML, 'description ',
            'description is set right' );
    } );


    it( 'should have no text if it has no text', () =>
    {
        const textWrapper = build.buildStoryText( 'moon?' );
        const children = textWrapper.childNodes;

        assert.equal( children[ 1 ].innerHTML, '' );
    } );
} );


describe( 'buildStyleTag', () =>
{
    const build  = new Build( stylaWidget, JSON.stringify( feed.stories ) );

    it( 'should correctly build the styla tag', () =>
    {
        const el = build.buildStyleTag( 'moon' );

        assert.ok( el.nodeType === 1, 'StyleTag is a dom element' );
        assert.equal( el.tagName, 'STYLE', 'StyleTag is a style tag' );
        assert.equal( el.className, classes.STYLES, 'StyleTag class is set' );
        assert.equal( el.type, 'text/css', 'StyleTag is a css tag' );
    } );
} );


describe( 'compileStyles', () =>
{
    const build  = new Build( stylaWidget, JSON.stringify( feed.stories ) );

    it( 'should correctly build the style element', () =>
    {
        build.domainConfig = clone( domainConfig );
        const el = build.compileStyles();
        assert.ok( el.nodeType === 1, 'Styles is a dom element' );
        assert.equal( el.textContent[ 0 ], '#', 'Styles css is set' );
    } );


    it( 'should return no css if there is no theme', () =>
    {
        build.domainConfig.theme = false;
        const el = build.compileStyles();

        assert.equal( el.innerHTML, '', 'style el has no css' );
    } );
} );


describe( 'constructor', () =>
{
    const build        = new Build( stylaWidget, JSON.stringify( feed.stories ) );
    build.domainConfig = clone( domainConfig );

    it( 'the build object should have a set context and domainConfig', () =>
    {
        const b = build.constructor( stylaWidget, feed );
        assert.ok( typeof b.now === 'number', 'Build gets built' );
        assert.ok( b.context instanceof BaseWidget,
            'Build contains the context of a widget instance' );
        assert.ok( typeof b.domainConfig !== 'undefined',
            'Build contains a domainConfig' );
    } );
} );


describe( 'create', () =>
{
    const build  = new Build( stylaWidget, JSON.stringify( feed.stories ) );

    it( 'should create an object with the passed parameters', () =>
    {
        const el = build.create( 'moon', 'doge' );

        assert.ok( el.nodeType === 1, 'element is a dom element' );
        assert.equal( el.tagName, 'MOON', 'element is a style tag' );
        assert.equal( el.className, 'doge', 'element has the correct class' );
    } );
} );


describe( 'getDescription', () =>
{
    const build        = new Build( stylaWidget, JSON.stringify( feed.stories ) );
    const storyTextArr = [
        {
            type : 'moon'
        },
        {
            type    : 'text',
            content : 'doge 1'
        },
        {
            type : 'moon'
        },
        {
            type    : 'text',
            content : 'doge 2'
        },
        {
            type : 'moon'
        }
    ];

    it( 'should by default return combined text from multiple content blocks', () =>
    {
        const text = build.getDescription( storyTextArr );

        assert.equal( text, 'doge 1 doge 2 ' );
    } );

    it( 'should return text from the first block only', () =>
    {
        const text = build.getDescription( storyTextArr, false );

        assert.equal( text, 'doge 1' );
    } );

    it( 'should return empty string if the index is out of range', () =>
    {
        const text = build.getDescription( storyTextArr, true, 10 );

        assert.equal( text, '' );
    } );

    it( 'should return empty string if input does not contain any text block', () =>
    {
        const storyTextArrNoText = [
            {
                type : 'moon'
            },
            {
                type : 'moon'
            },
            {
                type : 'moon'
            }
        ];

        const text = build.getDescription( storyTextArrNoText );

        assert.equal( text, '' );
    } );
} );


describe( 'getImageUrl', () =>
{
    const build  = new Build( stylaWidget, JSON.stringify( feed.stories ) );

    it( 'should correctly assign the imageApiDomain parameter', () =>
    {
        assert.equal(
            build.context.imageApiDomain,
            'honeybee.stage.eu.magalog.net'
        );
    } );

    it( 'should correctly set the image url', () =>
    {
        const url = build.getImageUrl( 'moon', 399 );

        assert.equal(
            url,
            '//honeybee.stage.eu.magalog.net/resizer/sfh_399x0/_moon?still',
            'image url is set correctly'
        );
    } );


    it( 'should default to 400 width', () =>
    {
        const url = build.getImageUrl( 'moon' );

        assert.equal(
            url,
            '//honeybee.stage.eu.magalog.net/resizer/sfh_400x0/_moon?still',
            'image url is set correctly'
        );
    } );
} );


describe( 'includeBaseStyles', () =>
{

    const build        = new Build( stylaWidget, JSON.stringify( feed.stories ) );
    build.domainConfig = clone( domainConfig );
    const elArr        = build.includeBaseStyles( '#styla-widget' );

    elArr.forEach( el =>
    {
        it( 'should correctly build each style element', () =>
        {
            assert.ok( el.nodeType === 1, 'StyleTag is a dom element' );

            assert.ok( el.tagName === 'LINK' || el.tagName === 'STYLE',
                'StyleTag is a style tag' );
            assert.ok( el.className !== '', 'StyleTag class is set' );
            assert.equal( el.type, 'text/css', 'StyleTag is a css tag' );
        } );
    } );


    it( 'should not add a font tag if there is no custom font url', () =>
    {
        build.domainConfig.embed.customFontUrl = false;
        const elArr = build.includeBaseStyles( '#styla-widget' );
        assert.equal( elArr.length, 0, 'font tag is not added' );
    } );
} );


describe( 'includeFonts', () =>
{
    const build        = new Build( stylaWidget, JSON.stringify( feed.stories ) );
    build.domainConfig = clone( domainConfig );

    it( 'should properly build the font link tag', () =>
    {
        const el      = build.includeFonts();

        assert.ok( el.nodeType === 1, 'Font tag is a dom element' );
        assert.equal( el.tagName, 'LINK', 'font tag is a style tag' );
        assert.equal( el.rel, 'stylesheet', 'font tag class is set' );
        assert.equal( el.type, 'text/css', 'font tag is a css tag' );
        assert.equal( el.href, domainConfig.embed.customFontUrl,
            'font tag points to the right css' );
    } );


    it( 'should add // to font urls if it doesnt already have it', () =>
    {
        build.domainConfig  = clone( domainConfig );
        build.domainConfig.embed.customFontUrl = 'moon';
        const el              = build.includeFonts();

        assert.equal( el.href, '//moon', 'corrects a malformed url' );
    } );
} );


describe( 'setDomain', () =>
{
    const build        = new Build( stylaWidget, JSON.stringify( feed.stories ) );
    build.domainConfig = clone( domainConfig );

    it( 'should pass the current domain if there is one', () =>
    {
        const domain          = build.setDomain();

        assert.equal( typeof domain, 'string', 'domain is a string' );
        assert.equal( domain, 'test', 'domain is correct' );
    } );


    it( 'should use the linkDomain if there is one', () =>
    {
        build.context.linkDomain    = 'moon';
        build.context.domain        = false;

        const domain = build.setDomain();

        assert.equal( domain, 'moon', 'domain is correct' );
    } );


    it( 'should build a domain if there isn\'t one', () =>
    {
        build.context.domain = false;
        build.context.linkDomain    = false;

        const embed           = build.domainConfig.embed;
        let domain          = build.setDomain();

        assert.equal( domain, `${embed.magazineUrl}/${embed.rootPath}`,
            'domain is correct' );

        build.domainConfig.embed.rootPath  = `/${embed.rootPath}`;

        domain          = build.setDomain();
        assert.equal( domain, `${embed.magazineUrl}${embed.rootPath}`,
            'domain with a slash is fixed ' );
    } );


    it( 'should throw an error if there is no available domain', () =>
    {
        build.context.linkDomain    = false;
        build.context.domain        = false;
        build.domainConfig          = false;

        assert.throws( build.setDomain.bind( build ),
            /Styla Widget error: No domain defined or bad domain config./ );
    } );
} );
