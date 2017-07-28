import selector from 'client/dom/selector';
import * as events from 'client/dom/events';

// components
import * as file from 'client/file/loadFile';
import footer from 'client/components/footer';
import * as menu from 'client/components/menu';

function doOnLoadStuff() {

    menu.basicMenu();
    footer( 'footer' );

    let uploadFileObj = document.getElementById( 'upload-file' );

    function selectFile( evt, callback ) {

        if ( !evt.target || !evt.target.files ) {
            return;
        }

        // FileList object
        let files = evt.target.files;

        // files is a FileList of File objects. List some properties.
        // but we should only have one, the selected one
        let filename = ( files.length === 1 ? files[ 0 ] : undefined );
        if ( !filename ) {
            return;
        }
        let reader = new FileReader();
        reader.onload = ( ( fileObj ) => {
            return ( e ) => {
                callback( e.target.result )
            };
        } )( filename );
        reader.readAsText( filename );
    }

    uploadFileObj.addEventListener( 'change', ( e ) => {
        selectFile( e, function ( data ) {
            document.getElementById( 'text-editor-id' ).innerHTML = data;
            uploadFileObj.value = '';
        } );
    }, false );


}

events.addOnLoad( doOnLoadStuff );
