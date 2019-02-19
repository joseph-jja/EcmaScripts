import selector from 'client/dom/selector';
import * as events from 'client/dom/events';
import * as dom from 'client/dom/DOM';

// components
import fetcher from 'client/net/fetcher';

function doOnLoadStuff() {

    const fileList = selector( '.filelist' ).get( 0 );

    events.addEvent( fileList, 'click', ( e ) => {

        const tgt = events.getTarget( e );

        const nname = tgt.nodeName.toLowerCase();
        if ( nname === 'li' ) {
            fetcher( tgt.innerHTML )
                .then( ( data ) => {
                    console.log( data );
                } ).catch( ( err ) => {
                    console.log( err );
                } );
        }
    } );
};

events.addOnLoad( doOnLoadStuff );
