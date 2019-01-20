// wrapper around fetch 

async function fetcher( url ) {
    const response = await fetch( url );
    const buff = await response.text();
    return buff;
}

export default fetcher;
