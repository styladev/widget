var jsdom           = require( 'jsdom' );

global.document     = jsdom.jsdom( '<!doctype html><html><body><div></div></body></html>' );
global.window       = document.defaultView;
global.navigator    = { userAgent : 'node.js' };

global.domainConfig = {};
global.stories      = {};