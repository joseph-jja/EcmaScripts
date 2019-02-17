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
    this.version = version;
    const self = this;

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
        this.createObjectStore( name, store, callback );
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
};

SQLQuery.prototype.createObjectStore = function ( name, store, callback ) {
    const request = this.iDB.createObjectStore( store, {
        keypath: 'id'
    } );
    processRequest( this, request, callback );
};

SQLQuery.prototype.destroyDB = function () {

};

SQLQuery.prototype.add = function ( storeName, data, callback ) {
    var self = this;
    this.open( this.name, storeName, this.version, function ( evt, err ) {
        const db = evt.target.result;
        if ( err === Constants.DB_SUCCESS ) {
            const request = getObjectStore( db, storeName, "readwrite" ).add( data );
            processRequest( self, request, callback );
        } else {
            callback( evt, Constants.DB_ERROR );
        }
    } );
};

// callback gets the object data and success for fail
SQLQuery.prototype.fetch = function ( storeName, key, callback ) {
    var self = this;
    this.open( this.name, storeName, this.version, function ( evt, err ) {
        self.iDB = evt.target.result;
        if ( err === Constants.DB_SUCCESS ) {
            const request = getObjectStore( self.iDB, storeName, "readonly" ).get( key );
            processRequest( self, request, callback );
        } else {
            callback( evt, Constants.DB_ERROR );
        }
    } );
};

// update gets and then updates
SQLQuery.prototype.update = function ( storeName, key, data, callback ) {
    var self = this;
    this.open( this.name, storeName, this.version, function ( evt, err ) {
        self.iDB = evt.target.result;
        if ( err === Constants.DB_SUCCESS ) {
            const request = getObjectStore( self.iDB, storeName, "readonly" ).get( key );
            processRequest( self, request, function ( revt, status ) {
                const urequest = getObjectStore( self.iDB, storeName, "readwrite" ).put( data );
                processRequest( self, urequest, callback );
            } );
        } else {
            callback( evt, Constants.DB_ERROR );
        }
    } );
};

SQLQuery.prototype.remove = function ( storeName, key, callback ) {
    var self = this;
    this.open( this.name, storeName, this.version, function ( evt, err ) {
        self.iDB = evt.target.result;
        if ( err === Constants.DB_SUCCESS ) {
            /* jshint -W024 */
            const request = getObjectStore( self.iDB, storeName, "readwrite" ).delete( key );
            processRequest( self, request, callback );
        } else {
            callback( evt, Constants.DB_ERROR );
        }
    } );
};

SQLQuery.prototype.list = function ( storeName, callback ) {
    var self = this;
    this.open( this.name, storeName, this.version, function ( evt, status ) {
        if ( status === Constants.DB_SUCCESS ) {
            const db = evt.target.result;
            const lb = window.IDBKeyRange.lowerBound( 0 );

            const store = db.transaction( storeName ).objectStore( storeName );
            store.openCursor( lb ).onsuccess = function ( osevt ) {
                let data = [];
                const cursor = osevt.target.result;
                if ( cursor ) {
                    data.push( {
                        'key': cursor.key,
                        'value': cursor.value
                    } );
                    // since contunue is part of indexedb we need to skip this error
                    /* jshint -W024 */
                    cursor.continue();
                } else {
                    callback( data );
                }
            };
        }
    } );
};

export default SQLQuery;
