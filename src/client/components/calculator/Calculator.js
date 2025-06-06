import mathFunctions from '/js/utils/mathFunctions';
import selector from '/js/client/dom/selector';
import * as dom from '/js/client/dom/DOM';
import * as events from '/js/client/dom/events';

import TotalsManager from '/js/client/components/calculator/TotalsManager';

//the GUI Calculator
function Calculator( parentID, options ) {
    // calendar id
    this.id = ( options && options.id ) ? options.id : "";

    // parent object
    if ( !parentID ) {
        throw ( "Could not create Calculator() because no parent object was specifiec!" );
    }
    this.parentID = parentID;
};

Calculator.prototype = new TotalsManager;

Calculator.prototype.handle = {
    table: "",
    div: "",
    base: 10
};

Calculator.display = [];
( function () {
    const guiCalc = Calculator.display;
    guiCalc.push( [ "1", "2", "3", "+", "sqrt", "n!" ] );
    guiCalc.push( [ "4", "5", "6", "-", "sin", "1/x" ] );
    guiCalc.push( [ "7", "8", "9", "*", "cos", "x^2" ] );
    guiCalc.push( [ "+/-", "0", ".", "/", "tan", "x^3" ] );
    guiCalc.push( [ "=", "clear", "log", "exp", "PI", "x^y" ] );
} )();

Calculator.prototype.render = function () {

    const cols = 6,
        calcEnd = Calculator.display.length;
    let tr, td, optn, form;

    let parentObj = selector( "#" + this.parentID ).get( 0 );
    if ( !parentObj ) {
        throw ( "Could not get parent element to attach calendar to!" );
    }

    this.handle.table = dom.createElement( 'table', parentObj, {
        "className": "Calculator"
    } );
    tr = dom.createElement( 'tr', this.handle.table );
    td = dom.createElement( 'td', tr );
    td.setAttribute( "colspan", cols );
    optn = {
        "name": "Calculator",
        "type": "text",
        "size": "20",
        "maxlength": "20"
    };

    // set handle form
    form = dom.createElement( 'form', td );

    // set handle for div
    this.handle.div = dom.createElement( "div", form, optn );
    /*
	tr = dom.createElement('tr', this.handle.table);
	td = dom.createElement('td', tr);
	td.setAttribute("colspan", cols);
	cells = [ "hex", 16, "dec", 10, "oct", 8, "bin", "2" ];
	end = cells.length;
	for ( i = 0; i < end; i+=2 ) {
		optn = { "name": "base", "type": "radio", "value": cells[i+1] };
		base = dom.createElement("span", td);
		base.innerHTML = cells[i];
		dom.createElement("div", td, optn);
	}
	 */
    //"A", "B", "C", "D", "E", "F" ];
    for ( let i = 0; i < calcEnd; i++ ) {
        const display = Calculator.display,
            iDisplay = display[ i ];
        let end = iDisplay.length;
        tr = dom.createElement( 'tr', this.handle.table );
        for ( let j = 0; j < end; j++ ) {
            let o = {
                'innerHTML': iDisplay[ j ]
            };
            dom.createElement( 'td', tr, o );
        }
    }

    // we have to redo this because it gets lost
    this.handle.div = form.getElementsByTagName( "div" )[ 0 ];
    this.handle.div.innerHTML = "0";

    const self = this;
    const handleEvent = ( evt ) => {
        self.handleClick( evt, this );
    };

    // FIXME and support both!
    if ( events.isTouchEnabled() ) {
        events.addEvent( this.handle.table, 'touchstart', handleEvent, false );
    } else {
        events.addEvent( this.handle.table, 'click', handleEvent, false );
    }
};

Calculator.prototype.handleClick = function ( evt, obj ) {

    var e = events.getEvent( evt ),
        tgt,
        inp, callback = [],
        method;

    tgt = events.getTarget( e );
    inp = obj.handle.div.innerHTML;

    if ( tgt.nodeName.toLowerCase() !== "td" ) {
        return;
    }
    var data = tgt.innerHTML;
    if ( !isNaN( data ) || data === "A" || data === "B" || data === "C" || data === "D" || data === "E" || data === "F" ) {
        obj.appendStorage( data );
        if ( isNaN( inp ) ) {
            obj.handle.div.innerHTML = inp + data;
        } else {
            obj.handle.div.innerHTML = obj.currentValue;
        }
    } else {
        callback[ "." ] = function ( obj, inp, data ) {
            obj.appendStorage( data );
            obj.handle.div.innerHTML = inp + data;
        };
        callback[ "+/-" ] = function ( obj, _inp, _data ) {
            obj.changeStorage( mathFunctions.inverse );
            obj.handle.div.innerHTML = obj.currentValue;
        };
        callback[ "+" ] = function ( obj, inp, data ) {
            obj.performLastMethod( mathFunctions.add );
            obj.handle.div.innerHTML = inp + data;
        };
        callback[ "-" ] = function ( obj, inp, data ) {
            obj.performLastMethod( mathFunctions.subtract );
            obj.handle.div.innerHTML = inp + data;
        };
        callback[ "*" ] = function ( obj, inp, data ) {
            obj.performLastMethod( mathFunctions.multiply );
            obj.handle.div.innerHTML = inp + data;
        };
        callback[ "/" ] = function ( obj, inp, data ) {
            obj.performLastMethod( mathFunctions.divide );
            obj.handle.div.innerHTML = inp + data;
        };
        callback[ "=" ] = function ( obj, _inp, _data ) {
            obj.equals();
            obj.handle.div.innerHTML = obj.currentTotal;
            obj.currentValue = obj.currentTotal;
        };
        callback[ "clear" ] = function ( obj, _inp, _data ) {
            obj.clear();
            obj.handle.div.innerHTML = obj.currentTotal;
        };
        callback[ "n!" ] = function ( obj, _inp, _data ) {
            obj.changeStorage( mathFunctions.factorial );
            obj.handle.div.innerHTML = obj.currentValue;
        };
        callback[ "1/x" ] = function ( obj, _inp, _data ) {
            obj.changeStorage( mathFunctions.oneOver );
            obj.handle.div.innerHTML = obj.currentValue;
        };
        callback[ "x^2" ] = function ( obj, _inp, _data ) {
            obj.changeStorage( mathFunctions.square );
            obj.handle.div.innerHTML = obj.currentValue;
        };
        callback[ "x^3" ] = function ( obj, _inp, _data ) {
            obj.changeStorage( mathFunctions.cube );
            obj.handle.div.innerHTML = obj.currentValue;
        };
        callback[ "PI" ] = function ( obj, inp, _data ) {
            obj.currentValue = Math.PI;
            obj.handle.div.innerHTML = inp + Math.PI;
        };
        callback[ "x^y" ] = function ( obj, inp, _data ) {
            obj.performLastMethod( Math.pow );
            obj.handle.div.innerHTML = inp + "^";
        };

        method = callback[ data ];
        if ( !method ) {
            if ( Math.hasOwnProperty( data ) ) {
                obj.changeStorage( Math[ data ] );
                obj.handle.div.innerHTML = obj.currentValue;
            }
        } else {
            method( obj, inp, data );
        }
    }
};

export default Calculator;
