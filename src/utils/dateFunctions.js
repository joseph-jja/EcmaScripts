// normally when dealing with objects in javascript you would set the
// prototype of that object to the new other object
// however with javascript base objects, this does not work the same

const DateFunctions = {};

// month names the the last day of the month, short name for week day and also long name if someone wants it
DateFunctions.monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
DateFunctions.monthShortNames = [ "Jan ", "Feb ", "Mar ", "Apr ", "May ", "Jun ", "Jul ", "Aug ", "Sep ", "Oct ", "Nov ", "Dec " ];
DateFunctions.numberOfDaysInMonth = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
DateFunctions.weekDayShortNames = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ];
DateFunctions.weekDayNames = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];

// some javascript implementations do not have getFullYear
// so we test for that and then implement that
if ( typeof Date.prototype.getFullYear === 'undefined' ) {
    Date.prototype.getFullYear = function () {
        // get year returns year from 100
        // year epoch is 1900
        let year = this.getYear();
        return ( +year ) + 1900;
    };
}

// some javascript implementations do not have setFullYear
// so we test for that and then implement that
if ( typeof Date.prototype.setFullYear === 'undefined' ) {
    Date.prototype.setFullYear = function ( y ) {
        this.setYear( y );
    };
}

// get the first day of the current month
DateFunctions.getFirstOfMonthDayOfWeek = function ( dIn ) {
    let fomd,
        today = ( dIn ? new Date( dIn.getTime() ) : new Date() ); // day of the month
    today.setDate( 1 );
    fomd = today.getDay(); // day of the week
    return fomd;
};

// get the number of days in the month
DateFunctions.getDaysInMonth = function ( dIn ) {
    let today = ( dIn ? new Date( dIn.getTime() ) : new Date() ); // day of the month
    let month = today.getMonth();
    let year = today.getFullYear();
    if ( month === 1 ) {
        if ( ( year % 4 ) === 0 ) {
            if ( ( year % 400 ) === 0 ) {
                return 29;
            } else if ( ( year % 100 ) === 0 ) {
                return 28;
            } else {
                return 29;
            }
        } else {
            return 28;
        }
    } else {
        return DateFunctions.numberOfDaysInMonth[ month ];
    }
};

// simple method to set the date given m - d - y
DateFunctions.setFullDate = function ( m, d, y ) {
    let today = new Date();
    today.setMonth( m );
    today.setDate( d );
    today.setFullYear( y );
    return today;
};

export default DateFunctions;
