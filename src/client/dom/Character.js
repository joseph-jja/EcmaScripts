import mathFunctions from 'utils/mathFunctions';
import CellRender from 'client/dom/CellRender';
import Grid from 'client/dom/Grid';

//the character render engine
	//this can be used to create a character on the grid
	//any character can be created
	function Character(parentID, tableID) {
		this.parentID = parentID;
		this.tableID = tableID;
	}

	//have grid to show inheritance
	Character.prototype = new Grid;

	// what to do on the timer 
	Character.prototype.render = function() {

		var eleName = this.tableID + 'cell';

		for ( var i = 0; i < 5; i += 1) {
			var x = this.matrix[i];
			var l = (+i) + 1;
			// convert code to binary 
			var binaryTime = mathFunctions.convertFromBaseTenToBaseX(2, x);

			// create a cell render object to render a cell based on the timer
			var tbl = new CellRender(eleName, binaryTime, l);
			tbl.index = tbl.bhlen;
			tbl.startTimer();
		}
	}
