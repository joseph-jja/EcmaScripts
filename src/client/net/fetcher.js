// wrapper around fetch 

// and this makes using the BufferDecoder easier a bit
const BufferDecoder = new TextDecoder("ascii", { ignoreBOM: false });

// FIXME or FINISH-ME :P
function fetcher( url ) {
    return fetch(url).then ( response => {
        const reader = response.body.getReader();

        const dataConverter = ({ done, value }) => {
            if ( value ) {
                const data = BufferDecoder.decode(new Int8Array(value));
                results += data;
                return reader.read().then(dataConverter);
            }
            // Is there no more data to read?
            if (done) {
              // Tell the browser that we have finished sending data
              // resolve this and return data ? as we have results :/
              return;
            }
        };
        
        return reader.read().then(dataConverter).then( r => { console.log(r); });
    });
}
