let tests = function( stylaWidget )
{
    QUnit.module( 'widget.js' );


    QUnit.test( 'buildStories', function( assert )
    {
        let buildStoriesTest = assert.async();
        let url = `https://www.amazine.com/api/feeds/user/${stylaWidget.slug}?domain=${stylaWidget.slug}&offset=0&limit=5`
        stylaWidget.http.get( url ).then( function( stories )
        {
            let container = stylaWidget.buildStories ( stories );
            assert.ok ( container.nodeType === 1, 'Container is a dom element' );
            assert.equal ( container.className, stylaWidget.classes.CONTAINER, 'Container has correct class name' );
            buildStoriesTest();
        } ).catch( e=> console.log(e));
    } );


    QUnit.test( 'buildStory', function( assert )
    {
        let buildStoryTest = assert.async();
        let url = `https://www.amazine.com/api/feeds/user/${stylaWidget.slug}?domain=${stylaWidget.slug}&offset=0&limit=5`
        stylaWidget.http.get( url ).then( function( stories )
        {
            let images = {};
            stories = JSON.parse( stories )
            stories.images.forEach( function( _i ){ images[ _i.id ] = _i; });
            stylaWidget.images = images;

            let story = stories.stories.map( stylaWidget.buildStory );
            assert.ok ( story[0].nodeType === 1, 'Story is a dom element' );
            assert.equal ( story[0].className, stylaWidget.classes.STORY, 'Story has correct class name' );
            buildStoryTest();
        } ).catch( e=> console.log(e));
    } );


    QUnit.test( 'buildStyles', function( assert )
    {
        let buildStyles = assert.async();

        stylaWidget.http.get( stylaWidget.domainConfigAPI + stylaWidget.slug )
            .then( function( domainConfig )
            {
                domainConfig = JSON.parse( domainConfig );

                let el = stylaWidget.buildStyles( domainConfig );

                assert.ok( el.nodeType === 1, 'Styles is a dom element' );
                assert.equal( el.textContent[0], '.', 'Styles css is set' );
                buildStyles();
            } ).catch( e=> console.log(e));
    } );


    QUnit.test( 'buildStyleTag', function( assert )
    {
        let el = stylaWidget.buildStyleTag( 'moon' );

        assert.ok( el.nodeType === 1, 'StyleTag is a dom element' );
        assert.equal( el.tagName, 'STYLE', 'StyleTag is a style tag' );
        assert.equal( el.className, stylaWidget.classes.STYLES, 'StyleTag class is set' );
        assert.equal( el.type, 'text/css', 'StyleTag is a css tag' );
    } );


    QUnit.test( 'create', function( assert )
    {
        let el = stylaWidget.create( 'moon', 'doge' );

        assert.ok( el.nodeType === 1, 'element is a dom element' );
        assert.equal( el.tagName, 'MOON', 'element is a style tag' );
        assert.equal( el.className, 'doge', 'element has the correct class' );
    } );


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


    QUnit.test( 'getImageUrl', function( assert )
    {
        let url = stylaWidget.getImageUrl( 'moon', 399 );

        assert.equal( url, '//img.styla.com/resizer/sfh_399x0/_moon?still' );
    } );



    QUnit.test( 'includeBaseStyles', function( assert )
    {
        let el          = stylaWidget.includeBaseStyles();

        assert.ok( el.nodeType === 1, 'StyleTag is a dom element' );
        assert.equal( el.tagName, 'STYLE', 'StyleTag is a style tag' );
        assert.equal( el.className, stylaWidget.classes.BASE_STYLES, 'StyleTag class is set' );
        assert.equal( el.type, 'text/css', 'StyleTag is a css tag' );
        assert.equal( el.parentNode, document.head, 'StyleTag is mounted correctly' );
        assert.equal( el.textContent.indexOf( '#styla-widget' ), 0, 'StyleTag contains the correct info' );
    } );


    QUnit.test( 'includeFonts', function( assert )
    {
        let buildStyles = assert.async();

        stylaWidget.http.get( stylaWidget.domainConfigAPI + stylaWidget.slug )
            .then( function( domainConfig )
            {
                domainConfig = JSON.parse( domainConfig );

                let el      = stylaWidget.includeFonts( domainConfig );

                assert.ok( el.nodeType === 1, 'Font tag is a dom element' );
                assert.equal( el.tagName, 'LINK', 'font tag is a style tag' );
                assert.equal( el.rel, 'stylesheet', 'font tag class is set' );
                assert.equal( el.type, 'text/css', 'font tag is a css tag' );
                assert.equal( el.href, window.location.protocol + domainConfig.embed.customFontUrl, 'font tag points to the right css' );

                buildStyles();
            } ).catch( e=> console.log(e));
    } );
};

export default tests;
