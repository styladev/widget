const gulp          = require( 'gulp' );
const fs            = require( 'fs' );
const browserify    = require( 'browserify' );
const babelify      = require( 'babelify' );
const uglify        = require( 'gulp-uglify' );
const header        = require( 'gulp-header' );
const minifycss     = require( 'gulp-minify-css' );
const rename        = require( 'gulp-rename' );
const replace       = require( 'gulp-replace' );

const _package      = require( './package.json' );

const now           = new Date();
const year          = now.getUTCFullYear();
const version       = _package.version;
const homepage      = _package.homepage;

const licenceLong   = '/*!\n' +
                      ' * Styla bite-sized widget v' + version + '\n' +
                      ' * ' + homepage + '\n' +
                      ' *\n' +
                      ' * Copyright ' + ( 2016 === year ? year : '2016-' + year ) + ' Styla GmbH and other contributors\n' +
                      ' * Released under the MIT license\n' +
                      ' * ' + homepage + '/blob/master/license.md\n' +
                      ' *\n' +
                      ' * Date: ' + now.toDateString() + '\n' +
                      ' *' +
                      ' */\n';

const licenceShort  = '/*! Styla Widget v' + version + ' | (c) ' + ( 2016 === year ? year : '2015-' + year ) + ' Styla GmbH | ' + homepage + '/blob/master/license.md */\n';


gulp.task( 'browserifyFiles', function()
{
    gulp.start( [ 'css-min' ] );

    return browserify( './src/baseWidget.js' )
        .transform( babelify )
        .bundle()
        .pipe( fs.createWriteStream( __dirname + '/dist/baseWidget.js' ) )
        .on( 'finish', function()
        {
            insertStyles( 'list', 'baseWidget.js', '' );
            insertStyles( 'stories', 'baseWidget.js', '' );
            insertStyles( 'horizontal', 'baseWidget.js', '' );
            insertStyles( 'tiles', 'baseWidget.js', '' );
        } );
} );


gulp.task( 'min', function()
{
    return browserify( './src/baseWidget.js' )
        .transform( babelify )
        .bundle()
        .pipe( fs.createWriteStream( __dirname + '/dist/baseWidget.min.js' ) )
        .on( 'finish', function()
        {
            insertStyles( 'list', 'baseWidget.min.js', '.min' );
            insertStyles( 'stories', 'baseWidget.min.js', '.min' );
            insertStyles( 'horizontal', 'baseWidget.min.js', '.min' )
            insertStyles( 'tiles', 'baseWidget.min.js', '.min' );
        } );
} );


var insertStyles = function( target = 'list', file = 'list.min.js', suffix = '.min', folder = 'dist' )
{
    let stylesCss   = fs.readFileSync( `./dist/baseStyles.min.css`, 'utf8' );
    let specificCss = fs.readFileSync( `./dist/${target}.min.css`, 'utf8' );

    let _g = gulp.src( `./${folder}/${file}` );

    if ( suffix === '.min' )
    {
        _g.pipe( uglify() ).pipe( header( licenceShort ) );
    }
    else
    {
        _g.pipe( header( licenceLong ) );
    }

    return _g.pipe( replace( 'styla-widget-css-goes-here', stylesCss ) )
            .pipe( replace( 'styla-build-specific-css-goes-here', specificCss ) )
            .pipe( replace( 'styla-widget-format-goes-here', target ) )
            .pipe( rename( `${target}${suffix}.js` ) )
            .pipe( gulp.dest( `./${folder}/` ) );
};


gulp.task( 'css-min', function()
{
    gulp.src( './src/list.css' )
        .pipe( rename( { suffix: '.min' } ) )
        .pipe( minifycss() )
        .pipe( gulp.dest( 'dist' ) );

    gulp.src( './src/stories.css' )
        .pipe( rename( { suffix: '.min' } ) )
        .pipe( minifycss() )
        .pipe( gulp.dest( 'dist' ) );

    gulp.src( './src/horizontal.css' )
        .pipe( rename( { suffix: '.min' } ) )
        .pipe( minifycss() )
        .pipe( gulp.dest( 'dist' ) );

    gulp.src( './src/tiles.css' )
        .pipe( rename( { suffix: '.min' } ) )
        .pipe( minifycss() )
        .pipe( gulp.dest( 'dist' ) );

    gulp.src( './src/baseStyles.css' )
            .pipe( rename( { suffix: '.min' } ) )
            .pipe( minifycss() )
            .pipe( gulp.dest( 'dist' ) );
} );


gulp.task( 'legacy', function()
{
    gulp.src( './legacy/widget.min.js' )
        .pipe( gulp.dest( 'dist' ) );
} );


gulp.task( 'default', function()
{
    gulp.start( [ 'legacy', 'browserifyFiles', 'min' ] );
} );
