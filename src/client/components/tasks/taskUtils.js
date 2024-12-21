import * as events from '/js/client/dom/events';
import selector from '/js/client/dom/selector';
import * as dom from '/js/client/dom/DOM';

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

    const sortableRows = rows.map( ( item, i ) => {
        return {
            rowData: item.childNodes[ realCellNumber ].innerHTML,
            index: i
        };
    } );

    sortableRows.sort( ( a, b ) => {
        const tdDataA = a.rowData,
            tdDataB = b.rowData;

        if ( type === 'date' ) {
            const timeA = Date.parse( tdDataA ),
                timeB = Date.parse( tdDataB );
            return ( timeA === timeB ? 0 : timeA > timeB ? -1 : 1 );
        } else {
            const dataA = tdDataA.toLowerCase(),
                dataB = tdDataB.toLowerCase();
            return ( dataA.localeCompare( dataB ) );
        }
    } );

    sortableRows.forEach( item => {
        tbody.append( rows[ item.index ] );
    } );

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
