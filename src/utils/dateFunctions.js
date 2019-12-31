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
    const today = ( dIn ? new Date( dIn.getTime() ) : new Date() ); // day of the month
    const month = today.getMonth();
    const year = today.getFullYear();
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

// find out if that was AM or PM as we want 12 hour clock not 24
DateFunctions.getAMPM = function ( dateObj ) {
    return ( dateObj.getHours() > 11 ) ? ' PM' : ' AM';
};

export default DateFunctions;
