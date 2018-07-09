// wrapper around fetch 

// and this makes using the BufferDecoder easier a bit
const BufferDecoder = new TextDecoder("ascii", { ignoreBOM: false });

// 
function fetcher( url ) {
    return fetch(url).then ( (response) => {
        const reader = response.body.getReader();
        let results = '';
        reader.read().then(({ done, value }) => {
            if ( value ) {
                const data = BufferDecoder.decode(new Int8Array(value));
                results += data;
            }
            // Is there no more data to read?
            if (done) {
              // Tell the browser that we have finished sending data
              return Promise.resolve(results);
            }
        });
    });
}
