import selector from 'client/dom/selector';

// a table cell render engine
export default function CellRender( baseRowID, binNum, columnID ) {
    this.colID = columnID;
    this.baseRowID = baseRowID;
    this.binNum = binNum;
    this.bhlen = new String( this.binNum ).length;
    this.index = 0;
    this.timerID = -1;
}

// both children use a time so make it here for generism
CellRender.prototype.startTimer = function () {
    var tblObj = this;
    var runClock = function () {
        tblObj.runClock();
    };
    this.timerID = window.setInterval( runClock, 1500 );
};

// need to stop the timer
CellRender.prototype.stopTimer = function () {
    clearTimeout( this.timerID );
};

// this is what we do when we start the timer
CellRender.prototype.runClock = function () {
    var bhlen = this.bhlen;
    var i = this.index;
    var j = ( bhlen < 7 ) ? i + 7 - bhlen : i;
    var cell = selector( "#" + this.baseRowID + ( ( +j ) + 1 ) + "_" + this.colID ).get( 0 );
    if ( new String( this.binNum ).substring( i, i + 1 ) === "1" && cell ) {
        cell.style.background = 'red';
    }
    this.index -= 1;
    if ( this.index < 0 ) {
        this.stopTimer();
    }
};
