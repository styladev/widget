const gulp          = require( 'gulp' );
const fs            = require( 'fs' );
const browserify    = require( 'browserify' );
const babelify      = require( 'babelify' );
const uglify        = require( 'gulp-uglify' );
const header        = require( 'gulp-header' );
const minifycss     = require( 'gulp-minify-css' );
const cssWrap       = require( 'gulp-css-wrap' );
const rename        = require( 'gulp-rename' );
const replace       = require( 'gulp-replace' );

const _package      = require( './package.json' );

const now           = new Date();
const year          = now.getUTCFullYear();
const version       = _package.version;
const homepage      = _package.homepage;
const widgetCss     = fs.readFileSync( './dist/styles.min.css', 'utf8' );

const licenceLong   = '/*!\n' +
                      ' * Styla bite-sized widget v' + version + '\n' +
                      ' * ' + homepage + '\n' +
                      ' *\n' +
                      ' * Copyright ' + ( 2016 === year ? year : '2016-' + year ) + ' Styla GmbH and other contributors\n' +
                      ' * Released under the MIT license\n' +
                      ' * ' + homepage + '/license.md\n' +
                      ' *\n' +
                      ' * Date: ' + now.toDateString() + '\n' +
                      ' *' +
                      ' */\n';

const licenceShort  = '/*! Styla Widget v' + version + ' | (c) ' + ( 2016 === year ? year : '2015-' + year ) + ' Styla GmbH | ' + homepage + '/license.md */\n';


gulp.task( 'browserifyFiles', function()
{
    return browserify( './src/widget.js' )
        .transform( babelify, { stage : 0 } )
        .bundle()
        .pipe( fs.createWriteStream( __dirname + '/dist/widget.js' ) )
        .on( 'finish', function()
        {
            gulp.src( './dist/widget.js' )
                .pipe( header( licenceLong ) )
                .pipe( replace( /styla-widget-css-goes-here/, widgetCss ) )
                .pipe( gulp.dest( './dist/' ) )
        } );
} );


gulp.task( 'min', function()
{
    return browserify( './src/widget.js' )
        .transform( babelify, { stage : 0 } )
        .bundle()
        .pipe( fs.createWriteStream( __dirname + '/dist/widget.min.js' ) )
        .on( 'finish', function()
        {
            gulp.src( './dist/widget.min.js' )
                .pipe( uglify() )
                .pipe( header( licenceShort ) )
                .pipe( replace( /styla-widget-css-goes-here/, widgetCss ) )
                .pipe( gulp.dest( './dist/' ) )
        } );
} );


gulp.task( 'buildTests', function()
{
    return browserify( './tests/tests.js' )
        .transform( babelify, { stage : 0 } )
        .bundle()
        .pipe( fs.createWriteStream( __dirname + '/tests/tests.dist.js' ) )
} );


gulp.task( 'css-min', function()
{
    return gulp.src( './src/styles.css' )
                .pipe( rename( { suffix: '.min' } ) )
                .pipe( minifycss() )
                .pipe( gulp.dest( 'dist' ) );
} );


gulp.task( 'default', function()
{
    gulp.start( [ 'css-min', 'browserifyFiles', 'min', 'buildTests' ] );
} );
