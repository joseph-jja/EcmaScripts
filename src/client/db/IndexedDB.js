class SQLQuery {

    constructor( name ) {
        this.isOpen = false;
        if ( typeof name !== 'undefined' ) {
            this.name = name;
        }
        this.version = 1;
        this.iDB = undefined;
    }

    hasIndexedDBSuppor() {
        return ( typeof window.indexedDB !== 'undefined' );
    }

    close() {
        if ( this.isOpen ) {
            this.iDB.close();
        }
    }

    async createObjectStore( store ) {
        const request = this.iDB.createObjectStore( store, {
            keypath: 'id',
            autoIncrement: true
        } );
        return processRequest.call( this, request );
    }

    destroyDB( dbName ) {
        // TODO implement?
        window.indexedDB.deleteDatabase( dbName );
    }
};

SQLQuery.DB_SUCCESS = 200;
SQLQuery.DB_ERROR = 500;

// DRY the code
function getObjectStore( db, storeName, mode = 'readonly', txCompletedHandler ) {
    const tx = db.transaction( storeName, mode );
    if ( typeof txCompletedHandler === 'function' ) {
        tx.oncomplete = txCompletedHandler;
    } else {
        tx.oncomplete = function ( evt ) {
            console.log( 'Transaction completed!', evt );
        };
    }
    tx.onerror = function ( evt ) {
        console.log( `Transaction error: ${tx.error}`, evt );
    };
    return tx.objectStore( storeName );
}

// DRY the code with a promisified version
function processRequest( request, callback ) {

    request.onerror = function ( evt ) {
        callback( evt, SQLQuery.DB_ERROR );
    };

    request.onsuccess = function ( evt ) {
        callback( evt, SQLQuery.DB_SUCCESS );
    };
}

SQLQuery.prototype.open = function ( name, store, version ) {
    return new Promise( ( resolve, reject ) => {

        const openHandler = ( evt, status ) => {
            if ( status === SQLQuery.DB_ERROR ) {
                reject( {
                    evt,
                    status
                } );
            } else {
                resolve( {
                    evt,
                    status
                } );
            }
        };

        const iDB = window.indexedDB.open( name, version );

        this.name = name;
        this.store = store;
        this.version = version;

        iDB.onerror = ( evt ) => {
            openHandler( evt, SQLQuery.DB_ERROR );
        };

        iDB.onsuccess = ( evt ) => {
            this.iDB = (evt || {})[('target' || {})].result;
            this.isOpen = true;
            openHandler( evt, SQLQuery.DB_SUCCESS );
        };
        iDB.onupgradeneeded = ( evt ) => {
            this.iDB = (evt || {})[('target' || {})].result;
            if (!this.iDB) {
                openHandler( evt, SQLQuery.DB_ERROR);
                return;
            }
            this.createObjectStore( this.store ).then( res => {
                openHandler( res.evt, res.status );
            } ).catch( err => {
                openHandler( err.evt, err.status );
            } );
        };
    } );
};

// open and create do the same thing :/
SQLQuery.prototype.createDB = function ( name, store, version, callback ) {
    this.open( name, store, version ).then( res => {
        callback( res.evt, res.status );
        this.close();
    } ).catch( err => {
        callback( err.evt, err.status );
        this.close();
    } );
};

SQLQuery.prototype.openHandler = function ( storeName, successHandler, errorHandler ) {
    if ( this.isOpen ) {
        successHandler();
    } else {
        this.open( this.name, storeName, this.version ).then( res => {
            this.iDB = res.evt.target.result;
            if ( res.status === SQLQuery.DB_SUCCESS ) {
                successHandler();
            } else {
                errorHandler( res.evt, SQLQuery.DB_ERROR );
            }
        } ).catch( err => {
            errorHandler( err.evt, SQLQuery.DB_ERROR );
        } );
    }
};

SQLQuery.prototype.clear = function ( storeName, callback ) {
    const clearTransaction = () => {
        const request = getObjectStore( this.iDB, storeName, "readwrite" ).clear();
        processRequest( request, callback );
    };
    this.openHandler( storeName, clearTransaction, callback );
};

// callback gets the object data and success for fail
SQLQuery.prototype.add = function ( storeName, data, callback ) {
    const addTransaction = () => {
        if ( data.key ) {
            const key = data.key;
            const ndata = Object.assign( {}, data );
            delete ndata.key;
            const request = getObjectStore( this.iDB, storeName, "readwrite" ).add( data, key );
            processRequest( request, callback );
        } else {
            const request = getObjectStore( this.iDB, storeName, "readwrite" ).add( data );
            processRequest( request, callback );
        }
    };
    this.openHandler( storeName, addTransaction, callback );
};

// callback gets the object data and success for fail
SQLQuery.prototype.fetch = function ( storeName, key, callback ) {
    const fetchTransaction = () => {
        const request = getObjectStore( this.iDB, storeName, "readonly" ).get( key );
        processRequest( request, callback );
    };
    this.openHandler( storeName, fetchTransaction, callback );
};

// update gets and then updates
SQLQuery.prototype.update = function ( storeName, key, data, callback ) {
    const updateTransaction = () => {
        const request = getObjectStore( this.iDB, storeName, "readwrite" ).put( data, key );
        processRequest( request, callback );
    };
    this.openHandler( storeName, updateTransaction, callback );
};

SQLQuery.prototype.remove = function ( storeName, key, callback ) {
    const removeTransaction = () => {
        const request = getObjectStore( this.iDB, storeName, "readwrite" ).delete( key );
        processRequest( request, callback );
    };
    this.openHandler( storeName, removeTransaction, callback );
};

SQLQuery.prototype.list = function ( storeName, callback ) {
    const listTransaction = () => {
        const lb = window.IDBKeyRange.lowerBound( 0 );

        const store = getObjectStore( this.iDB, storeName, "readonly" );
        const data = [];
        store.openCursor( lb ).onsuccess = function ( osevt ) {
            const cursor = osevt.target.result;
            if ( cursor ) {
                data.push( {
                    'key': cursor.key,
                    'value': cursor.value
                } );
                // since contunue is part of indexedb we need to skip this error
                cursor.continue();
            } else {
                callback( data );
            }
        };
    };
    this.openHandler( storeName, listTransaction, callback );
};

export default SQLQuery;
