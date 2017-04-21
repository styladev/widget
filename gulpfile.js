const babelify      = require( 'babelify' );
const browserify    = require( 'browserify' );
const cleancss      = require( 'gulp-clean-css' );
const del           = require( 'del' );
const fs            = require( 'fs' );
const gulp          = require( 'gulp' );
const gutil         = require( 'gulp-util' );
const header        = require( 'gulp-header' );
const rename        = require( 'gulp-rename' );
const replace       = require( 'gulp-replace' );
const source        = require( 'vinyl-source-stream' );
const uglify        = require( 'gulp-uglify' );

const _package      = require( './package.json' );

const now           = new Date();
const year          = now.getUTCFullYear();
const version       = _package.version;
const homepage      = _package.homepage;

const srcPath       = 'src';   // source files
const buildPath     = 'build'; // temporary files for building
const distPath      = 'dist';  // final set of distribution files

const majorVersion  = version.slice(0,1)

const licence       = '/*!\n' +
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

const licenceMin    = '/*! Styla Widget v' + version + ' | (c) ' + ( 2016 === year ? year : '2016-' + year ) + ' Styla GmbH | ' + homepage + '/blob/master/license.md */\n';

const layouts       = [ 'cards', 'horizontal', 'list', 'stories', 'tiles' ];

gulp.task( 'clean', function() {
    del([buildPath, distPath, 'coverage']);
} );

gulp.task( 'css', function()
{
    gulp.src( srcPath + '/*.css' )
        .pipe( gulp.dest( buildPath + '/css' ) )
        .pipe( rename( { suffix: '.min' } ) )
        .pipe( cleancss() )
        .pipe( gulp.dest( buildPath + '/css' ) );
} );

gulp.task( 'js', function()
{
    return browserify( srcPath + '/baseWidget.tmpl.js' )
        .transform (babelify)
        .bundle()
        .on('error', gutil.log) 
        .pipe ( source( 'baseWidget.tmpl.js' ) ) // browserify destination name
        .pipe ( gulp.dest( buildPath + '/js' ) )
        .pipe ( rename( 'baseWidget.js' ) )
        .pipe ( gulp.dest ( distPath ) );
});

gulp.task( 'layouts', ['css', 'js'], function()
{
    // we cannot use the original css files here, only the minified. 
    // The original would be a multiline string which would need to be transformed.
    let baseStyles = fs.readFileSync( `${buildPath}/css/baseStyles.min.css`, 'utf8' );
        
    for (let layout of layouts) 
    {
        gulp.src( buildPath + '/js/baseWidget.tmpl.js' )
            .pipe( replace( 'TMPL-VARIABLE-LAYOUT', layout ) )
            .pipe( replace ('TMPL-VARIABLE-BASESTYLES', baseStyles ) )
            .pipe( replace ('TMPL-VARIABLE-SPECIFICSTYLES', 
                fs.readFileSync( `${buildPath}/css/${layout}.min.css`, 'utf8' ) ) ) // again, minified css
            .pipe( header( licence ) )
            .pipe( rename( layout + '.js' ) )
            .pipe( gulp.dest( distPath ) )
            .pipe( rename( `${layout}.v${majorVersion}.js` ) )
            .pipe( gulp.dest( distPath ) );
    }
});


gulp.task( 'layouts-min', ['css', 'js'], function()
{
    let baseStyles = fs.readFileSync( `${buildPath}/css/baseStyles.min.css`, 'utf8' );
        
    for (let layout of layouts) 
    {
        gulp.src( buildPath + '/js/baseWidget.tmpl.js' )
            .pipe( replace( 'TMPL-VARIABLE-LAYOUT', layout ) )
            .pipe( replace ('TMPL-VARIABLE-BASESTYLES', baseStyles ) )
            .pipe( replace ('TMPL-VARIABLE-SPECIFICSTYLES', 
                fs.readFileSync( `${buildPath}/css/${layout}.min.css`, 'utf8' ) ) )
            .pipe( uglify() )
            .pipe( header( licenceMin ) )
            .pipe( rename( `${layout}.v${majorVersion}.min.js` ) ) 
                // ATTN: name.min.js (without v2) denotes the old v1 widget
            .pipe( gulp.dest( distPath ) );
    }
});

gulp.task( 'default', function()
{
    gulp.start( [ 'layouts', 'layouts-min' ] );

    gulp.src( [
        './src/index.html',
        './src/stage.html',
        './src/logotype.svg'
    ] )
        .pipe( gulp.dest( distPath ) );
} );
