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

    uploadFileObj.addEventListener( 'change', ( e ) => {
        file.selectFile( e, function ( data ) {
            document.getElementById( 'text-editor-id' ).innerHTML = data;
            uploadFileObj.value = '';
        } );
    }, false );


}

events.addOnLoad( doOnLoadStuff );
