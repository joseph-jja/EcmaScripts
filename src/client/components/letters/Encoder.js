import selector from 'client/dom/selector';
import Grid from 'client/components/letters/Grid';

//the character render engine
//this can be used to create a character on the grid
//any character can be created
export default class Encoder extends Grid {
    constructor( parentID, tableID ) {
        this.parentID = parentID;
        this.tableID = tableID;
    }

    // what to do on the timer
    render() {

        const eleName = this.tableID + 'cell';

        selector( 'td', this.tableID ).each( cell => {
            cbox = document.createElement( 'input' );
            cbox.type = 'checkbox';
            cbox.id = `cbox_${cell.id};`;
            cbox.value = cbox.id;
            cell.appendChild( cbox );

        } );
    }
}
