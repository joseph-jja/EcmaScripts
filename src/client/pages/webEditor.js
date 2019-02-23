import selector from 'client/dom/selector';
import * as events from 'client/dom/events';
import * as dom from 'client/dom/DOM';

// components
import fetcher from 'client/net/fetcher';

function doOnLoadStuff() {

    fetcher( '/' )
        .then( ( data ) => {
            const ulList = selector( '.filelist ul' ).get( 0 );
            ulList.innerHTML = data;
        } ).catch( ( err ) => {
            console.log( err );
        } );

    const fileList = selector( '.filelist' ).get( 0 );
    events.addEvent( fileList, 'click', ( e ) => {

        const tgt = events.getTarget( e );

        const nname = tgt.nodeName.toLowerCase();
        if ( nname === 'li' ) {
            fetcher( `/${tgt.innerHTML}` )
                .then( ( data ) => {
                    if ( tgt.className.indexOf( 'dir_type' ) > -1 ) {
                        dom.html( '.filelist ul', data );
                    } else {
                        dom.html( '#text-editor-box', data );
                        dom.html( '#filename', tgt.innerHTML );
                    }
                    //console.log( data );
                } ).catch( ( err ) => {
                    console.log( err );
                } );
        }
    } );

    const saveFileButton = document.getElementById( 'saveFile' );
    events.addEvent( saveFileButton, 'click', ( e ) => {
        const tgt = events.getTarget( e );

        const nname = tgt.nodeName.toLowerCase();
        if ( nname === 'button' ) {
            const fileToSave = dom.html( '#filename' );
            if ( fileToSave ) {
                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'text/plain'
                    },
                    body: JSON.stringify( dom.html( '#text-editor-box' ) )
                };

                fetcher( `/${fileToSave}?saveFile=${fileToSave}`, options )
                    .then( ( data ) => {
                        console.log( 'success' );
                        console.log( data );
                    } ).catch( ( err ) => {
                        console.log( err );
                    } );

                console.log( 'do something' );
            }
        }
    } );
};

events.addOnLoad( doOnLoadStuff );
