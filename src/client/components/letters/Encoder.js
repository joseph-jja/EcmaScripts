import selector from 'client/dom/selector';
import * from dom from 'client/dom/DOM';
import * from events from 'client/dom/events';
import Grid from 'client/components/letters/Grid';
import {
    convertFromBaseXToBaseTen
} from 'util/mathFunctions';

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

        this.build();

        selector( 'td', this.tableID ).each( cell => {
            const cbox = dom.createElement( 'input', cell, {
                id: `cbox_${cell.id}`,
                type: 'checkbox',
                value: `cbox_${cell.id}`
            } );
        } );

        selector( 'tr', this.tableID ).each( row => {
            let cell = dom.createElement( 'td', row, {} );
            let inp = dom.createElement( 'input', cell, {
                id: `${row.id}_inp`,
                type: 'text',
                size: 8
            } );
            cell = dom.createElement( 'td', row, {} );
            inp = dom.createElement( 'input', cell, {
                id: `${row.id}_inp_hex`,
                type: 'text',
                size: 8
            } );
        } );

        events.addEvent( 'click', `#${this.parentID}`, ( e ) => {
            const tgt = events.getTarget( e );
            if ( tgt.nodeName().toLowerCase() === 'input' && x.type === 'checkbox' ) {
                const rowID = tgt.parentNode().id;
                const eId = document.getElementById( `${rowId}_inp` ),
                    hexId = document.getElementById( `${rowId}_inp_hex` ),
                    val = ( tgt.checked || 0 );

                let cval = eId.value || '';
                eId.value = `${oval}${val}`;

                const binVal = convertFromBaseXToBaseTen( 2, eId.value );
                hexId.value = binVal;
            }
        } );
    }

    getBinaryNumbers( tgt ) {

    }
}
