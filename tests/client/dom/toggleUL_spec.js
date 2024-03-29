import toggleUL from 'client/dom/toggleUL';
import * as dom from 'client/dom/DOM';

describe( 'testing toggleUL', () => {

    let parent,
        uls = [];;

    beforeAll( () => {
        if ( !parent ) {
            parent = document.createElement( 'div' );
        }
        parent.id = 'container-for-toggleUL-tests';
        document.body.appendChild( parent );


        for ( let i = 0; i < 3; i++ ) {
            uls[ i ] = dom.createElement( 'ul', parent, {
                id: `{parent.id}_ul_$i}`
            } );
            uls[ i ].style.display = 'none';
            for ( let i = 0; i < 3; i++ ) {
                const li = dom.createElement( 'li', uls[ i ], {
                    id: `{uls[ i ].id}_li_$i}`
                } );
                const _span = dom.createElement( 'span', li );
            }
        }
    } );

    afterAll( () => {
        if ( parent ) {
            document.body.removeChild( parent );
        }
    } );

    it( 'toggleUL test', () => {
        expect( toggleUL ).toBeDefined();
    } );

    it( 'toggleUL test block', () => {
        uls[ 1 ].style.display = 'none';
        toggleUL( uls[ 1 ].id );

        expect( uls[ 1 ].style.display ).toEqual( 'block' );
    } );

    it( 'toggleUL test none', () => {
        uls[ 1 ].style.display = 'block';
        toggleUL( uls[ 1 ].id );

        expect( uls[ 0 ].style.display ).toEqual( 'none' );
    } );
} );
