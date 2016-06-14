
import versionTest      from './unit/versionTest';
import buildTest        from './unit/buildTest';

window.onload = function()
{	
    var widget = window.stylaWidget;

    document.getElementsByTagName( 'TITLE' )[0].textContent = 'StylaWidget - ' + widget.version;

    versionTest( widget );
    buildTest( widget );
};
