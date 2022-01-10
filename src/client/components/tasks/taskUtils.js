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

function tableSort( cellNumber = 3, type = 'date' ) {

    const tbody = selector( '#taskList tbody' ).get( 0 );
    const rows = selector( '#taskList tbody tr' ).toArray();

    const realCellNumber = cellNumber - 1;

    function dateSort() {

        rows.sort( ( a, b ) => {
            const tdDataA = a.childNodes[ realCellNumber ].innerHTML,
                tdDataB = b.childNodes[ realCellNumber ].innerHTML;

            if ( type === 'date' ) {
                const timeA = new Date( tdDataA ).getTime(),
                    timeB = new Date( tdDataB ).getTime();
                const delta = ( timeA > timeB );
                if ( timeA >= timeB ) {
                    tbody.prepend( a );
                } else {
                    tbody.prepend( b );
                }

                return delta;
            } else {
                const dataA = tdDataA.toLowerCase(),
                    dataB = tdDataB.toLowerCase();
                const delta = ( dataA.localeCompare( dataB ) );
                if ( tdDataA === dataB ) {
                    tbody.prepend( a );
                } else {
                    tbody.prepend( b );
                }
                return delta;
            }
        } );
    }

    dateSort();

    return rows;
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
