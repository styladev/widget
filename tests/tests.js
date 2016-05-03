
import versionTest      from './unit/versionTest';
import StylaWidget 		from '../src/widget';


let stylaWidget = new StylaWidget( {
    slug    : 'braunhamburg',
    domain  : 'http://www.braun-hamburg.de/stories/'
} );


window.onload = function()
{
    document.getElementsByTagName( 'TITLE' )[0].textContent = 'StylaWidget - ' + stylaWidget.version;
};


versionTest( stylaWidget );
