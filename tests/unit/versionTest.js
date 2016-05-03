
/* global document, QUnit  */
import version  from '../../src/version.js';
import _package from '../../package.json';

let tests = function( stylaWidget )
{
    QUnit.module( 'version.js' );

    /*
     * ## version tests
     *
     * @test exists
     * @test matches the package file
     */
    QUnit.test( 'version', function( assert )
    {
        assert.ok( version, 'exists' );
        assert.equal( version, _package.version, 'versions match file' );
        assert.equal( version, stylaWidget.version, 'versions match stylaWidget' );
    } );
};

export default tests;
