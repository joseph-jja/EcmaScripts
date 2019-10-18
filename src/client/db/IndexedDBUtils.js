import * as Constants from 'db/constants';

// DRY the code
export function getObjectStore( db, storeName, mode = 'readonly' ) {
    const tx = db.transaction( storeName, mode );
    return tx.objectStore( storeName );
}

// DRY the code
export function processRequest( self, request, callback ) {

    request.onerror = function ( evt ) {
        callback( evt, Constants.DB_ERROR );
    };

    request.onsuccess = function ( evt ) {
        callback( evt, Constants.DB_SUCCESS );
    };
}
