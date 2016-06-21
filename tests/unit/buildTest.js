
import Build    from '../../src/build.js';
import classes  from '../../src/classes.js';
import { http } from 'microbejs/dist/microbe.http.min';

const domainConfigAPI   = `https://www.amazine.com/api/config/`;

let tests = function( stylaWidget )
{
    http.get( domainConfigAPI + stylaWidget.slug ).then( function( domainConfig )
    {
        domainConfig        = JSON.parse( domainConfig );
        let storiesUrl = `https://www.amazine.com/api/feeds/all?domain=${stylaWidget.slug}&offset=${stylaWidget.offset}&limit=${stylaWidget.limit}`;

        http.get( storiesUrl ).then( function( stories )
        {
            let build = new Build( stylaWidget, stories );

            QUnit.module( 'build.js' );


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
            QUnit.test( 'buildHeadline', function( assert )
            {
                let headlineWrapper = build.buildHeadline( 'moon?' );
                let headline        = headlineWrapper.childNodes;

                assert.ok( headlineWrapper.nodeType === 1, 'headlineWrapper is a dom element' );
                assert.equal( headlineWrapper.className, classes.HEADLINE_WRAPPER, 'headlineWrapper has correct class name' );
                assert.equal( headline.length, 1, 'headlineWrapper has only one child' );

                headline = headline[0];
                assert.equal( headline.className, classes.HEADLINE, 'headline has correct class name' );
                assert.equal( headline.textContent, 'moon?', 'headline has correct text' );
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
            QUnit.test( 'buildImage', function( assert )
            {
                let id              = stylaWidget.stories.images[0].id;
                let imageWrapper    = build.buildImage( [ { id : id } ], 'moon?', stylaWidget );

                assert.ok( imageWrapper.nodeType === 1, 'imageWrapper is a dom element' );
                assert.equal( imageWrapper.className, classes.IMAGE_WRAPPER, 'imageWrapper has correct class name' );

                let image = imageWrapper.childNodes;

                assert.equal( image.length, 1, 'imageWrapper has only one child' );

                image = image[0];
                assert.equal( image.className, classes.IMAGE, 'image has correct class name' );
                assert.equal( image.title, 'moon?', 'image has correct title' );
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
            QUnit.test( 'buildStories', function( assert )
            {
                let wrapper = build.buildStories( false, domainConfig );
                assert.ok( wrapper.nodeType === 1, 'Wrapper is a dom element' );
                assert.ok( wrapper.className.indexOf( classes.WRAPPER ) !== -1, 'Wrapper has correct class name' );
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
            QUnit.test( 'buildStory', function( assert )
            {
                let id              = Object.keys( stylaWidget.images )[0];

                let storyObj = {
                    title               : 'moon?',
                    description         : '[{"type":"text","content":"description"}]',
                    images              : [ { id : id } ],
                    externalPermalink   : 'externalPermalink'
                };

                let story = build.buildStory( storyObj );

                assert.ok( story.nodeType === 1, 'Story wrapper is a dom element' );
                assert.equal( story.className, classes.STORY, 'Wrapper has correct class name' );

                let storyLink = story.childNodes;
                assert.equal( storyLink.length, 1, 'story has only one child' );
                storyLink = storyLink[0];

                assert.equal( storyLink.className, classes.STORY_LINK, 'storyLink has correct class name' );

                let href = storyLink.href.replace( /^https?:/, '' )
                assert.equal( href, `//${stylaWidget.domain}/story/externalPermalink/`, 'storyLink has correct href' );
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
            QUnit.test( 'buildStoryText', function( assert )
            {
                let textWrapper = build.buildStoryText( 'moon?', '[{"type":"text","content":"description"}]' );

                assert.ok( textWrapper.nodeType === 1, 'Wrapper is a dom element' );
                assert.equal( textWrapper.className, classes.TEXT_WRAPPER, 'Wrapper has correct class name' );

                let children = textWrapper.childNodes;
                assert.equal( children.length, 3, 'textWrapper has 3 children' );

                assert.equal( children[ 0 ].innerHTML, '<h3 class="styla-widget__headline">moon?</h3>', 'headline is set right' );
                assert.equal( children[ 1 ].innerHTML, 'description', 'description is set right' );
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
            QUnit.test( 'buildStyleTag', function( assert )
            {
                let el = build.buildStyleTag( 'moon' );

                assert.ok( el.nodeType === 1, 'StyleTag is a dom element' );
                assert.equal( el.tagName, 'STYLE', 'StyleTag is a style tag' );
                assert.equal( el.className, classes.STYLES, 'StyleTag class is set' );
                assert.equal( el.type, 'text/css', 'StyleTag is a css tag' );
            } );


            /**
             * ## buildTitle
             *
             * builds a style tag and appends it to the DOM
             * 
             * @param {String} title string to set the ttle to (for testing purposes)
             *
             * @return _DOMElement_ style element
             */
            QUnit.test( 'buildTitle', function( assert )
            {
                build.context.title = true;

                let el      = build.buildTitle( 'moon' );

                assert.ok( el.nodeType === 1, 'title is a dom element' );
                assert.equal( el.tagName, 'DIV', 'title is a div tag' );
                assert.equal( el.className, classes.TITLE, 'title class is set' );
                assert.equal( 'moon', el.innerHTML, 'title has the right text' );

                build.context.title = false;
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
            QUnit.test( 'compileStyles', function( assert )
            {
                let el = build.compileStyles( domainConfig );

                assert.ok( el.nodeType === 1, 'Styles is a dom element' );
                assert.equal( el.textContent[0], '.', 'Styles css is set' );
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
            QUnit.test( 'constructor', function( assert )
            {
                let _b = build.constructor( stylaWidget, stories );
                assert.ok( typeof _b.now === 'number', 'Build gets built' );
                assert.ok( _b.context instanceof StylaWidget_List, 'Build contains the context of a widget instance' );
                assert.ok( typeof _b.domainConfig !== 'undefined', 'Build contains a domainConfig' );
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
            QUnit.test( 'create', function( assert )
            {
                let el = build.create( 'moon', 'doge' );

                assert.ok( el.nodeType === 1, 'element is a dom element' );
                assert.equal( el.tagName, 'MOON', 'element is a style tag' );
                assert.equal( el.className, 'doge', 'element has the correct class' );
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
            QUnit.test( 'getDescription', function( assert )
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
            QUnit.test( 'getImageUrl', function( assert )
            {
                let url = build.getImageUrl( 'moon', 399 );

                assert.equal( url, '//img.styla.com/resizer/sfh_399x0/_moon?still', 'image url is set correctly' );
            } );


            /**
             * ## includeBaseStyles
             *
             * creates the base styles DOM element and adds it to the head
             *
             * @return _Void_
             */
            QUnit.test( 'includeBaseStyles', function( assert )
            {
                let elArr = build.includeBaseStyles( '#styla-widget' );

                elArr.forEach( function( el, i )
                {
                    assert.ok( el.nodeType === 1, 'StyleTag is a dom element' );

                    assert.equal( el.tagName, 'LINK' || 'STYLE', 'StyleTag is a style tag' );
                    assert.ok( el.className !== '', 'StyleTag class is set' );
                    assert.equal( el.type, 'text/css', 'StyleTag is a css tag' );
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
            QUnit.test( 'includeFonts', function( assert )
            {
                let el      = build.includeFonts( domainConfig );

                assert.ok( el.nodeType === 1, 'Font tag is a dom element' );
                assert.equal( el.tagName, 'LINK', 'font tag is a style tag' );
                assert.equal( el.rel, 'stylesheet', 'font tag class is set' );
                assert.equal( el.type, 'text/css', 'font tag is a css tag' );
                assert.equal( el.href, window.location.protocol + domainConfig.embed.customFontUrl, 'font tag points to the right css' );
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
            QUnit.test( 'setDomain', function( assert )
            {
                let domain  = build.setDomain( domainConfig );

                let embed   = domainConfig.embed;
                let _domain = `${embed.magazineUrl}/${embed.rootPath}`;

                assert.equal( typeof domain, 'string', 'domain is a string' );
                assert.equal( domain, _domain, 'domain is correct' );
            } );

        } ).catch( e => console.log( 'stories retrieval error: ', e ) );
    } ).catch( e => console.log( 'domainConfig retrieval error: ', e ) );
};

export default tests;
