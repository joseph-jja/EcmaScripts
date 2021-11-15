import * as Constants from 'db/constants';

// DRY the code
export function getObjectStore( db, storeName, mode = 'readonly', txCompletedHandler ) {
    const tx = db.transaction( storeName, mode );
    if ( typeof txCompletedHandler === 'function' ) {
        tx.oncomplete = txCompletedHandler;
    } else {
        tx.oncomplete = function ( evt ) {
            console.log( 'Transaction completed!' );
        };
    }
    tx.onerror = function ( evt ) {
        console.log( `Transaction error: ${tx.error}` );
    };
    return tx.objectStore( storeName );
}

// DRY the code with a promisified version
export async function pProcessRequest(request) {

    request.onerror = function ( evt ) {
        Promise.reject({
            evt,
            status: Constants.DB_ERROR
        });
    };

    request.onsuccess = function ( evt ) {
        Promise.resolve({
            evt,
            status: Constants.DB_SUCCESS
        });
    };
}

// DRY the code
export function processRequest(request, callback ) {

    request.onerror = function ( evt ) {
        callback( evt, Constants.DB_ERROR );
    };

    request.onsuccess = function ( evt ) {
        callback( evt, Constants.DB_SUCCESS );
    };
}
