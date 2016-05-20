

let tests = function( stylaWidget )
{
    QUnit.module( 'widget.js' );


    /**
     * ## constructor
     *
     * grabs the feed from the api and starts everything
     *
     * @param {String} domain target domain to grab products from
     *
     * @return _Object_ this
     */
    QUnit.test( 'constructor', function( assert )
    {
        assert.ok( true );
        // let headlineWrapper = stylaWidget.buildHeadline( 'moon?' );
        // let headline        = headlineWrapper.childNodes;

        // assert.ok( headlineWrapper.nodeType === 1, 'headlineWrapper is a dom element' );
        // assert.equal( headlineWrapper.className, classes.HEADLINE_WRAPPER, 'headlineWrapper has correct class name' );
        // assert.equal( headline.length, 1, 'headlineWrapper has only one child' );

        // headline = headline[0];
        // assert.equal( headline.className, classes.HEADLINE, 'headline has correct class name' );
        // assert.equal( headline.textContent, 'moon?', 'headline has correct text' );
    } );


    /**
     * ## destroy
     *
     * removes the styla widget from the DOM
     *
     * @return _Void_
     */
    QUnit.test( 'destroy', function( assert )
    {
        assert.ok( true );
        // let headlineWrapper = stylaWidget.buildHeadline( 'moon?' );
        // let headline        = headlineWrapper.childNodes;

        // assert.ok( headlineWrapper.nodeType === 1, 'headlineWrapper is a dom element' );
        // assert.equal( headlineWrapper.className, classes.HEADLINE_WRAPPER, 'headlineWrapper has correct class name' );
        // assert.equal( headline.length, 1, 'headlineWrapper has only one child' );

        // headline = headline[0];
        // assert.equal( headline.className, classes.HEADLINE, 'headline has correct class name' );
        // assert.equal( headline.textContent, 'moon?', 'headline has correct text' );
    } );
};

export default tests;
