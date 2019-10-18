import * as css from 'client/dom/CSS';
import selector from 'client/dom/selector';

export default function toggleUL( objName, hrefObj ) {

    const divs = document.getElementsByTagName( "ul" );
    for ( let i = 0; i < divs.length; i++ ) {
        if ( divs[ i ].className === "tree_child_hidden" ) {
            divs[ i ].style.display = "none";
        }
    }

    const dObj = document.getElementById( objName );
    if ( dObj ) {
        if ( dObj.style.display === "block" ) {
            dObj.style.display = "none";
        } else {
            dObj.style.display = "block";
        }
    }

    const hrefs = selector( "span.toplevel" );
    for ( let i = 0; i < hrefs.length; i++ ) {
        css.replaceClass( hrefs.get( i ), "expanded", "collapsed" );
    }
    if ( hrefObj ) {
        css.addClass( hrefObj, "expanded" );
    }
}
