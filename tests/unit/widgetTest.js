let tests = function( stylaWidget )
{
    let http = stylaWidget.http;

    http.get( stylaWidget.domainConfigAPI + stylaWidget.slug ).then( function( domainConfig )
    {
        domainConfig        = JSON.parse( domainConfig );

        let storiesUrl = `https://www.amazine.com/api/feeds/userTag/${stylaWidget.slug}/tag/${stylaWidget.tag}?offset=${stylaWidget.offset}&limit=${stylaWidget.limit}&domain=${stylaWidget.slug}`;

        http.get( storiesUrl ).then( function( stories )
        {
            QUnit.module( 'widget.js' );


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
                let headlineWrapper = stylaWidget.buildHeadline( 'moon?' );
                let headline        = headlineWrapper.childNodes;

                assert.ok( headlineWrapper.nodeType === 1, 'headlineWrapper is a dom element' );
                assert.equal( headlineWrapper.className, stylaWidget.classes.HEADLINE_WRAPPER, 'headlineWrapper has correct class name' );
                assert.equal( headline.length, 1, 'headlineWrapper has only one child' );

                headline = headline[0];
                assert.equal( headline.className, stylaWidget.classes.HEADLINE, 'headline has correct class name' );
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
                let classes         = stylaWidget.classes;
                let id              = Object.keys( stylaWidget.images )[0];
                let imageWrapper    = stylaWidget.buildImage( [ { id : id } ], 'moon?' );

                assert.ok( imageWrapper.nodeType === 1, 'imageWrapper is a dom element' );
                assert.equal( imageWrapper.className, classes.IMAGE_WRAPPER, 'imageWrapper has correct class name' );

                let image = imageWrapper.childNodes;

                assert.equal( image.length, 1, 'imageWrapper has only one child' );

                image = image[0];
                assert.equal( image.className, stylaWidget.classes.IMAGE, 'image has correct class name' );
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
    let wrapper = stylaWidget.buildStories( false, domainConfig );
    assert.ok( wrapper.nodeType === 1, 'Wrapper is a dom element' );
    assert.equal( wrapper.className, stylaWidget.classes.WRAPPER, 'Wrapper has correct class name' );
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

                let story = stylaWidget.buildStory( storyObj );

                assert.ok( story.nodeType === 1, 'Wrapper is a dom element' );
                assert.equal( story.className, stylaWidget.classes.STORY, 'Wrapper has correct class name' );

                let storyLink = story.childNodes;
                assert.equal( storyLink.length, 1, 'story has only one child' );
                storyLink = storyLink[0];

                assert.equal( storyLink.className, stylaWidget.classes.STORY_LINK, 'storyLink has correct class name' );

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
                let textWrapper = stylaWidget.buildStoryText( 'moon?', '[{"type":"text","content":"description"}]' );

                assert.ok( textWrapper.nodeType === 1, 'Wrapper is a dom element' );
                assert.equal( textWrapper.className, stylaWidget.classes.TEXT_WRAPPER, 'Wrapper has correct class name' );

                let children = textWrapper.childNodes;
                assert.equal( children.length, 2, 'textWrapper has 2 children' );

                assert.equal( children[ 0 ].innerHTML, '<h1 class="styla-widget__headline">moon?</h1>', 'headline is set right' );
                assert.ok( children[ 1 ].innerHTML, 'description', 'description is set right' );
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
                let el = stylaWidget.buildStyleTag( 'moon' );

                assert.ok( el.nodeType === 1, 'StyleTag is a dom element' );
                assert.equal( el.tagName, 'STYLE', 'StyleTag is a style tag' );
                assert.equal( el.className, stylaWidget.classes.STYLES, 'StyleTag class is set' );
                assert.equal( el.type, 'text/css', 'StyleTag is a css tag' );
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
                let el = stylaWidget.compileStyles( domainConfig );

                assert.ok( el.nodeType === 1, 'Styles is a dom element' );
                assert.equal( el.textContent[0], '.', 'Styles css is set' );
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
                let el = stylaWidget.create( 'moon', 'doge' );

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

                let text = stylaWidget.getDescription( _arr );

                assert.equal( text, 'doge' );
            } );


            /**
             * ## getDomainConfig
             *
             * after recieving the story data this sends it to buildStories for
             * processing
             *
             * @param {String} res JSON response from the product api
             *
             * @return _DOMElement_ container element
             */
            QUnit.test( 'getDomainConfig', function( assert )
            {
                let el = stylaWidget.getDomainConfig( stories );
                assert.ok( el.nodeType === 1, 'Story is a dom element' );
                assert.equal( el.className, stylaWidget.classes.CONTAINER, 'Story has correct class name' );
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
                let url = stylaWidget.getImageUrl( 'moon', 399 );

                assert.equal( url, '//img.styla.com/resizer/sfh_399x0/_moon?still' );
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
                let el = stylaWidget.includeBaseStyles( domainConfig );

                assert.ok( el.nodeType === 1, 'StyleTag is a dom element' );
                assert.equal( el.tagName, 'STYLE', 'StyleTag is a style tag' );
                assert.equal( el.className, stylaWidget.classes.BASE_STYLES, 'StyleTag class is set' );
                assert.equal( el.type, 'text/css', 'StyleTag is a css tag' );
                assert.equal( el.parentNode, document.head, 'StyleTag is mounted correctly' );
                assert.equal( el.textContent.indexOf( '#styla-widget' ), 0, 'StyleTag contains the correct info' );
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
                let el      = stylaWidget.includeFonts( domainConfig );

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
                let domain  = stylaWidget.setDomain( domainConfig );

                let embed   = domainConfig.embed;
                let _domain = `${embed.magazineUrl}/${embed.rootPath}`;

                assert.equal( typeof domain, 'string', 'domain is a string' );
                assert.equal( domain, _domain, 'domain is correct' );
            } );
        } ).catch( e=> console.log( e ) );
    } ).catch( e=> console.log( e ) );
};

export default tests;
