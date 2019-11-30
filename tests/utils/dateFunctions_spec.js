import DF from "utils/dateFunctions";

describe( "date functions tests", function () {

    it( "test getFirstOfMonthDayOfWeek", function () {
        const x = new Date();
        x.setFullYear( 2016 );
        x.setMonth( 3 );
        x.setDate( 3 );
        expect( DF.getFirstOfMonthDayOfWeek( x ) ).toEqual( 5 );
    } );

    it( "test getDaysInMonth Feb 2016", function () {
        const x = new Date();
        x.setDate( 1 );
        x.setFullYear( 2016 );
        x.setMonth( 1 );
        expect( DF.getDaysInMonth( x ) ).toEqual( 29 );

    } );

    it( "test getDaysInMonth Mar 2016", function () {
        const x = new Date();
        x.setDate( 1 );
        x.setFullYear( 2016 );
        x.setMonth( 2 );
        expect( DF.getDaysInMonth( x ) ).toEqual( 31 );
    } );

    it( "test getDaysInMonth Feb 1990", function () {
        const x = new Date();
        x.setDate( 1 );
        x.setFullYear( 1990 );
        x.setMonth( 1 );
        expect( DF.getDaysInMonth( x ) ).toEqual( 28 );
    } );

    it( "test getDaysInMonth Feb 2004", function () {
        const x = new Date();
        x.setDate( 1 );
        x.setFullYear( 2004 );
        x.setMonth( 1 );
        expect( DF.getDaysInMonth( x ) ).toEqual( 29 );
    } );

    it( "test getDaysInMonth Feb 2000", function () {
        const x = new Date();
        x.setDate( 1 );
        x.setFullYear( 2000 );
        x.setMonth( 1 );
        expect( DF.getDaysInMonth( x ) ).toEqual( 29 );
    } );

    it( "test getDaysInMonth Feb 1900", function () {
        const x = new Date();
        x.setDate( 1 );
        x.setFullYear( 1900 );
        x.setMonth( 1 );
        expect( DF.getDaysInMonth( x ) ).toEqual( 28 );
    } );

    it( "test getDaysInMonth false month", function () {
        const x = new Date();
        x.setDate( 1 );
        x.setFullYear( 2000 );
        x.setMonth( false );
        expect( DF.getDaysInMonth( x ) ).toBeGreaterThan( 0 );
    } );

    it( "test getDaysInMonth false month", function () {
        const x = new Date();
        x.setDate( 1 );
        x.setFullYear( 2000 );
        x.setMonth( false );
        expect( DF.getDaysInMonth( x ) ).toBeLessThan( 32 );
    } );

    it( "test getDaysInMonth Oct 2000", function () {
        const x = DF.setFullDate( 10, 1, 2000 );
        expect( DF.getDaysInMonth( x ) ).toEqual( 30 );
    } );
} );
