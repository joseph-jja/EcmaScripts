function handleFileSelect(evt) {

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
    reader.onload = ( fileData ) {
        
    };
  }
  
  export { 
    handleFileSelect;
  };
