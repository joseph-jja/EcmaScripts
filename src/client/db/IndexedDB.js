import {
    getObjectStore,
    processRequest
} from 'client/db/IndexedDBUtils';

import * as Constants from 'db/constants';

function SQLQuery( name ) {
    this.isOpen = false;
    if ( typeof name !== 'undefined' ) {
        this.name = name;
    }
    this.version = 1;
    this.iDB = undefined;
};

SQLQuery.prototype.hasIndexedDBSupport = function () {
    return ( typeof window.indexedDB !== 'undefined' );
};

SQLQuery.prototype.open = function ( name, store, version, callback ) {
    const iDB = window.indexedDB.open( name, version );

    this.name = name;
    this.store = store;
    this.version = version;

    iDB.onerror = ( evt ) => {
        callback( evt, Constants.DB_ERROR );
    };

    iDB.onsuccess = ( evt ) => {
        this.iDB = evt.target.result;
        this.isOpen = true;
        callback( evt, Constants.DB_SUCCESS );
    };

    iDB.onupgradeneeded = ( evt ) => {
        this.iDB = evt.target.result;
        this.createObjectStore( this.store, callback );
    };
};

SQLQuery.prototype.close = function () {
    if ( this.isOpen ) {
        this.iDB.close();
    }
};

// open and create do the same thing :/
SQLQuery.prototype.createDB = function ( name, store, version, callback ) {
    this.open( name, store, version, callback );
    this.close();
};

SQLQuery.prototype.createObjectStore = function ( store, callback ) {
    const request = this.iDB.createObjectStore( store, {
        keypath: 'id',
        autoIncrement: true
    } );
    processRequest( this, request, callback );
};

SQLQuery.prototype.destroyDB = function ( dbName ) {
    // TODO implement?
    window.indexedDB.deleteDatabase( dbName );
};

SQLQuery.prototype.clear = function ( storeName, callback ) {
    const clearTransaction = () => {
        let cbCalled = false;
        const cbWrapper = ( evt, err ) => {
            if ( !cbCalled ) {
                callback( evt, err );
                cbCalled = true;
            }
        };
        const request = getObjectStore( this.iDB, storeName, "readwrite", cbWrapper ).clear();
        processRequest( this, request, cbWrapper );
    };
    if ( this.isOpen ) {
        clearTransaction();
    } else {
        this.open( this.name, storeName, this.version, ( evt, status ) => {
            this.iDB = evt.target.result;
            if ( status === Constants.DB_SUCCESS ) {
                clearTransaction();
            } else {
                callback( evt, Constants.DB_ERROR );
            }
        } );
    }
};

// callback gets the object data and success for fail
SQLQuery.prototype.add = function ( storeName, data, callback ) {
    const addTransaction = () => {
        const request = getObjectStore( this.iDB, storeName, "readwrite" ).add( data );
        processRequest( this, request, callback );
    };
    if ( this.isOpen ) {
        addTransaction();
    } else {
        this.open( this.name, storeName, this.version, ( evt, status ) => {
            this.iDB = evt.target.result;
            if ( status === Constants.DB_SUCCESS ) {
                addTransaction();
            } else {
                callback( evt, Constants.DB_ERROR );
            }
        } );
    }
};

// callback gets the object data and success for fail
SQLQuery.prototype.fetch = function ( storeName, key, callback ) {
    const fetchTransaction = () => {
        const request = getObjectStore( this.iDB, storeName, "readonly" ).get( key );
        processRequest( this, request, callback );
    };
    if ( this.isOpen ) {
        fetchTransaction();
    } else {
        this.open( this.name, storeName, this.version, ( evt, status ) => {
            this.iDB = evt.target.result;
            if ( status === Constants.DB_SUCCESS ) {
                fetchTransaction();
            } else {
                callback( evt, Constants.DB_ERROR );
            }
        } );
    }
};

// update gets and then updates
SQLQuery.prototype.update = function ( storeName, key, data, callback ) {
    const updateTransaction = () => {
        const request = getObjectStore( this.iDB, storeName, "readwrite" ).put( data, key );
        processRequest( this, request, callback );
    };
    if ( this.isOpen ) {
        updateTransaction();
    } else {
        this.open( this.name, storeName, this.version, ( evt, status ) => {
            this.iDB = evt.target.result;
            if ( status === Constants.DB_SUCCESS ) {
                updateTransaction();
            } else {
                callback( evt, Constants.DB_ERROR );
            }
        } );
    }
};

SQLQuery.prototype.remove = function ( storeName, key, callback ) {
    const removeTransaction = () => {
        const request = getObjectStore( this.iDB, storeName, "readwrite" ).delete( key );
        processRequest( this, request, callback );
    };
    if ( this.isOpen ) {
        removeTransaction();
    } else {
        this.open( this.name, storeName, this.version, ( evt, err ) => {
            this.iDB = evt.target.result;
            if ( err === Constants.DB_SUCCESS ) {
                removeTransaction();
            } else {
                callback( evt, Constants.DB_ERROR );
            }
        } );
    }
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
    if ( this.isOpen ) {
        listTransaction();
    } else {
        this.open( this.name, storeName, this.version, ( evt, status ) => {
            if ( status === Constants.DB_SUCCESS ) {
                this.iDB = evt.target.result;
                listTransaction();
            }
        } );
    }
};

export default SQLQuery;
