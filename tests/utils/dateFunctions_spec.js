import DF from "utils/dateFunctions";

describe( "date functions tests", function () {

    it( "test getFirstOfMonthDayOfWeek", function () {
        var x = new Date();
        x.setFullYear( 2016 );
        x.setMonth( 3 );
        x.setDate( 3 );
        expect( DF.getFirstOfMonthDayOfWeek( x ) ).toEqual( 5 );
    } );

    it( "test getDaysInMonth", function () {
        var x = new Date();
        x.setFullYear( 2016 );
        x.setMonth( 1 );
        expect( DF.getDaysInMonth( x ) ).toEqual( 29 );

        x.setMonth( 2 );
        expect( DF.getDaysInMonth( x ) ).toEqual( 31 );

        x.setFullYear( 1990 );
        x.setMonth( 1 );
        expect( DF.getDaysInMonth( x ) ).toEqual( 28 );

        x.setFullYear( 2004 );
        x.setMonth( 1 );
        expect( DF.getDaysInMonth( x ) ).toEqual( 29 );

        x.setFullYear( 2000 );
        x.setMonth( 1 );
        expect( DF.getDaysInMonth( x ) ).toEqual( 29 );

        x.setMonth( false );
        expect( DF.getDaysInMonth( x ) ).toBeGreaterThan( 0 );
        expect( DF.getDaysInMonth( x ) ).toBeLessThan( 32 );

        x.setMonth( 10 );
        expect( DF.getDaysInMonth( x ) ).toEqual( 30 );
    } );
} );
