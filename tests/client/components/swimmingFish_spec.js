import BrowserFish from 'client/components/swimmingFish';

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
        expect( BrowserFish ).toBeDefined();
    } );

    it( 'create swimming fish and stop', () => {
        const swimFish = new BrowserFish( parent.id );

        spyOn( swimFish, 'stopfish' );
        swimFish.stopfish();
        expect( swimFish.stopfish ).toHaveBeenCalled();
    } );

    it( 'get swimming fish', () => {
        const swimFish = new BrowserFish( parent.id );

        const result = swimFish.getFish();
        swimFish.stopfish();
        expect( result ).toBeTruthy();
    } );

    it( 'get swimming fish getXPos', () => {
        const swimFish = new BrowserFish( parent.id );

        const result = swimFish.getXPos();
        swimFish.stopfish();
        expect( result ).toBeDefined();
    } );

    it( 'get swimming fish getYPos', () => {
        const swimFish = new BrowserFish( parent.id );

        const result = swimFish.getYPos();
        swimFish.stopfish();
        expect( result ).toBeDefined();
    } );
} );
