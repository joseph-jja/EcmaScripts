// your event callback for the file upload input field would call this
// first argument is the event 
// second argument is the callback to call that will be in the format of callback( data );
function selectFile(evt, callback) {

    if ( ! evt.target || evt.target.files ) { 
        return;
    }
    
    // FileList object
    let files = evt.target.files; 
    
    // files is a FileList of File objects. List some properties.
    // but we should only have one, the selected one
    let filename = ( files.length === 1 ? files[0] : undefined );
    if ( ! filename ) { 
        return;     
    }
    let reader = new FileReader();
    reader.onload = callback;
    reader.readAsText(filename);
  }
  
  export { 
    selectFile;
  };
