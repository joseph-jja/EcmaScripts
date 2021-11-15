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
        this.usePromises = false;
    }

    hasIndexedDBSuppor() {
        return ( typeof window.indexedDB !== 'undefined' );
    }
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
        this.createObjectStore( this.store ).then( res => {
            callback( res.evt, res.status );
        } ).catch( err => {
            callback( err.evt, err.status );
        } );
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

SQLQuery.prototype.createObjectStore = function ( store ) {
    const request = this.iDB.createObjectStore( store, {
        keypath: 'id',
        autoIncrement: true
    } );
    return processRequest.call( this, request );
};

SQLQuery.prototype.destroyDB = function ( dbName ) {
    // TODO implement?
    window.indexedDB.deleteDatabase( dbName );
};

SQLQuery.prototype.openCallback = function ( storeName, successHandler, errorHandler ) {
    if ( this.isOpen ) {
        successHandler();
    } else {
        this.open( this.name, storeName, this.version, ( evt, status ) => {
            this.iDB = evt.target.result;
            if ( status === Constants.DB_SUCCESS ) {
                successHandler();
            } else {
                errorHandler( evt, Constants.DB_ERROR );
            }
        } );
    }
};

SQLQuery.prototype.clear = function ( storeName, callback ) {
    const clearTransaction = () => {
        const cbWrapper = ( evt, err ) => {
            console.log( 'Callback ' + err );
        };
        const request = getObjectStore( this.iDB, storeName, "readwrite", callback ).clear();
        processRequest.call( this, request ).then( res => {
            cbWrapper( res.evt, res.status );
        } ).catch( err => {
            cbWrapper( err.evt, err.status );
        } );
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
            processRequest.call( this, request ).then( res => {
                callback( res.evt, res.status );
            } ).catch( err => {
                callback( err.evt, err.status );
            } );
        } else {
            const request = getObjectStore( this.iDB, storeName, "readwrite" ).add( data );
            processRequest.call( this, request ).then( res => {
                callback( res.evt, res.status );
            } ).catch( err => {
                callback( err.evt, err.status );
            } );
        }
    };
    this.openCallback( storeName, addTransaction, callback );
};

// callback gets the object data and success for fail
SQLQuery.prototype.fetch = function ( storeName, key, callback ) {
    const fetchTransaction = () => {
        const request = getObjectStore( this.iDB, storeName, "readonly" ).get( key );
        processRequest.call( this, request ).then( res => {
            callback( res.evt, res.status );
        } ).catch( err => {
            callback( err.evt, err.status );
        } );
    };
    this.openCallback( storeName, fetchTransaction, callback );
};

// update gets and then updates
SQLQuery.prototype.update = function ( storeName, key, data, callback ) {
    const updateTransaction = () => {
        const request = getObjectStore( this.iDB, storeName, "readwrite" ).put( data, key );
        processRequest.call( this, request ).then( res => {
            callback( res.evt, res.status );
        } ).catch( err => {
            callback( err.evt, err.status );
        } );
    };
    this.openCallback( storeName, updateTransaction, callback );
};

SQLQuery.prototype.remove = function ( storeName, key, callback ) {
    const removeTransaction = () => {
        const request = getObjectStore( this.iDB, storeName, "readwrite" ).delete( key );
        processRequest.call( this, request ).then( res => {
            callback( res.evt, res.status );
        } ).catch( err => {
            callback( err.evt, err.status );
        } );
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
