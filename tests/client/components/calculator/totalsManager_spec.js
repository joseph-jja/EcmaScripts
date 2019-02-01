import mathFunctions from 'utils/mathFunctions';
import TotalsManager from 'client/components/calculator/TotalsManager';

describe( 'testing TotalsManager', () => {

    let storage;

    beforeEach( () => {
        storage = new TotalsManager();
    } );

    afterEach( () => {

    } );

    it( 'totals manager test to append storage', () => {
        storage.clear();
        storage.appendStorage( 5 );

        expect( storage.currentValue ).toEqual( 5 );
    } );

    it( 'totals manager test to append storage 55.1', () => {
        storage.clear();
        storage.appendStorage( 5 );
        storage.appendStorage( 5 );
        storage.appendStorage( '.' );
        storage.appendStorage( 1 );
        expect( storage.currentValue ).toEqual( '55.1' );
    } );

    it( 'totals manager test to performLastMethod and equals 100', () => {
        storage.clear();
        storage.appendStorage( 5 );
        storage.appendStorage( 5 );
        storage.appendStorage( '.' );
        storage.appendStorage( 1 );

        storage.performLastMethod( mathFunctions.add );

        storage.appendStorage( 4 );
        storage.appendStorage( 4 );
        storage.appendStorage( '.' );
        storage.appendStorage( 9 );

        expect( storage.equals() ).toEqual( 100 );
    } );

    it( 'totals manager test to changeStorage', () => {
        storage.clear();
        storage.appendStorage( 5 );

        storage.changeStorage( mathFunctions.factorial );

        expect( storage.equals() ).toEqual( 120 );
    } );
} );
