import * as Constants from 'db/constants';

// DRY the code
export function getObjectStore( db, storeName, mode = 'readonly' ) {
    const tx = db.transaction( storeName, mode );
    tx.oncomplete = function ( evt ) {
        console.log( 'Transaction completed!' );
    };
    tx.onerror = function ( evt ) {
        console.log( `Transaction error: ${tx.error}` );
    };
    return tx.objectStore( storeName );
}

// DRY the code with a promisified version
export async function processRequest( request ) {

    request.onerror = function ( evt ) {
        return Promise.reject( {
            evt,
            status: Constants.DB_ERROR
        } );
    };

    request.onsuccess = function ( evt ) {
        return Promise.resolve( {
            evt,
            status: Constants.DB_SUCCESS
        } );
    };
}
