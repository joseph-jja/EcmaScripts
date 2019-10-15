//very very basic object calculator
//by Joseph Acosta
//refactored and rewritten from my original calculator code
//things learned and things redone
function TotalsManager() {
    this.currentTotal = 0;
    this.lastMethod = '';
    this.currentValue = 0;
};

/* reset all the registers */
TotalsManager.prototype.clear = function() {
    this.currentTotal = 0;
    this.lastMethod = '';
    this.currentValue = 0;
};

TotalsManager.prototype.appendStorage = function(x) {
    const c = this.currentValue;
    if ((c === 0) && (new String(c).indexOf(".") === -1)) {
        this.currentValue = x;
    } else {
        if (x === '.') {
            if (c.indexOf(".") !== -1) {
                return; // we can't add another . in a number
            }
        }
        this.currentValue = new String(c) + new String(x);
    }
};

//use this to perform a pending operation and set the next operation
TotalsManager.prototype.performLastMethod = function(nextMethod) {
    const x = this.currentValue;
    const lm = this.lastMethod;
    if (lm !== '') {
        this.currentTotal = lm(this.currentTotal, x);
    } else {
        this.currentTotal = x;
    }
    this.currentValue = 0;
    this.lastMethod = nextMethod;
};

//use this to call an operation like
//math.log on the current storage value
TotalsManager.prototype.changeStorage = function(nOper) {
    const x = this.currentValue;
    if (nOper) {
        this.currentValue = nOper(x);
    }
};

TotalsManager.prototype.equals = function() {
    this.performLastMethod('');
    return this.currentTotal;
};

export default TotalsManager;