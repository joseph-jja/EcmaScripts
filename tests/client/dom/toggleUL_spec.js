import toggleUL from 'client/dom/toggleUL';

describe( 'testing toggleUL', () => {

  let parent;

  beforeEach( () => {
      if ( !parent ) {
          parent = document.createElement( 'div' );
      }
      parent.id = 'container-for-toggleUL-tests';
      document.body.appendChild( parent );
  } );

  afterEach( () => {
      if ( parent ) {
          document.body.removeChild( parent );
      }
  } );

    it( 'toggleUL test', () => {
        expect( toggleUL ).toBeDefined();
    } );
} );
