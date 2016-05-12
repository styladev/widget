let tests = function( stylaWidget )
{
    QUnit.test( 'buildStory', function ( assert )
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
            assert.ok ( story[0].nodeType === 1, "Story is a dom element" );
            assert.equal ( story[0].className, stylaWidget.classes.STORY, "Story has correct class name" );
            buildStoryTest();
        } ).catch( e=> console.log(e));
    } );

    QUnit.test( 'buildStories', function ( assert )
    {
        let buildStoriesTest = assert.async();
        let url = `https://www.amazine.com/api/feeds/user/${stylaWidget.slug}?domain=${stylaWidget.slug}&offset=0&limit=5`
        stylaWidget.http.get( url ).then( function( stories )
        {
            let container = stylaWidget.buildStories ( stories );
            assert.ok ( container.nodeType === 1, "Container is a dom element" );
            assert.equal ( container.className, stylaWidget.classes.CONTAINER, "Container has correct class name" );
            buildStoriesTest();
        } ).catch( e=> console.log(e));
    } );

};

export default tests;
