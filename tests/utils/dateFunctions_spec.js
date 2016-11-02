import DF from "commonUtils/dateFunctions";

describe( "date functions tests", function () {

    it( "test getFirstOfMonthDayOfWeek", function () {
        var x = new Date();
        x.setFullYear( 2016 );
        x.setMonth( 3 );
        x.setDate( 3 );
        expect( DF.getFirstOfMonthDayOfWeek( x ) ).toEqual( 5 );
    } );

    it( "test getFirstOfMonthDayOfWeek", function () {
        var x = new Date();
        x.setFullYear( 2016 );
        x.setMonth( 1 );
        expect( DF.getDaysInMonth( x ) ).toEqual( 29 );
        x.setMonth( 2 );
        expect( DF.getDaysInMonth( x ) ).toEqual( 31 );
    } );

} );
