import fish from 'client/components/swimmingFish';

describe( 'testing swimmingFish', () => {

    let parent;

    beforeEach( () => {
        if ( !parent ) {
            parent = document.createElement( 'div' );
        }
        parent.id = 'container-for-swimmingfish';
        document.body.appendChild( parent );
    } );

    afterEach( () => {
        if ( parent ) {
            document.body.removeChild( parent );
        }
    } );

    it( 'swimmingFish test', () => {
        expect( fish.BrowserFish ).toBeDefined();
    } );

    it( 'create swimming fish and stop', () => {
        const swimFish = new fish.BrowserFish( parent.id );

        spyOn( swimFish, 'stopfish' );
        swimFish.stopfish();
        expect( swimFish.stopfish ).toHaveBeenCalled();
    } );

    it( 'get swimming fish', () => {
        const swimFish = new fish.BrowserFish( parent.id );

        const result = swimFish.getFish();
        swimFish.stopfish();
        expect( result ).toBeTruthy();
    } );
} );
