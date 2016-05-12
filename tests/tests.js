
import versionTest      from './unit/versionTest';
import stylingTest      from './unit/styling';
import storiesTest      from './unit/stories';

window.onload = function()
{
    var widget = window.stylaWidget.instance;

    document.getElementsByTagName( 'TITLE' )[0].textContent = 'StylaWidget - ' + widget.version;

    versionTest( widget );
    stylingTest( widget );
    storiesTest( widget );
};
