// wrapper around fetch 

async function fetcher(url, options) {
    const response = await fetch(url, options);
    const buff = await response.text();
    return buff;
}

export default fetcher;