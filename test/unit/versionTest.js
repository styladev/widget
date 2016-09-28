/* globals describe, it */
import version      from '/version.js';
import packageJson  from '../../package.json';

import BaseWidget   from '/baseWidget';

import assert       from 'assert';

/*
 * ## version tests
 *
 * @test exists
 * @test matches the package file
 */
describe( 'version', () =>
{
    it( 'should match both the package.json and the widget', () =>
    {
        assert.ok( version, 'exists' );
        assert.equal( version, packageJson.version, 'versions match file' );
        assert.equal( version, BaseWidget.version,
                                                'versions match BaseWidget' );
    } );


    it( 'should be read only', () =>
    {
        assert.throws( () => BaseWidget.version = '2.0.0', Error,
                                                'versions match BaseWidget' );
    } );
} );
