import mathFunctions from '/js/utils/mathFunctions';
import CellRender from '/js/client/components/letters/CellRender';
import Grid from '/js/client/components/letters/Grid';

//the character render engine
//this can be used to create a character on the grid
//any character can be created
export default class Character extends Grid {
    constructor( parentID, tableID ) {
        this.parentID = parentID;
        this.tableID = tableID;
    }

    // what to do on the timer
    render() {

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
    }
}
