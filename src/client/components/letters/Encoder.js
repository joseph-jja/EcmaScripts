import * as dom from 'client/dom/DOM';
import * as events from 'client/dom/events';
import selector from 'client/dom/selector';
import Grid from 'client/components/letters/Grid';
import {
    convertFromBaseXToBaseTen
} from 'utils/mathFunctions';

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
            const _cbox = dom.createElement( 'input', cell, {
                id: `cbox_${cell.id}`,
                type: 'checkbox',
                value: `cbox_${cell.id}`
            } );
        } );

        selector( 'tr', this.tableID ).each( row => {
            let cell = dom.createElement( 'td', row, {} );
            let _inp = dom.createElement( 'input', cell, {
                id: `${row.id}_inp`,
                type: 'text',
                size: 8
            } );
            cell = dom.createElement( 'td', row, {} );
            _inp = dom.createElement( 'input', cell, {
                id: `${row.id}_inp_bin`,
                type: 'text',
                size: 8
            } );
        } );

        events.addEvent( 'click', `#${this.parentID}`, ( e ) => {
            const tgt = events.getTarget( e );
            if ( tgt.nodeName().toLowerCase() === 'input' && tgt.type === 'checkbox' ) {
                const rowID = tgt.parentNode().id;
                const eId = document.getElementById( `${rowID}_inp` ),
                    binId = document.getElementById( `${rowID}_inp_bin` ),
                    val = ( tgt.checked || 0 );

                let cval = eId.value || '';
                eId.value = `${cval}${val}`;

                const binVal = convertFromBaseXToBaseTen( 2, eId.value );
                binId.value = binVal;
            }
        } );
    }

    getBinaryNumbers( _tgt ) {

    }
}
