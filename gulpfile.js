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
        .pipe ( gulp.dest( buildPath + '/js' ));
});

gulp.task( 'layouts', ['css', 'js'], function()
{
    let baseStyles = fs.readFileSync( `${buildPath}/css/baseStyles.css`, 'utf8' );
        
    for (let layout of layouts) 
    {
        gulp.src( buildPath + '/js/baseWidget.tmpl.js' )
            .pipe( replace( 'TMPL-VARIABLE-LAYOUT', layout ) )
            .pipe( replace ('TMPL-VARIABLE-BASESTYLES', baseStyles ) )
            .pipe( replace ('TMPL-VARIABLE-SPECIFICSTYLES', 
                fs.readFileSync( `${buildPath}/css/${layout}.css`, 'utf8' ) ) )
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
            .pipe( rename( layout + '.min.js' ) )
            .pipe( gulp.dest( distPath ) )
            .pipe( rename( `${layout}.v${majorVersion}.min.js` ) )
            .pipe( gulp.dest( distPath ) );
    }
});

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
            insertStyles( 'cards', 'baseWidget.js', '' );
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
            insertStyles( 'list', 'baseWidget.min.js', `.v${majorVersion}.min` );
            insertStyles( 'stories', 'baseWidget.min.js', `.v${majorVersion}.min` );
            insertStyles( 'horizontal', 'baseWidget.min.js', `.v${majorVersion}.min` );
            insertStyles( 'tiles', 'baseWidget.min.js', `.v${majorVersion}.min` );
            insertStyles( 'cards', 'baseWidget.min.js', `.v${majorVersion}.min` );
        } );
} );


var insertStyles = function( target = 'list', file = 'list.min.js', suffix = '.min', folder = 'dist' )
{
    let stylesCss   = fs.readFileSync( `./dist/baseStyles.min.css`, 'utf8' );
    let specificCss = fs.readFileSync( `./dist/${target}.min.css`, 'utf8' );

    let _g = gulp.src( `./${folder}/${file}` );

    if ( suffix.endsWith( '.min' ) )
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
