import * as ajax from 'client/net/ajax';
import SQLQuery from 'client/db/IndexedDB';
import Constants from 'db/constants';

const Task = {
        indexedDB: new SQLQuery( Constants.DBName ),
        defaults: {
            'completed': false,
            'work_date': new Date(),
            'short_description': '',
            'long_description': ''
        },
        sync: function ( method, model, options ) {
            var cb = function () {},
                data = {},
                self = this;
            if ( typeof options !== 'undefined' ) {
                if ( options[ 'id' ] ) {
                    self.set( {
                        'id': options[ 'id' ]
                    } );
                }
                if ( typeof options[ 'callback' ] !== 'undefined' ) {
                    cb = options.callback;
                }
            }
            if ( method === 'read' ) {
                this.indexedDB.fetch( Constants.StoreName, ( +this.get( 'id' ) ), function ( evt, err ) {
                    var result;
                    if ( err === self.indexedDB.success ) {
                        result = evt.target.result;
                        self.set( {
                            'completed': result[ 'completed' ],
                            'work_date': result[ 'work_date' ],
                            'short_description': result[ 'short_description' ],
                            'long_description': result[ 'long_description' ],
                            'id': result[ 'id' ]
                        } );

                        cb( result );
                    }
                    self.indexedDB.close();
                } );
            } else if ( method === 'create' ) {
                data[ "work_date" ] = this.get( 'work_date' );
                data[ "short_description" ] = this.get( "short_description" );
                data[ "long_description" ] = this.get( "long_description" );
                data[ "completed" ] = this.get( "completed" );

                this.indexedDB.add( Constants.StoreName, data, function ( evt, err ) {
                    cb( evt, err );
                    console.log( evt );
                } );
            } else if ( method === 'update' ) {
                data[ "work_date" ] = this.get( 'work_date' );
                data[ "short_description" ] = this.get( "short_description" );
                data[ "long_description" ] = this.get( "long_description" );
                data[ "completed" ] = this.get( "completed" );
                data[ 'id' ] = ( +this.get( 'id' ) );

                this.indexedDB.update( Constants.StoreName, ( +this.get( 'id' ) ), data, function ( evt, err ) {
                    cb( evt, err );
                    console.log( evt );
                } );
            }
        }
    } ;
