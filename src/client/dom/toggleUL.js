import {
    hasClass,
    replaceClass,
    addClass
} from '/js/client/dom/CSS';
import {
    byId,
    queryAll
} from '/js/client/dom/shortcuts';

export default function toggleUL( objName, hrefObj ) {

    const divs = document.getElementsByTagName( 'ul' );
    for ( let i = 0; i < divs.length; i++ ) {
        if ( hasClass( divs[ i ], 'tree_child_hidden' ) ) {
            divs[ i ].style.display = 'none';
        }
    }

    const dObj = byId( objName );
    if ( dObj ) {
        if ( dObj.style.display === 'block' ) {
            dObj.style.display = 'none';
        } else {
            dObj.style.display = 'block';
        }
    }

    const hrefs = Array.from( queryAll( 'span.toplevel' ) );
    for ( let i = 0; i < hrefs.length; i++ ) {
        replaceClass( hrefs[ i ], 'expanded', 'collapsed' );
    }
    if ( hrefObj ) {
        addClass( hrefObj, 'expanded' );
    }
}
