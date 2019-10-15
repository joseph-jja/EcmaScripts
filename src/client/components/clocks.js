import MF from 'utils/mathFunctions';

//parent object for all clock types
//sort of abstract class
class Clock {

    constuctor() {
        // default id and run interval return code
        this.clockId = "clockID";
        this.setIntervalReturnCode = '';

        // one can now change this and change the time that the update occurs
        this.updateInterval = 1000;
    }
}

//default function to run the clock that MUST be overridden by subclass
Clock.prototype.runClock = function() {
    throw ("Override this function");
};

//function to start a clock
Clock.prototype.startClock = function() {

    // create an object to reference later
    const clockObj = this;

    // create a variable as a pointer to this function
    const runClock = function() {
        clockObj.runClock();
    };

    // call the set timeout function with our function and one second
    this.setIntervalReturnCode = window.setInterval(runClock, this.updateInterval);

};

//function to stop a clock
Clock.prototype.stopClock = function() {
    clearTimeout(this.setIntervalReturnCode);
};

//function to set the id
Clock.prototype.setId = function(clockId) {
    this.clockId = clockId;
};

//pretty basic and stupid thing to show a digital clock
//clockId is the id of an element that supports innerHTML
class DigitalClock extends Clock {

    constructor() {
        super();

        this.clockText = "Time: ";

        this.showSeconds = true;
    }
}

//the meat of the object
//this actually updates the clock
DigitalClock.prototype.runClock = function() {

    if (!document.getElementById) {
        return false;
    }

    const format = function(input) {
        let result = input;
        if (input < 10) {
            result = "0" + input;
        }
        return result;
    };

    const getClockFormat = function(showSeconds) {
        const datenow = new Date();

        let clockformat = datenow.getHours() + ":" + format(datenow.getMinutes());

        // one could turn off seconds and only show minutes
        // then one could also setup the updateInterval for 60000
        // so we only update the clock every minute
        if (showSeconds) {
            clockformat += ":" + format(datenow.getSeconds());
        }
        return clockformat;
    };

    const clock = document.getElementById(this.clockId);

    // no clock return
    if (!clock) {
        return false;
    }
    clock.innerHTML = this.clockText + getClockFormat(this.showSeconds);

    return true;
};

class BinaryClock extends Clock {

    constructor() {
        super();

        // this sets a column of data based on the time part that is passed in
        // this sets up the columns and rows
        this.rows = 4;
        this.cols = 6;
    }

    setColumnData(column, timeComponent) {
        const binaryTime = MF.convertFromBaseTenToBaseX(2, timeComponent);

        const bhlen = binaryTime.toString().length;
        const diff = this.rows - bhlen;
        for (let j = 0; j < diff; j += 1) {
            const tdid = this.clockId + "_row_" + j + "_col_" + column;
            const tdObj = document.getElementById(tdid);
            if (tdObj) {
                tdObj.innerHTML = "0";
            }
        }
        let d = 0;
        for (let j = this.rows - 1; j >= diff; j -= 1) {
            const trd = (+d) + (+diff);
            const on = binaryTime.substring(d, d + 1);
            const tdid = this.clockId + "_row_" + trd + "_col_" + column;
            const tdObj = document.getElementById(tdid);
            if (tdObj) {
                tdObj.innerHTML = on;
            }
            d += 1;
        }
    }

    setColumn(start, data) {

        // is it less than 10
        if (data >= 10) {
            const sh = data.toString();
            this.setColumnData.call(this, start, sh.substring(0, 1));
            this.setColumnData.call(this, start + 1, sh.substring(1));
        } else {
            this.setColumnData.call(this, start, 0);
            this.setColumnData.call(this, start + 1, data);
        }
    }

    render() {
        var data, i, j, tdid,
            parent = document.getElementById(this.clockId);
        if (parent) {
            data = '<table>';
            for (i = 0; i < this.rows; i += 1) {
                data += '<tr>';
                for (j = 0; j < this.cols; j += 1) {
                    tdid = this.clockId + "_row_" + i + "_col_" + j;
                    data += '<td id="' + tdid + '"></td>';
                }
                data += '</tr>';
            }
            data += '</table>';
            parent.innerHTML = data;
        }
        this.runClock();
    }
}

BinaryClock.prototype.runClock = function() {

    const today = new Date();

    const hour = today.getHours();
    const min = today.getMinutes();
    const sec = today.getSeconds();

    this.setColumn(0, hour);
    this.setColumn(2, min);
    this.setColumn(4, sec);

    return true;
};

export {
    Clock,
    DigitalClock,
    BinaryClock
};