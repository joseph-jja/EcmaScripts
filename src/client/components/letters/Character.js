import mathFunctions from 'utils/mathFunctions';
import CellRender from 'client/components/letters/CellRender';
import Grid from 'client/components/letters/Grid';

//the character render engine
//this can be used to create a character on the grid
//any character can be created
export default function Character( parentID, tableID ) {
    this.parentID = parentID;
    this.tableID = tableID;
}

//have grid to show inheritance
Character.prototype = new Grid;

// what to do on the timer
Character.prototype.render = function () {

    const eleName = this.tableID + 'cell';

    for ( let i = 0; i < 5; i++ ) {
        const x = this.matrix[ i ];
        const l = ( +i ) + 1;
        // convert code to binary
        const binaryTime = mathFunctions.convertFromBaseTenToBaseX( 2, x );

        // create a cell render object to render a cell based on the timer
        const tbl = new CellRender( eleName, binaryTime, l );
        tbl.index = tbl.bhlen;
        tbl.startTimer();
    }
};
