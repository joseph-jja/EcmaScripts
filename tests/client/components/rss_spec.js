import * as RSS from 'client/components/rss';

describe( 'testing rss', () => {

    let parent,
        title,
        description,
        pubDate,
        guidID;

    beforeEach( () => {
        if ( !parent ) {
            parent = document.createElement( 'div' );
        }
        parent.id = 'feeddata';
        document.body.appendChild( parent );

        title = document.createElement( 'div' );
        title.id = 'titleID';
        document.body.appendChild( title );

        description = document.createElement( 'div' );
        description.id = 'descriptionID';
        document.body.appendChild( description );

        pubDate = document.createElement( 'div' );
        pubDate.id = 'pubDateID';
        document.body.appendChild( pubDate );

        guidID = document.createElement( 'div' );
        guidID.id = 'guidID';
        document.body.appendChild( guidID );
    } );

    afterEach( () => {
        /*if ( title ) {
            document.body.removeChild( title );
        }
        if ( description ) {
            document.body.removeChild( description );
        }
        if ( pubDate ) {
            document.body.removeChild( pubDate );
        }
        if ( guidID ) {
            document.body.removeChild( guidID );
        }*/
    } );

    it( 'rss test', () => {
        expect( RSS ).toBeDefined();
    } );

    it( 'rss insertRecord', () => {

        title.innerHTML = 'test data';
        description.innerHTML = 'short test description data';
        pubDate.innerHTML = new Date().toString();
        guidID.innerHTML = '1234';

        spyOn( RSS, 'insertRecord' );
        RSS.insertRecord();

        expect( RSS.insertRecord ).toHaveBeenCalled();
    } );

} );
