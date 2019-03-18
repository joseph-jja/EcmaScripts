import * as ajax from 'client/net/ajax';
import SQLQuery from 'client/db/IndexedDB';
import * as Constants from 'db/constants';

export default class Task {

    constructor() {

        this.indexedDB = new SQLQuery( Constants.DBName );

        this.record = {
            'completed': false,
            'work_date': new Date(),
            'short_description': '',
            'long_description': ''
        };
    }

    read( options = {} ) {
        if ( !options.id ) {
            return;
        }
        this.record.id = options.id;

        this.indexedDB.fetch( Constants.StoreName, ( +this.record.id ), ( evt, err ) => {
            if ( err === this.indexedDB.success ) {
                const result = evt.target.result;
                this.record = {
                    'completed': result[ 'completed' ],
                    'work_date': result[ 'work_date' ],
                    'short_description': result[ 'short_description' ],
                    'long_description': result[ 'long_description' ],
                    'id': result[ 'id' ]
                };

                if ( options.callback ) {
                    options.callback( result );
                }
            }
            this.indexedDB.close();
        } );

    }

    create( options = {} ) {

        this.record = {
            'completed': options[ 'completed' ],
            'work_date': options[ 'work_date' ],
            'short_description': options[ 'short_description' ],
            'long_description': options[ 'long_description' ]
        };

        this.indexedDB.add( Constants.StoreName, this.record, ( evt, err ) => {
            if ( options.callback ) {
                options.callback( evt, err );
            }
        } );
    }

    update( options = {} ) {
        if ( !options.id ) {
            return;
        }
        this.record = {
            'completed': options[ 'completed' ],
            'work_date': options[ 'work_date' ],
            'short_description': options[ 'short_description' ],
            'long_description': options[ 'long_description' ],
            'id': options[ 'id' ]
        };

        this.indexedDB.update( Constants.StoreName, this.record, ( evt, err ) => {
            if ( options.callback ) {
                options.callback( evt, err );
            }
        } );
    }

    delete( options = {} ) {
        if ( !options.id ) {
            return;
        }
        this.record = {
            'completed': options[ 'completed' ],
            'work_date': options[ 'work_date' ],
            'short_description': options[ 'short_description' ],
            'long_description': options[ 'long_description' ],
            'id': options[ 'id' ]
        };
        this.indexedDB.update( Constants.StoreName, ( +this.record.id ), this.record, ( evt, err ) => {
            if ( options.callback ) {
                options.callback( evt, err );
            }
        } );
    }

    list( options ) {
        if ( !options.callback ) {
            return;
        }

        this.indexedDB.list( Constants.StoreName, options.callback );
    }
}
