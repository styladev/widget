/*
 * no idea...   nothing working on this side.  maybe a jsdom issue?
 *
 * works in the browser
 * 
 * https://github.com/tmpvar/jsdom/issues/1517
 */


// import Build        from '/build';
// import BaseWidget   from '/baseWidget'
// import version      from '/version';
// import classes      from '/classes';

// import assert       from 'assert';
// import sinon        from 'sinon';


// /**
//  * ## destroy
//  *
//  * removes the styla widget from the DOM
//  *
//  * @return _Void_
//  */
// describe( 'destroy', () =>
// {
//     let stylaWidget = new BaseWidget( { target: document.body, slug: 'braunhamburg', domain: 'test' } );

//     stylaWidget.destroy();

//     it( 'should remove the widget from the DOM', () =>
//     {   
//         let parent  = refs.wrapper.parentNode;
//         assert.equal( parent, null );

//         refs.styles.forEach( el =>
//         {
//             let parent  = el.parentNode;
//             assert.equal( parent, null );
//         } );
//     } );
// } );