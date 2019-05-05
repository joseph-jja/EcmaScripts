import selector from 'client/dom/selector';
import * from dom from 'client/dom/DOM';
import * from events from 'client/dom/events';
import Grid from 'client/components/letters/Grid';

//the character render engine
//this can be used to create a character on the grid
//any character can be created
export default class Encoder extends Grid {
    constructor( parentID, tableID ) {
        super( parentID, tableID );
        this.parentID = parentID;
        this.tableID = tableID;
    }

    // what to do on the timer
    render() {

        const eleName = this.tableID + 'cell';

        selector( 'td', this.tableID ).each( cell => {
            cbox = dom.createElement( 'input', cell, {
                id: `cbox_${cell.id}`,
                type: 'checkbox',
                value: `cbox_${cell.id}`
            } );
            cell.appendChild( cbox );
        } );

        events.addEvent( 'click', `#${this.parentID}`, ( e ) => {

        } );
    }


}
