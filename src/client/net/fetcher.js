// wrapper around fetch 

function fetcher( url ) {
    return fetch( url ).then( response => {
        return response.text().then( buf => {
            return buf;
        } );
    } );
}


export { 
    fetcher
};

