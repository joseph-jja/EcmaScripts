( function ( w, d ) {

    function typeCheck( o, s, input ) {
        return ( input instanceof o || ( typeof input ).toLowerCase() === s ) ? true : false;
    };

    if ( typeof define === 'function' && define.amd ) {
        // AMD  
        define( [], typeCheck );
    } else if ( typeof module !== 'undefined' && module.exports ) {
        // common JS
        module.exports = typeCheck;
    } else {
        // vanilla JS
        w.typeCheck = typeCheck;
    }

} )( window, document );