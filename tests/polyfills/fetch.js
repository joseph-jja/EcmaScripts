// basic fetch for jsdom tests
// right now only supporting GET
window.fetch = function ( url ) {

    return new Promise( resolve => {
        const xmlhttp = new window.XMLHttpRequest();

        xmlhttp.open( 'GET', url, async );

        xmlhttp.onreadystatechange = function () {
            // the call asigns this callback to our ajax object
            // so the call can use this in it
            if ( xmlhttp.readyState === 4 ) {
                resolve( xmlhttp.response );
            }
        };
        xmlhttp.send();
    } );

};

