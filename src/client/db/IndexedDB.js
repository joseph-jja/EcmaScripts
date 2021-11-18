import {
    getObjectStore,
    processRequest
} from 'client/db/IndexedDBUtils';

import * as Constants from 'db/constants';

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

SQLQuery.prototype.openWithCallback = function ( name, store, version, callback ) {
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
        this.createObjectStore( this.store ).then( res => {
            callback( res.evt, res.status );
        } ).catch( err => {
            callback( err.evt, err.status );
        } );
    };
};

SQLQuery.prototype.open = function ( name, store, version ) {
    return new Promise((resolve, reject) => {
        this.openWithCallback( name, store, version, (evt, status) => {
            if (status === Constants.DB_ERROR) {
                reject({
                    evt,
                    status
                });
            } else {
                resolve({
                    evt,
                    status
                });
            }
        });
    });
};

// open and create do the same thing :/
SQLQuery.prototype.createDB = function ( name, store, version, callback ) {
    this.open( name, store, version ).then(res => {
        callback(res.evt, res.status);
    }).catch( err =>{
        callback(err.evt, err.status);
    } );
    this.close();
};

SQLQuery.prototype.openCallback = function ( storeName, successHandler, errorHandler ) {
    if ( this.isOpen ) {
        successHandler();
    } else {
        this.open( this.name, storeName, this.version ).then(res => {
            this.iDB = res.evt.target.result;
            if ( res.status === Constants.DB_SUCCESS ) {
                successHandler();
            } else {
                errorHandler( res.evt, Constants.DB_ERROR );
            }
        } ).catch(err => {
            errorHandler( err.evt, Constants.DB_ERROR );
        });
    }
};

SQLQuery.prototype.clear = function ( storeName, callback ) {
    const clearTransaction = () => {
        const request = getObjectStore( this.iDB, storeName, "readwrite" ).clear();
        processRequest( request, callback );
    };
    this.openCallback( storeName, clearTransaction, callback );
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
    this.openCallback( storeName, addTransaction, callback );
};

// callback gets the object data and success for fail
SQLQuery.prototype.fetch = function ( storeName, key, callback ) {
    const fetchTransaction = () => {
        const request = getObjectStore( this.iDB, storeName, "readonly" ).get( key );
        processRequest( request, callback );
    };
    this.openCallback( storeName, fetchTransaction, callback );
};

// update gets and then updates
SQLQuery.prototype.update = function ( storeName, key, data, callback ) {
    const updateTransaction = () => {
        const request = getObjectStore( this.iDB, storeName, "readwrite" ).put( data, key );
        processRequest( request, callback );
    };
    this.openCallback( storeName, updateTransaction, callback );
};

SQLQuery.prototype.remove = function ( storeName, key, callback ) {
    const removeTransaction = () => {
        const request = getObjectStore( this.iDB, storeName, "readwrite" ).delete( key );
        processRequest( request, callback );
    };
    this.openCallback( storeName, removeTransaction, callback );
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
    this.openCallback( storeName, listTransaction, callback );
};

export default SQLQuery;
