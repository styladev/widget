
import Build        from '/build';
import BaseWidget   from '/baseWidget'
import classes      from '/classes';

import domainConfig from '../domainConfig';
import stories      from '../stories';


import assert       from 'assert';
import sinon        from 'sinon';


let getStub = url =>
{
    let res = url === `https://live.styla.com/api/config/braunhamburg` ?
                    domainConfig :
                    stories;
    res     = JSON.stringify( res );

    return {
        then    : _func =>
        {
            try
            {
                return _func( res );
            }
            catch( e )
            {
                return { catch: _func => _func( e ) };
            }
        },
        catch   : () => {}
    };
};

sinon.stub( Build.prototype.http, 'get', getStub );


let stylaWidget = new BaseWidget( { target: document.body, slug: 'braunhamburg', domain: 'test' } );

let build       = new Build( stylaWidget, JSON.stringify( stories ) );


/**
 * ## buildHeadline - tests
 *
 * builds the headline and headline wrapper and fills the wrapper with the
 * element and text
 *
 * @param {String} title story headline
 *
 * @return _DOMElement_ headlineWrapper
 */
describe( 'buildHeadline', () =>
{
    let headlineWrapper = build.buildHeadline( 'moon?' );
    let headline        = headlineWrapper.childNodes;

    it( 'should correctly build the headlineWrapper', () =>
    {
        assert.ok( headlineWrapper.nodeType === 1 );
        assert.equal( headlineWrapper.className, classes.HEADLINE_WRAPPER );
        assert.equal( headline.length, 1 );
    } );


    it( 'should correctly build the headline', () =>
    {
        headline = headline[0];
        assert.equal( headline.className, classes.HEADLINE );
        assert.equal( headline.textContent, 'moon?' );
    } );
} );


/**
 * ## buildImage - tests
 *
 * builds the headline and headline wrapper and fills the wrapper with the
 * element and text
 *
 * @param {Array} images array of images from the product api
 * @param {String} title story headline
 *
 * @return _DOMElement_ imageWrapper
 */
describe( 'buildImage', () =>
{
    let id              = stories.images[0].id;

    let images          = {};
    stories.images.forEach( function( _i ){ images[ _i.id ] = _i; } );

    build.context.images = images;

    let imageWrapper    = build.buildImage( [ { id : id } ], 'moon?' );

    it( 'should correctly build the imageWrapper', () =>
    {
        assert.ok( imageWrapper.nodeType === 1, 'imageWrapper is a dom element' );
        assert.equal( imageWrapper.className, classes.IMAGE_WRAPPER, 'imageWrapper has correct class name' );
    } );


    it( 'should correctly build the image tag', () =>
    {
        let image = imageWrapper.childNodes;

        assert.equal( image.length, 1, 'imageWrapper has only one child' );

        image = image[0];
        assert.equal( image.className, classes.IMAGE, 'image has correct class name' );
        assert.equal( image.title, 'moon?', 'image has correct title' );
    } );
} );


/**
 * ## buildStories - tests
 *
 * after recieving the story data, this parses and build the individual
 * stories
 *
 * @param {String} domainConfig JSON response from the product api
 * @param {Object} parsedDomainConfig parsed JSON object for testing
 *
 * @return _DOMElement_ wrapper element
 */
describe( 'buildStories', () =>
{
    it( 'should correctly build the stories wrapper', () =>
    {
        let wrapper = build.buildStories( JSON.stringify( domainConfig ) );
        assert.ok( wrapper.nodeType === 1, 'Wrapper is a dom element' );
        assert.ok( wrapper.className.indexOf( classes.WRAPPER ) !== -1, 'Wrapper has correct class name' );
    } );


    it( 'should fail if no JSON is passed', () =>
    {
        assert.throws( build.buildStories, `Styla Widget error: Could not find magazine, please check if slug is configured correctly.` );
    } );


    it( 'should return nothing if there are no images', () =>
    {
        let tempImages = build.context.stories.images;
        build.context.stories.images = false;

        assert.equal( build.buildStories( JSON.stringify( domainConfig ) ), false, 'no images ' );

        build.context.stories.images = tempImages;
    } );
} );


/**
 * ## buildStory
 *
 * builds each story off the retrieved json
 *
 * @param {Object} json image data
 *
 * @return _DOMElement_ outer story element
 */
describe( 'buildStory', () =>
{
    build.domainConfig      = domainConfig;

    let id                  = Object.keys( stylaWidget.images )[0];

    let storyObj = {
        title               : 'moon?',
        description         : '[{"type":"text","content":"description"}]',
        images              : [ { id : id } ],
        externalPermalink   : 'externalPermalink'
    };

    let story = build.buildStory( storyObj );

    it( 'should correctly build the story wrapper', () =>
    {
        assert.ok( story.nodeType === 1, 'Story wrapper is a dom element' );
        assert.equal( story.className, classes.STORY, 'Wrapper has correct class name' );
    } );


    it( 'should build correct story link with hashtag navigation', () =>
    {
        let storyLink = story.childNodes;
        assert.equal( storyLink.length, 1, 'story has only one child' );
        storyLink = storyLink[0];

        assert.equal( storyLink.className, classes.STORY_LINK, 'storyLink has correct class name' );

        let href = storyLink.href.replace( /^https?:/, '' );
        assert.equal( href, `//test#story/externalPermalink?styla_ref=about%3Ablank&styla_wdgt_var=Styla-widget-format-goes-here`, 'storyLink has correct href' );
    } );

    it( 'should build correct story link with pushstate', () =>
    {
        build.domainConfig.embed.pushstateDefault = true;
        story = build.buildStory( storyObj );

        let storyLink   = story.childNodes;
        storyLink       = storyLink[0];
        let href        = storyLink.href.replace( /^https?:/, '' );

        assert.equal( href, `//test/story/externalPermalink?styla_ref=about%3Ablank&styla_wdgt_var=Styla-widget-format-goes-here`, 'storyLink has correct href' );

        build.domainConfig      = domainConfig;
    } );

    it( 'should build the Call-To-Action', () =>
    {
        build.context.cta = 'boop';
        story = build.buildStory( storyObj );

        let storyLink = story.childNodes;

        assert.equal( storyLink[0].childNodes[2].className, 'styla-widget__calltoaction', 'Call To Action element exists' );
        assert.equal( storyLink[0].childNodes[2].innerHTML, 'boop', 'Call to Action element is displaying the correct text' );
        build.context.cta = false;
    } );

} );



/**
 * ## buildStoryText
 *
 * builds the story text (including headline and content), combines them
 * and returns the outer wrapper
 *
 * @param {String} title story headline
 * @param {String} description copy of the story to be inserted
 *
 * @return _DOMElement_ style element
 */
describe( 'buildStoryText', () =>
{
    let textWrapper = build.buildStoryText( 'moon?', '[{"type":"text","content":"description"}]' );

    it( 'should correctly build the story wrapper', () =>
    {
        assert.ok( textWrapper.nodeType === 1, 'Wrapper is a dom element' );
        assert.equal( textWrapper.className, classes.TEXT_WRAPPER, 'Wrapper has correct class name' );
    } );


    it( 'should correctly build the story text children', () =>
    {
        let children = textWrapper.childNodes;
        assert.equal( children.length, 3, 'textWrapper has 3 children' );

        assert.equal( children[ 0 ].innerHTML, '<h3 class="styla-widget__headline">moon?</h3>', 'headline is set right' );
        assert.equal( children[ 1 ].innerHTML, 'description', 'description is set right' );
    } );


    it( 'should have no text if it has no text', () =>
    {
        let textWrapper = build.buildStoryText( 'moon?' );
        let children = textWrapper.childNodes;

        assert.equal( children[ 1 ].innerHTML, '' );
    } );
} );


/**
 * ## buildStyleTag
 *
 * builds a style tag and appends it to the DOM
 *
 * @param {Object} domain configuration of magazine
 *
 * @return _DOMElement_ style element
 */
describe( 'buildStyleTag', () =>
{
    it( 'should correctly build the styla tag', () =>
    {
        let el = build.buildStyleTag( 'moon' );

        assert.ok( el.nodeType === 1, 'StyleTag is a dom element' );
        assert.equal( el.tagName, 'STYLE', 'StyleTag is a style tag' );
        assert.equal( el.className, classes.STYLES, 'StyleTag class is set' );
        assert.equal( el.type, 'text/css', 'StyleTag is a css tag' );
    } );
} );


/**
 * ## compileStyles
 *
 * compiles the styles and returns them added to the style tag
 *
 * @param {Object} domain configuration of magazine
 *
 * @return _DOMElement_ style element
 */
describe( 'compileStyles', () =>
{
    it( 'should correctly build the style element', () =>
    {
        build.domainConfig = domainConfig;
        let el = build.compileStyles();
        assert.ok( el.nodeType === 1, 'Styles is a dom element' );
        assert.equal( el.textContent[0], '#', 'Styles css is set' );
    } );


    it( 'should return no css if there is no theme', () =>
    {
        build.domainConfig.theme = false;
        let el = build.compileStyles();

        assert.equal( el.innerHTML, '', 'style el has no css' );

        build.domainConfig = domainConfig;
    } );
} );


/**
 * ## constructor
 *
 * after recieving the story data this sends it to buildStories for
 * processing
 *
 * @param {String} res JSON response from the product api
 *
 * @return _DOMElement_ container element
 */
describe( 'constructor', () =>
{
    it( 'should build the build object with a set context and domainConfig', () =>
    {
        let _b = build.constructor( stylaWidget, stories );
        assert.ok( typeof _b.now === 'number', 'Build gets built' );
        assert.ok( _b.context instanceof BaseWidget, 'Build contains the context of a widget instance' );
        assert.ok( typeof _b.domainConfig !== 'undefined', 'Build contains a domainConfig' );
    } );
} );


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
describe( 'create', () =>
{
    it( 'should create an object with the passed parameters', () =>
    {
        let el = build.create( 'moon', 'doge' );

        assert.ok( el.nodeType === 1, 'element is a dom element' );
        assert.equal( el.tagName, 'MOON', 'element is a style tag' );
        assert.equal( el.className, 'doge', 'element has the correct class' );
    } );
} );


/**
 * ## getDescription
 *
 * gets the first text description in the content and returns that
 *
 * @param {Array} _arr array filled w/ content
 * @param {Number} i recursive index
 *
 * @return _String or Boolean_ text content or false
 */
describe( 'getDescription', () =>
{
    it( 'should set the description correctly', () =>
    {
        let _arr = [
            { type: 'moon' },
            { type: 'text', content: 'doge' },
            { type: 'moon' },
            { type: 'moon' },
        ];

        let text = build.getDescription( _arr );

        assert.equal( text, 'doge', 'story text is set correctly' );
    } );


    it( 'should return false if there is no image', () =>
    {
        let _arr = [
            { type: 'moon' },
            { type: 'text', content: 'doge' },
            { type: 'moon' },
            { type: 'moon' },
        ];

        let text = build.getDescription( _arr, 10 );

        assert.equal( text, false, 'story text fails correctly' );
    } );
} );


/**
 * ## getImageUrl
 *
 * uses the filename and size to create the full image url
 *
 * @param {String} filename from the image data object
 * @param {Number or String} size width to grab from the server
 *
 * @return _String_ file name
 */
describe( 'getImageUrl', () =>
{
    it( 'should correctly set the image url', () =>
    {
        let url = build.getImageUrl( 'moon', 399 );

        assert.equal( url, '//img.styla.com/resizer/sfh_399x0/_moon?still', 'image url is set correctly' );
    } );


    it( 'should default to 400 width', () =>
    {
        let url = build.getImageUrl( 'moon' );

        assert.equal( url, '//img.styla.com/resizer/sfh_400x0/_moon?still', 'image url is set correctly' );
    } );
} );


/**
 * ## includeBaseStyles
 *
 * creates the base styles DOM element and adds it to the head
 *
 * @return _Void_
 */
describe( 'includeBaseStyles', () =>
{
    build.domainConfig  = domainConfig;
    let elArr = build.includeBaseStyles( '#styla-widget' );

    elArr.forEach( function( el, i )
    {
        it( 'should correctly build each style element', () =>
        {
            assert.ok( el.nodeType === 1, 'StyleTag is a dom element' );

            assert.ok( el.tagName === 'LINK' || el.tagName === 'STYLE', 'StyleTag is a style tag' );
            assert.ok( el.className !== '', 'StyleTag class is set' );
            assert.equal( el.type, 'text/css', 'StyleTag is a css tag' );
        } );
    } );


    it( 'should not add a font tag if there is no custom font url', () =>
    {
        build.domainConfig.embed.customFontUrl = false;
        let elArr = build.includeBaseStyles( '#styla-widget' );

        assert.equal( elArr.length, 0, 'font tag is not added' );

        build.domainConfig.embed.customFontUrl = 'http://www.com/';
    } );
} );


/**
 * ## includeFonts
 *
 * includes the webfonts link element
 *
 * @param {Object} domain configuration of magazine
 *
 * @return _DOMElement_ link element
 */
describe( 'includeFonts', () =>
{
    it( 'should properly build the font link tag', () =>
    {
        let el      = build.includeFonts();

        assert.ok( el.nodeType === 1, 'Font tag is a dom element' );
        assert.equal( el.tagName, 'LINK', 'font tag is a style tag' );
        assert.equal( el.rel, 'stylesheet', 'font tag class is set' );
        assert.equal( el.type, 'text/css', 'font tag is a css tag' );
        assert.equal( el.href, domainConfig.embed.customFontUrl, 'font tag points to the right css' );
    } );


    it( 'should add // to font urls if it doesnt already have it', () =>
    {
        build.domainConfig  = domainConfig;
        build.domainConfig.embed.customFontUrl = 'moon';
        let el              = build.includeFonts();

        assert.equal( el.href, '//moon', 'corrects a malformed url' );
    } );
} );


/**
 * ## setDomain
 *
 * takes pieces of the domainConfig and builds the domain
 *
 * @param {Object} domainConfig main config object
 *
 * @return _String_ domain address
 */
describe( 'setDomain', () =>
{
    it( 'should pass the current domain if there is one', () =>
    {
        let domain          = build.setDomain();

        assert.equal( typeof domain, 'string', 'domain is a string' );
        assert.equal( domain, 'test', 'domain is correct' );
    } );


    it( 'should use the linkDomain if there is one', () =>
    {
        build.context.linkDomain    = 'moon';
        build.context.domain        = false;

        let domain = build.setDomain();

        assert.equal( domain, 'moon', 'domain is correct' );

        build.context.linkDomain    = false;
    } );


    it( 'should build a domain if there isn\'t one', () =>
    {
        build.context.domain = false;

        let embed           = build.domainConfig.embed;
        let domain          = build.setDomain();

        assert.equal( domain, `${embed.magazineUrl}/${embed.rootPath}`, 'domain is correct' );

        build.domainConfig.embed.rootPath  = `/${embed.rootPath}`;

        domain          = build.setDomain();
        assert.equal( domain, `${embed.magazineUrl}${embed.rootPath}`, 'domain with a slash is fixed ' );
    } );


    it( 'should throw an error if there is no available domain', () =>
    {
        build.context.linkDomain    = false;
        build.context.domain        = false;
        build.domainConfig          = false;

        assert.throws( build.setDomain.bind( build ), /Styla Widget error: No domain defined or bad domain config./ );

        build.domainConfig      = domainConfig;
        build.context.domain    = `${domainConfig.embed.magazineUrl}/${domainConfig.embed.rootPath}`;

    } );
} );
