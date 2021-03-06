import * as events from 'client/dom/events';
import selector from 'client/dom/selector';
import * as dom from 'client/dom/DOM';

function mapFromDom() {

    const completed = selector( '#completed' ).get( 0 ).checked;

    const options = {
        'completed': completed,
        'work_date': dom.html( '#work_date' ),
        'start_date': dom.html( '#start_date' ) || dom.html( '#work_date' ),
        'end_date': dom.html( '#end_date' ) || ( completed ? dom.html( '#work_date' ) : '' ),
        'short_description': dom.html( '#short_description' ),
        'long_description': dom.html( '#long_description' )
    };

    return options;
}

function tableSort() {
    const tbody = selector( '#taskList tbody' ).get( 0 );
    const rows = selector( '#taskList tbody tr' ).toArray();
    const sortedRows = rows.sort( ( a, b ) => {
        const tdDateA = a.childNodes[ 3 ].innerHTML,
            tdDateB = b.childNodes[ 3 ].innerHTML;

        const timeA = new Date( tdDateA ).getTime(),
            timeB = new Date( tdDateB ).getTime();

        const delta = ( timeA > timeB );
        if ( timeA > timeB ) {
            tbody.prepend( a );
        } else {
            tbody.prepend( b );
        }

        return delta;
    } );

    return sortedRows;
}

function cancelButtonClick() {

    const saveButton = selector( '#saveTask' ).get( 0 ),
        cancelButton = selector( '#cancelTask' ).get( 0 );

    events.removeEvent( saveButton, 'click' );
    events.removeEvent( cancelButton, 'click' );
    window.location.reload();
}

function setEndDate() {
    const completed = selector( '#completed' ).get( 0 ).checked;
    if ( completed ) {
        selector( '#end_date' ).get( 0 ).value = new Date();
    } else {
        selector( '#end_date' ).get( 0 ).value = '';
    }
}

export {
    mapFromDom,
    tableSort,
    cancelButtonClick,
    setEndDate
};
