function parseUrl( requestUrl ) {
    let parsedUrl;
    const i = requestUrl.indexOf( '?' );
    if ( i > -1 ) {
        parsedUrl = {
            pathname: requestUrl.substring( 0, i ),
            searchParams: querystring.parse( requestUrl.substring( i + 1 ) )
        };
    } else {
        parsedUrl = {
            pathname: requestUrl,
            searchParams: ''
        };
    }
    return parsedUrl;
}

module.exports = {
    parseUrl
};
