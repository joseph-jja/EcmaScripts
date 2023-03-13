import setFooter from 'client/components/footer';

describe( 'footer tests', () => {

    const nav = document.createElement( 'div' );
    nav.id = 'footer-space';

    document.body.appendChild( nav );

    it( 'setFooter  test', () => {
        setFooter( nav );
        const footerLis = document.querySelectorAll( '#footer-space div div.footer-column' );
        expect( footerLis.length ).toEqual( 3 );
    } );
} );
