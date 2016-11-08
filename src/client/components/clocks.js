//parent object for all clock types
//sort of abstract class
function Clock() {

    var clockObj;

    // default id and run interval return code
    this.clockId = "clockID";
    this.setIntervalReturnCode = '';

    // one can now change this and change the time that the update occurs
    this.updateInterval = 1000;

    // reference back to self
    clockObj = this;

}

//default function to run the clock that MUST be overridden by subclass
Clock.prototype.runClock = function () {
    throw ( "Override this function" );
};

//function to start a clock
Clock.prototype.startClock = function () {
    var clockObj, runClock;

    // create an object to reference later
    clockObj = this;

    // create a variable as a pointer to this function
    runClock = function () {
        clockObj.runClock();
    };

    // call the set timeout function with our function and one second
    this.setIntervalReturnCode = window.setInterval( runClock, this.updateInterval );

};

//function to stop a clock
Clock.prototype.stopClock = function () {
    clearTimeout( this.setIntervalReturnCode );
};

//function to set the id
Clock.prototype.setId = function ( clockId ) {
    this.clockId = clockId;
};

//pretty basic and stupid thing to show a digital clock
//clockId is the id of an element that supports innerHTML
function DigitalClock() {
    this.clockText = "Time: ";

    this.showSeconds = true;
}

DigitalClock.prototype = new Clock();

//the meat of the object
//this actually updates the clock
DigitalClock.prototype.runClock = function () {

    var clock, getClockFormat, format;

    if ( !document.getElementById ) {
        return false;
    }

    format = function ( input ) {
        var result = input;
        if ( input < 10 ) {
            result = "0" + input;
        }
        return result;
    };

    getClockFormat = function ( showSeconds ) {
        var datenow, clockformat;
        datenow = new Date();

        clockformat = datenow.getHours() + ":" + format( datenow.getMinutes() );

        // one could turn off seconds and only show minutes
        // then one could also setup the updateInterval for 60000
        // so we only update the clock every minute
        if ( showSeconds ) {
            clockformat += ":" + format( datenow.getSeconds() );
        }
        return clockformat;
    };

    clock = document.getElementById( this.clockId );

    // no clock return
    if ( clock === "" ) {
        return false;
    }
    clock.innerHTML = this.clockText + getClockFormat( this.showSeconds );

    return true;
};

function BinaryClock() {

    // this sets up the columns and rows
    var rows = 4,
        cols = 6,
        setColumnData;

    // this sets a column of data based on the time part that is passed in
    setColumnData = function ( column, timeComponent ) {
        var diff, bhlen, j, tdid, tdObj, d, trd, on,
            binaryTime = WebBrowser.math.convertFromBaseTenToBaseX( 2, timeComponent );

        bhlen = binaryTime.toString().length;
        diff = rows - bhlen;
        for ( j = 0; j < diff; j += 1 ) {
            tdid = this.clockId + "_row_" + j + "_col_" + column;
            tdObj = document.getElementById( tdid );
            if ( tdObj ) {
                tdObj.innerHTML = "0";
            }
        }
        d = 0;
        for ( j = rows - 1; j >= diff; j -= 1 ) {
            trd = ( +d ) + ( +diff );
            on = binaryTime.substring( d, d + 1 );
            tdid = this.clockId + "_row_" + trd + "_col_" + column;
            tdObj = document.getElementById( tdid );
            if ( tdObj ) {
                tdObj.innerHTML = on;
            }
            d += 1;
        }
    };

    this.setColumn = function ( start, data ) {
        var sh;
        // is it less than 10
        if ( data >= 10 ) {
            sh = data.toString();
            setColumnData.call( this, start, sh.substring( 0, 1 ) );
            setColumnData.call( this, start + 1, sh.substring( 1 ) );
        } else {
            setColumnData.call( this, start, 0 );
            setColumnData.call( this, start + 1, data );
        }
    };

    this.render = function () {
        var data, i, j, tdid,
            parent = document.getElementById( this.clockId );
        if ( parent ) {
            data = '<table>';
            for ( i = 0; i < rows; i += 1 ) {
                data += '<tr>';
                for ( j = 0; j < cols; j += 1 ) {
                    tdid = this.clockId + "_row_" + i + "_col_" + j;
                    data += '<td id="' + tdid + '"></td>';
                }
                data += '</tr>';
            }
            data += '</table>';
            parent.innerHTML = data;
        }
        this.runClock();
    };
}

BinaryClock.prototype = new Clock();

BinaryClock.prototype.runClock = function () {

    var hour, min, sec, today = new Date();

    hour = today.getHours();
    min = today.getMinutes();
    sec = today.getSeconds();

    this.setColumn( 0, hour );
    this.setColumn( 2, min );
    this.setColumn( 4, sec );
};

export {
    Clock,
    DigitalClock,
    BinaryClock
};
