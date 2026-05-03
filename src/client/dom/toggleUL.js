import {
    hasClass,
    replaceClass,
    addClass
} from '/js/client/dom/CSS';
import {
    byId,
    queryAll
} from '/js/client/dom/shortcuts';

const HIDDEN_CLASS = 'tree_child_hidden';
const COLLAPSED_CLASS = 'collapsed';
const EXPANDED_CLASS = 'expanded';
const TOP_LEVEL_SELECTOR = 'span.toplevel';

export default function toggleUL( objName, hrefObj ) {

    queryAll(`ul.${HIDDEN_CLASS}`).forEach(ul => {
        ul.style.display = 'none';
    });

    const dObj = byId( objName );
    if ( dObj ) {
        dObj.style.display = dObj.style.display === 'block' ? 'none' : 'block';
    }

    queryAll(TOP_LEVEL_SELECTOR).forEach(span => {
        replaceClass(span, EXPANDED_CLASS, COLLAPSED_CLASS);
    });

    if ( hrefObj ) {
        addClass( hrefObj, 'expanded' );
    }
}
