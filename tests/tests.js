
import versionTest      from './unit/versionTest';
import widgetTest       from './unit/widgetTest';

window.onload = function()
{
    var widget = window.stylaWidget.instance;

    document.getElementsByTagName( 'TITLE' )[0].textContent = 'StylaWidget - ' + widget.version;

    versionTest( widget );
    widgetTest( widget );
};
