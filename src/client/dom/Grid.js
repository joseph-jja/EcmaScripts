import * as dom from 'client/dom/DOM';
import selector from 'client/dom/selector';

//this is the parent grid object
//this builds the table that has the cells for the individual pixels
export default function Grid(parentID, tableID) {
		var cols = 7, rows = 9;
		
		this.parentID = parentID;
		this.tableID = tableID;
		this.matrix = [];
		
		this.reset = function() {
	        var i, j, cell;
	        for (i = 0; i < rows; i += 1) {
	            for (j = 0; j < cols; j += 1) {
	                cell = selector("#" + this.tableID + 'cell' + i + '_' + j).get(0);
	                cell.style.background = "white";
	            }
	        }
	    };
	    
	    // build function builds the grid
	    this.build = function() {

	        var parent, 
	            table, i, j, row, cell;

	        parent = selector("#" + this.parentID).get(0);

	        table = create('table', parent, {
	            "id" : this.tableID + 'table'
	        });

	        for (i = 0; i < rows; i += 1) {
	            row = create('tr', table, {
	                "id" : this.tableID + 'row' + i
	            });
	            for (j = 0; j < cols; j += 1) {
	                cell = createElement('td', row, {
	                    "id" : this.tableID + 'cell' + i + '_' + j
	                });
	            }
	        }
	    };
		
	};	