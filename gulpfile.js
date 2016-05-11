const gulp          = require( 'gulp' );
const fs            = require( 'fs' );
const browserify    = require( 'browserify' );
const babelify      = require( 'babelify' );
const uglify        = require( 'gulp-uglify' );
const header        = require( 'gulp-header' );
const minifycss     = require( 'gulp-minify-css' );
const rename        = require( 'gulp-rename' );

const _package      = require( './package.json' );

const now           = new Date();
const year          = now.getUTCFullYear();

const licenceLong   = '/*!\n' +
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

const licenceShort  = '/*! Styla Widget v' + _package.version + ' | (c) ' + ( 2016 === year ? year : '2015-' + year ) + ' Styla GmbH | ' + _package.homepage + '/license.md */\n';


gulp.task( 'browserifyFiles', function()
{
    browserify( './src/widget.js' )
        .transform( babelify, { stage : 0 } )
        .bundle()
        .pipe( fs.createWriteStream( __dirname + '/dist/widget.js' ) )
        .on( 'finish', function()
        {
            gulp.src( './dist/widget.js' )
                .pipe( header( licenceLong ) )
                .pipe( gulp.dest( './dist/' ) )
        } );
} );


gulp.task( 'min', function()
{
    browserify( './src/widget.js' )
        .transform( babelify, { stage : 0 } )
        .bundle()
        .pipe( fs.createWriteStream( __dirname + '/dist/widget.min.js' ) )
        .on( 'finish', function()
        {
            gulp.src( './dist/widget.min.js' )
                .pipe( uglify() )
                .pipe( header( licenceShort ) )
                .pipe( gulp.dest( './dist/' ) )
        } );
} );


gulp.task( 'buildTests', function()
{
    browserify( './tests/tests.js' )
        .transform( babelify, { stage : 0 } )
        .bundle()
        .pipe( fs.createWriteStream( __dirname + '/tests/tests.dist.js' ) )
} );


gulp.task( 'css-min', function()
{
    return gulp.src( './src/styles.css' )
        .pipe( gulp.dest( './dist' ) )
        .pipe( rename( { suffix: '.min' } ) )
        .pipe( minifycss() )
        .pipe( gulp.dest( 'dist' ) );
} );


gulp.task( 'default', [], function()
{
    gulp.start( [ 'browserifyFiles', 'css-min', 'min', 'buildTests' ] );
} );
