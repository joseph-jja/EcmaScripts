import * as dom from 'client/dom/DOM';
import selector from 'client/dom/selector';

//this is the parent grid object
//this builds the table that has the cells for the individual pixels
export default class Grid {

    constructor( parentID, tableID ) {
        this.parentID = parentID;
        this.tableID = tableID;
        this.matrix = [];
    }

    reset() {
        const _cells = selector( "#" + this.parentID + ' td.grid-cell' ).each( cell => {
            cell.style.background = "white";
        } );
    };

    // build function builds the grid
    build() {
        const cols = 7,
            rows = 9;

        const parent = selector( "#" + this.parentID ).get( 0 );

        const table = dom.createElement( 'table', undefined, {
            "id": this.tableID + 'table'
        } );

        for ( let i = 0; i < rows; i += 1 ) {
            const row = dom.createElement( 'tr', table, {
                "id": this.tableID + 'row' + i
            } );
            for ( let j = 0; j < cols; j += 1 ) {
                const cell = dom.createElement( 'td', row, {
                    "id": this.tableID + 'cell' + i + '_' + j
                } );
                cell.className = 'grid-cell';
            }
        }
        parent.appendChild( table );
    };

};
