import * as menu from 'client/components/menu';

describe( 'menu tests', () => {

    const nav = document.createElement( 'div' );
    nav.id = 'nav_bar';

    document.body.appendChild( nav );

    it( 'basicMenu  test', () => {
        menu.basicMenu();
        const selectObj = document.getElementById( 'url-navigation' );
        expect( selectObj.options.length ).toBeGreaterThan( 0 );
    } );

    it( 'extendedMenu  test', () => {
        menu.extendedMenu();
        const selectObj = document.getElementById( 'url-navigation' );
        expect( selectObj.options.length ).toBeGreaterThan( 0 );
    } );
} );
