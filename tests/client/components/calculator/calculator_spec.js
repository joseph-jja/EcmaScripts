import Calculator from 'client/components/calculator/Calculator';
import * as events from 'client/dom/events';

describe( 'testing calculator', () => {

    let parent;

    let mockElement = {
        nodeName: 'td',
        innerHTML: '1'
    };

    const mockEvent = {
        srcElement: mockElement,
        target: mockElement
    };

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

    xit( 'calculator handleClick test', () => {
        const calc = new Calculator( parent.id );
        spyOn( calc, 'render' );
        calc.render();

        spyOn( calc, 'appendStorage' );

        spyOn( events, 'getTarget' ).and.returnValue( mockElement );

        console.error( events.getTarget( mockEvent ) );

        calc.handleClick( mockEvent, calc );

        expect( calc.appendStorage ).toHaveBeenCalled();
    } );
} );
