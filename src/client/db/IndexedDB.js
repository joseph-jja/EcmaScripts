const DB_SUCCESS = 200,
    DB_ERROR = 500;

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
}

// DRY the code
function getObjectStore( db, storeName, mode ) {
    const tx = db.transaction( storeName, mode );
    return tx.objectStore( storeName );
}

// DRY the code
function processRequest( self, request, callback ) {

    request.onerror = function ( evt ) {
        callback( evt, DB_ERROR );
    };

    request.onsuccess = function ( evt ) {
        callback( evt, DB_SUCCESS );
    };
}

SQLQuery.prototype.open = function ( name, version, callback ) {
    const iDB = window.indexedDB.open( name, version );

    this.name = name;
    this.version = version;
    let self = this;

    iDB.onerror = function ( evt ) {
        callback( evt, DB_ERROR );
    };

    iDB.onsuccess = function ( evt ) {
        const db = evt.target.result;
        self.isOpen = true;
        callback( evt, DB_SUCCESS );
        self.iDB = db;
    };

    iDB.onupgradeneeded = function ( evt ) {
        const db = evt.target.result;
        callback( evt, DB_SUCCESS );
        self.iDB = db;
    };
};

SQLQuery.prototype.close = function () {
    if ( this.isOpen ) {
        this.iDB.close();
    }
};

// open and create do the same thing :/
SQLQuery.prototype.createDB = function ( name, version, callback ) {
    this.open( name, version, callback );
};

SQLQuery.prototype.createObjectStore = function ( name, keypath, callback ) {
    const request = this.iDB.createObjectStore( name, keypath );
    processRequest( this, request, callback );
};

SQLQuery.prototype.destroyDB = function () {

};

SQLQuery.prototype.add = function ( storeName, data, callback ) {
    var self = this;
    this.open( this.name, this.version, function ( evt, err ) {
        const db = evt.target.result;
        if ( err === DB_SUCCESS ) {
            const request = getObjectStore( db, storeName, "readwrite" ).add( data );
            processRequest( self, request, callback );
        } else {
            callback( evt, DB_ERROR );
        }
    } );
};

// callback gets the object data and success for fail
SQLQuery.prototype.fetch = function ( storeName, key, callback ) {
    var self = this;
    this.open( this.name, this.version, function ( evt, err ) {
        self.iDB = evt.target.result;
        if ( err === DB_SUCCESS ) {
            const request = getObjectStore( self.iDB, storeName, "readonly" ).get( key );
            processRequest( self, request, callback );
        } else {
            callback( evt, DB_ERROR );
        }
    } );
};

// update gets and then updates
SQLQuery.prototype.update = function ( storeName, key, data, callback ) {
    var self = this;
    this.open( this.name, this.version, function ( evt, err ) {
        self.iDB = evt.target.result;
        if ( err === DB_SUCCESS ) {
            const request = getObjectStore( self.iDB, storeName, "readonly" ).get( key );
            processRequest( self, request, function ( revt, status ) {
                const urequest = getObjectStore( self.iDB, storeName, "readwrite" ).put( data );
                processRequest( self, urequest, callback );
            } );
        } else {
            callback( evt, DB_ERROR );
        }
    } );
};

SQLQuery.prototype.remove = function ( storeName, key, callback ) {
    var self = this;
    this.open( this.name, this.version, function ( evt, err ) {
        self.iDB = evt.target.result;
        if ( err === DB_SUCCESS ) {
            /* jshint -W024 */
            const request = getObjectStore( self.iDB, storeName, "readwrite" ).delete( key );
            processRequest( self, request, callback );
        } else {
            callback( evt, DB_ERROR );
        }
    } );
};

SQLQuery.prototype.list = function ( storeName, callback ) {
    var self = this;
    this.open( this.name, this.version, function ( evt, status ) {
        if ( status === DB_SUCCESS ) {
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
