let domainConfig = {
    "embed" : {
        customFontUrl : "//fonts.googleapis.com/css?family=Roboto:400,400italic,700"
    },
    "theme" : {
        "hff" : "Helvetica",
        "hfw" : "700",
        "hfsc" : "1em",
        "hfs" : "normal",
        "htd" : "none",
        "hls" : "0em",
        "htc" : "#000000",
        "htt" : "none",
        "sff" : "Helvetica",
        "sfw" : "200",
        "stc" : "#000000",
        "strm" : "…",
        "strmw" : "inherit",
        "strmd" : "none",

        "hfsi" : "48px",
    }
};

let tests = function( stylaWidget )
{
    QUnit.test( 'elementExists', function ( assert )
    {
        let styleNode = stylaWidget.buildStyles( domainConfig );
        assert.ok ( styleNode );
        assert.ok ( styleNode.type );
        assert.equal ( styleNode.type, 'text/css' );
    } );

    QUnit.test ( 'stylesCorrect', function ( assert )
    {
        let styleNode = stylaWidget.buildStyles( domainConfig );
        let styleString =
        `.styla-widget__headline
            {
                font-family:        Helvetica;
                font-weight:        700;
                font-style:         normal;
                text-decoration:    none;
                letter-spacing:     0em;
                color:              #000000
            }
            .styla-widget__paragraph
            {
                font-family:        Helvetica;
                font-weight:        200;
                color:              #000000
            }
            .styla-widget__paragraph:after
            {
                content:            '…';
                font-weight:        inherit;
                text-decoration:    none
            }

        `;
        assert.equal ( styleNode.innerHTML.replace( /\s/g, '' ), styleString.replace( /\s/g, '' ) )
    } );

    QUnit.test ( 'fontImport', function( assert )
    {
        let fontNode = stylaWidget.includeFonts( domainConfig );
        assert.ok ( fontNode );
        assert.equal ( fontNode.href.replace(/^[a-z]+:\/\//i, '//'), '//fonts.googleapis.com/css?family=Roboto:400,400italic,700')
    } );
};

export default tests;
