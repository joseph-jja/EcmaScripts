import Calculator from 'client/components/calculator/Calculator';
import * as events from 'client/dom/events';

describe( 'testing calculator', () => {

    let parent;

    beforeEach( () => {
        if ( !parent ) {
            parent = document.createElement( 'div' );
        }
        parent.id = 'container-for-calculator';
        document.body.appendChild( parent );
    } );

    afterEach( () => {
        if ( parent ) {
            document.body.removeChild( parent );
        }
    } );

    it( 'calculator test', () => {
        expect( Calculator ).toBeDefined();
    } );

    it( 'calculator render test', () => {
        const calc = new Calculator( parent.id );
        spyOn( calc, 'render' );
        calc.render();
        expect( calc.render ).toHaveBeenCalled();
    } );

    describe( 'calculator handleClick tests', () => {

        it( 'calculator handleClick test', () => {
            const calc = new Calculator( parent.id );
            calc.render();

            const container = document.querySelector(`#${parent.id}`),
                table = container.querySelector('table'),
                cell = table.rows[2].cells[1];

            spyOn( table, 'click' );
            spyOn( calc, 'handleClick' );

            table.click();

            //table.dispatchEvent(mockEvent);

            expect( table.click ).toHaveBeenCalled();
        } );
    } );
} );
