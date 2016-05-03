var gulp            = require( 'gulp' );
var fs              = require( 'fs' );
var browserify      = require( 'browserify' );
var babelify        = require( 'babelify' );
var uglify          = require( 'gulp-uglify' );
var header          = require( 'gulp-header' );

var _package        = require( './package.json' );

var now             = new Date();
var year            = now.getUTCFullYear();

var licenceLong     = '/*!\n' +
                      ' * Styla bite-sized widget v' + _package.version + '\n' +
                      ' * ' + _package.homepage + '\n' +
                      ' *\n' +
                      ' * Copyright ' + ( 2016 === year ? year : '2016-' + year ) + ' Styla GmbH and other contributors\n' +
                      ' * Released under the MIT license\n' +
                      ' * ' + _package.homepage + '/license.md\n' +
                      ' *\n' +
                      ' * Date: ' + now.toDateString() + '\n' +
                      ' *' +
                      ' */\n';

var licenceShort    = '/*! Styla Widget v' + _package.version + ' | (c) ' + ( 2016 === year ? year : '2015-' + year ) + ' Styla GmbH | ' + _package.homepage + '/license.md */\n';


function browserifyFiles( file )
{
    browserify( './src/' + file + '.js' )
        .transform( babelify, { stage : 0 } )
        .bundle()
        .pipe( fs.createWriteStream( __dirname + '/dist/' + file + '.js' ) )
        .on( 'finish', function()
        {
            gulp.src( './dist/' + file + '.js' )
                .pipe( header( licenceLong ) )
                .pipe( gulp.dest( './dist/' ) )
        } );
};


function min( file )
{
    browserify( './src/' + file + '.js' )
        .transform( babelify, { stage : 0 } )
        .bundle()
        .pipe( fs.createWriteStream( __dirname + '/dist/' + file + '.min.js' ) )
        .on( 'finish', function()
        {
            gulp.src( './dist/' + file + '.min.js' )
                .pipe( uglify() )
                .pipe( header( licenceShort ) )
                .pipe( gulp.dest( './dist/' ) )
        } );
}


gulp.task( 'buildTests', function()
{
    browserify( './tests/tests.js' )
        .transform( babelify, { stage : 0 } )
        .bundle()
        .pipe( fs.createWriteStream( __dirname + '/tests/tests.dist.js' ) )
} );


gulp.task( 'default', [], function()
{
    gulp.start( [ 'compile', 'compileEmbed', 'buildTests' ] );
} );


gulp.task( 'compile', [], function()
{
    browserifyFiles( 'widget' );
    min( 'widget' );
} );


gulp.task( 'compileEmbed', [], function()
{
    browserifyFiles( 'widgetEmbed' );
    min( 'widgetEmbed' );
} );
