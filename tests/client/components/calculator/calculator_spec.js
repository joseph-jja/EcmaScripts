import Calculator from 'client/components/calculator/Calculator';

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
} );
