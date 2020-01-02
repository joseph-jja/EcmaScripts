import * as ajax from 'client/net/ajax';
import SQLQuery from 'client/db/IndexedDB';
import * as Constants from 'db/constants';

function getRecordFromOptions( options = {} ) {

    const isCompleted = options[ 'completed' ] || false;
    const result = {
        'completed': isCompleted,
        'work_date': options[ 'work_date' ] || new Date(),
        'start_date': options[ 'start_date' ] || options[ 'work_date' ] || new Date(),
        'end_date': options[ 'end_date' ] || ( isCompleted ? options[ 'work_date' ] : '' ),
        'short_description': options[ 'short_description' ] || '',
        'long_description': options[ 'long_description' ] || ''
    };
    if ( options.id ) {
        result.id = options.id;
    }
    return result;
}

export default class Task {

    constructor() {

        this.indexedDB = new SQLQuery( Constants.DBName );

        this.record = getRecordFromOptions();
    }

    fetch( options = {} ) {
        if ( !options.id ) {
            return;
        }
        this.record.id = options.id;

        this.indexedDB.fetch( Constants.StoreName, ( +this.record.id ), ( evt, err ) => {
            if ( err === Constants.DB_SUCCESS ) {
                const result = evt.target.result;
                this.record = getRecordFromOptions( Object.assign( {}, {
                    id: this.record.id
                }, result ) );

                if ( options.callback ) {
                    options.callback( this.record );
                }
            }
        } );

    }

    clear( options ) {
        this.indexedDB.clear( Constants.StoreName, ( evt, err ) => {
            if ( options.callback ) {
                options.callback( evt, err );
            }
        } );
    }

    create( options = {} ) {

        this.record = getRecordFromOptions( options );

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

        this.record = getRecordFromOptions( options );

        this.indexedDB.update( Constants.StoreName, ( +this.record.id ), this.record, ( evt, err ) => {
            if ( options.callback ) {
                options.callback( evt, err );
            }
        } );
    }

    delete( options = {} ) {
        if ( !options.id ) {
            return;
        }
        this.record = getRecordFromOptions( options );

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
