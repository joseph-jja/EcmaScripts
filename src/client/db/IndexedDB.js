let SQLQuery;

    if ( typeof window.indexedDB !== 'undefined' ) {

        SQLQuery = function ( name ) {
            this.success = 200;
            this.error = 500;
            this.isOpen = false;
            if ( typeof name !== 'undefined' ) {
                this.name = name;
            }
            this.version = 1;
            this.iDB = undefined;
        };

        // DRY the code
        function getObjectStore( db, storeName, mode ) {
            const tx = db.transaction( storeName, mode );
            return tx.objectStore( storeName );
        }

        // DRY the code
        function processRequest( self, request, callback ) {

            request.onerror = function ( evt ) {
                callback( evt, self.error );
            };

            request.onsuccess = function ( evt ) {
                callback( evt, self.success );
            };
        }

        SQLQuery.prototype.open = function ( name, version, callback ) {
            var self, iDB = window.indexedDB.open( name, version );

            this.name = name;
            this.version = version;
            self = this;

            iDB.onerror = function ( evt ) {
                callback( evt, self.error );
            };

            iDB.onsuccess = function ( evt ) {
                var db = evt.target.result;
                self.isOpen = true;
                callback( evt, self.success );
                self.iDB = db;
            };

            iDB.onupgradeneeded = function ( evt ) {
                var db = evt.target.result;
                callback( evt, self.success );
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
            var request = this.iDB.createObjectStore( name, keypath );
            processRequest( this, request, callback );
        };

        SQLQuery.prototype.destroyDB = function () {

        };

        SQLQuery.prototype.add = function ( storeName, data, callback ) {
            var self = this;
            this.open( this.name, this.version, function ( evt, err ) {
                var request, db = evt.target.result;
                if ( err === self.success ) {
                    request = getObjectStore( db, storeName, "readwrite" ).add( data );
                    processRequest( self, request, callback );
                } else {
                    callback( evt, self.error );
                }
            } );
        };

        // callback gets the object data and success for fail
        SQLQuery.prototype.fetch = function ( storeName, key, callback ) {
            var self = this;
            this.open( this.name, this.version, function ( evt, err ) {
                var request;
                self.iDB = evt.target.result;
                if ( err === self.success ) {
                    request = getObjectStore( self.iDB, storeName, "readonly" ).get( key );
                    processRequest( self, request, callback );
                } else {
                    callback( evt, self.error );
                }
            } );
        };

        // update gets and then updates
        SQLQuery.prototype.update = function ( storeName, key, data, callback ) {
            var self = this;
            this.open( this.name, this.version, function ( evt, err ) {
                var request;
                self.iDB = evt.target.result;
                if ( err === self.success ) {
                    request = getObjectStore( self.iDB, storeName, "readonly" ).get( key );
                    processRequest( self, request, function ( revt, status ) {
                        var urequest = getObjectStore( self.iDB, storeName, "readwrite" ).put( data );
                        processRequest( self, urequest, callback );
                    } );
                } else {
                    callback( evt, self.error );
                }
            } );
        };

        SQLQuery.prototype.remove = function ( storeName, key, callback ) {
            var self = this;
            this.open( this.name, this.version, function ( evt, err ) {
                var request;
                self.iDB = evt.target.result;
                if ( err === self.success ) {
                    /* jshint -W024 */
                    request = getObjectStore( self.iDB, storeName, "readwrite" ).delete( key );
                    processRequest( self, request, callback );
                } else {
                    callback( evt, self.error );
                }
            } );
        };

        SQLQuery.prototype.list = function ( storeName, callback ) {
            var self = this;
            this.open( this.name, this.version, function ( evt, status ) {
                var db, store, lb, data = [];
                if ( status === self.success ) {
                    db = evt.target.result;
                    lb = window.IDBKeyRange.lowerBound( 0 );

                    store = db.transaction( storeName ).objectStore( storeName );
                    store.openCursor( lb ).onsuccess = function ( osevt ) {
                        var cursor = osevt.target.result;
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
    }

export SQLQuery;
