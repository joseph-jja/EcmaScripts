import SQLQuery from '/js/client/db/IndexedDB';

const DBName = 'tasksDB',
    StoreName = 'tasks',
    {
        DB_SUCCESS
    } = SQLQuery;

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

        this.indexedDB = new SQLQuery( DBName );

        this.record = getRecordFromOptions();
    }

    fetch( options = {} ) {
        if ( !options.id ) {
            return;
        }
        this.record.id = options.id;

        this.indexedDB.fetch( StoreName, ( +this.record.id ), ( evt, err ) => {
            if ( err === DB_SUCCESS ) {
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
        this.indexedDB.clear( StoreName, ( evt, _err ) => {
            if ( options.callback ) {
                options.callback( evt );
            }
        } );
    }

    create( options = {}, isImport = false ) {

        this.record = getRecordFromOptions( options );

        if ( isImport && options.key ) {
            this.record.key = options.key;
        }

        this.indexedDB.add( StoreName, this.record, ( evt, err ) => {
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

        this.indexedDB.update( StoreName, ( +this.record.id ), this.record, ( evt, err ) => {
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

        this.indexedDB.update( StoreName, ( +this.record.id ), this.record, ( evt, err ) => {
            if ( options.callback ) {
                options.callback( evt, err );
            }
        } );
    }

    list( options ) {
        if ( !options.callback ) {
            return;
        }

        this.indexedDB.list( StoreName, options.callback );
    }
}
