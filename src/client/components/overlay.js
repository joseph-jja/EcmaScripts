import selector from 'client/dom/selector';
import * as css from 'client/dom/CSS';
import * as dom from 'client/dom/DOM';
import * as events from 'client/dom/events';

function createOverlay( options, content ) {

    const overlay = dom.createElement( 'div', document.body, {
        'id': options.id || 'overlay'
    } );

    if ( options.styles ) {
        Object.keys( options.styles ).forEach( key => {
            overlay.style[ key ] = options.styles[ key ];
        } );
    }

    if ( !overlay.style.width ) {
        overlay.style.width = '20em';
    }

    if ( !overlay.style.height ) {
        overlay.style.height = '4em';
    }

    if ( content ) {
        overlay.innerHTML = content;
    }

    return overlay;
}

export {
    createOverlay
};
