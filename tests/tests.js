
import versionTest      from './unit/versionTest';
import buildTest        from './unit/buildTest';

window.onload = function()
{	
    var widget = new StylaWidget_List( { slug : 'braunhamburg' } );

    document.getElementsByTagName( 'TITLE' )[0].textContent = 'StylaWidget - ' + widget.version;

    window.widget = widget;
    
    versionTest( widget );
    buildTest( widget );
};
