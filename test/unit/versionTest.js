
import version      from '/version.js';
import _package     from '../../package.json';
import domainConfig from '../domainConfig';

import BaseWidget   from '/baseWidget'

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
        assert.equal( version, _package.version, 'versions match file' );
        assert.equal( version, BaseWidget.version, 'versions match BaseWidget' );
    } );


    it( 'should be read only', () =>
    {
        assert.throws( function(){ BaseWidget.version = '2.0.0'; }, Error, 'versions match BaseWidget' );
    } );
} );
