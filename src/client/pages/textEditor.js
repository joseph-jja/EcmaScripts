import selector from 'client/dom/selector';
import * as events from 'client/dom/events';
import * as dom from 'client/dom/DOM';

// components
import * as file from 'client/file/loadFile';
import footer from 'client/components/footer';
import * as menu from 'client/components/menu';

function doOnLoadStuff() {

    menu.basicMenu();
    footer( 'footer' );

    let uploadFileObj = selector( "#upload-file" ).get( 0 );

    events.addEvent( uploadFileObj, "change", ( e ) => {
        return file.selectFile( e, function ( data ) {
            dom.html( '#text-editor-id', data );
            uploadFileObj.value = '';
        } );
    }, false );
}

events.addOnLoad( doOnLoadStuff );
