/* eslint class-methods-use-this: 0 */
class SQLQuery {

    constructor( name ) {
        this.isOpen = false;
        if ( typeof name !== 'undefined' ) {
            this.name = name;
        }
        this.version = 1;
        this.iDB = undefined;
    }

    getObjectStore( storeName, mode = 'readonly' ) {
        const tx = this.iDB.transaction( storeName, mode );
        tx.oncomplete = function ( evt ) {
            console.log( 'Transaction completed!', evt );
        };
        tx.onerror = function ( evt ) {
            console.error( `Transaction error: ${tx.error}`, evt );
        };
        return tx.objectStore( storeName );
    }

    processRequest( request ) {
        return new Promise((resolve, reject) => {
            request.onerror = function ( evt ) {
                reject( evt );
            };

            request.onsuccess = function ( evt ) {
                resolve( evt );
            };
        });
    }

    hasIndexedDBSupport() {
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
        return this.processRequest( request );
    }

    destroyDB( dbName ) {
        // TODO implement?
        window.indexedDB.deleteDatabase( dbName );
    }
}

SQLQuery.DB_SUCCESS = 200;
SQLQuery.DB_ERROR = 500;

SQLQuery.prototype.open = function ( name, store, version ) {
    return new Promise( ( resolve, reject ) => {

        const promiseHandler = ( evt, status ) => {
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
            promiseHandler( evt, SQLQuery.DB_ERROR );
        };

        iDB.onsuccess = ( evt ) => {
            this.iDB = ( evt || {} )[ ( 'target' || {} ) ].result;
            this.isOpen = true;
            promiseHandler( evt, SQLQuery.DB_SUCCESS );
        };
        iDB.onupgradeneeded = ( evt ) => {
            this.iDB = ( evt || {} )[ ( 'target' || {} ) ].result;
            if ( !this.iDB ) {
                promiseHandler( evt, SQLQuery.DB_ERROR );
                return;
            }
            this.createObjectStore( this.store ).then( res => {
                promiseHandler( res.evt, res.status );
            } ).catch( err => {
                promiseHandler( err.evt, err.status );
            } );
        };
    } );
};

SQLQuery.prototype.openHandler = function ( storeName ) {
    return new Promise((resolve, reject) => {
        if ( this.isOpen ) {
            return resolve();
        } else {
            this.open( this.name, storeName, this.version ).then( res => {
                this.iDB = res.evt.target.result;
                if ( res.status === SQLQuery.DB_SUCCESS ) {
                    return resolve();
                } else {
                    return reject( res.evt );
                }
            } ).catch( err => {
                return reject( err.evt );
            } );
        }
    });
};

SQLQuery.prototype.clear = function ( storeName, callback ) {
    this.openHandler( storeName ).then(res => {
        const request = this.getObjectStore( storeName, 'readwrite' ).clear();
        this.processRequest( request ).then(evt => {
            callback(evt, SQLQuery.DB_SUCCESS);
        }).catch(evt => {
            callback(evt, SQLQuery.DB_ERROR);
        });
    }).catch(err => {
        callback(err, SQLQuery.DB_ERROR);
    });
};

// callback gets the object data and success for fail
SQLQuery.prototype.add = function ( storeName, data, callback ) {
    this.openHandler( storeName ).then(res => {
        if ( data.key ) {
            const key = data.key;
            const ndata = Object.assign( {}, data );
            delete ndata.key;
            const request = this.getObjectStore( storeName, 'readwrite' ).add( data, key );
            this.processRequest( request ).then(evt => {
                callback(evt, SQLQuery.DB_SUCCESS);
            }).catch(evt => {
                callback(evt, SQLQuery.DB_ERROR);
            });
        } else {
            const request = this.getObjectStore( storeName, 'readwrite' ).add( data );
            this.processRequest( request ).then(evt => {
                callback(evt, SQLQuery.DB_SUCCESS);
            }).catch(evt => {
                callback(evt, SQLQuery.DB_ERROR);
            });
        }
    }).catch(err => {
        callback(err, SQLQuery.DB_ERROR);
    });
};

// callback gets the object data and success for fail
SQLQuery.prototype.fetch = function ( storeName, key, callback ) {
    this.openHandler( storeName ).then(res => {
        const request = this.getObjectStore( storeName, 'readonly' ).get( key );
        this.processRequest( request ).then(evt => {
            callback(evt, SQLQuery.DB_SUCCESS);
        }).catch(evt => {
            callback(evt, SQLQuery.DB_ERROR);
        });
    }).catch(err => {
        callback(err, SQLQuery.DB_ERROR);
    });
};

// update gets and then updates
SQLQuery.prototype.update = function ( storeName, key, data, callback ) {
    this.openHandler( storeName ).then(res => {
        const request = this.getObjectStore( storeName, 'readwrite' ).put( data, key );
        this.processRequest( request ).then(evt => {
            callback(evt, SQLQuery.DB_SUCCESS);
        }).catch(evt => {
            callback(evt, SQLQuery.DB_ERROR);
        });
    }).catch(err => {
        callback(err, SQLQuery.DB_ERROR);
    });
};

SQLQuery.prototype.remove = function ( storeName, key, callback ) {
    this.openHandler( storeName ).then(res => {
        const request = this.getObjectStore( storeName, 'readwrite' ).delete( key );
        this.processRequest( request ).then(evt => {
            callback(evt, SQLQuery.DB_SUCCESS);
        }).catch(evt => {
            callback(evt, SQLQuery.DB_ERROR);
        });
    }).catch(err => {
        callback(err, SQLQuery.DB_ERROR);
    });
};

SQLQuery.prototype.list = function ( storeName, callback ) {
    this.openHandler( storeName ).then(res => {
        const lb = window.IDBKeyRange.lowerBound( 0 );

        const store = this.getObjectStore( storeName, 'readonly' );
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
    }).catch(err => {
        callback(err, SQLQuery.DB_ERROR);
    });
};

export default SQLQuery;
