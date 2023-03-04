//below is the calendar object
import WBDate from 'utils/dateFunctions';
import selector from 'client/dom/selector';
import * as css from 'client/dom/CSS';
import * as dom from 'client/dom/DOM';
import * as events from 'client/dom/events';

export default function Calendar( parentID, options ) {

    var handles, getHeaderRow, getCalendarRows, self;

    // a reference to the date
    this.date = new Date();

    // calendar id
    this.id = ( options && options.id ) ? options.id : "";

    // parent object
    if ( !parentID ) {
        throw ( "Could not create Calendar() because no parent object was specifiec!" );
    }
    this.parentID = parentID;
    self = this;

    // keep track of certain parts of this object
    // so we can update parts instead of the wholes
    handles = {
        "selection": '',
        "year": '',
        "content": null
    };
    this.handle = handles;
    this.hasRendered = false;

    this.userCallBackFN = null;

    // this is a private function for building the header
    getHeaderRow = function () {
        var i, result, hl = WBDate.weekDayShortNames.length;

        result = '<tr class="header">';

        for ( i = 0; i < hl; i += 1 ) {
            result += "<th>" + WBDate.weekDayShortNames[ i ] + "</th>";
        }
        result += "</tr>";

        return result;
    };

    // this is a private string for building the actual calendar content
    getCalendarRows = function ( dateObj ) {
        var i, x, sd, last, day;

        sd = WBDate.getFirstOfMonthDayOfWeek( dateObj );
        last = WBDate.getDaysInMonth( dateObj );
        day = dateObj.getDate();

        var result = "<tr>";
        for ( i = 0; i < sd; i += 1 ) {
            result += "<td>&nbsp;</td>";
        }
        for ( i = 1; i <= last; i += 1 ) {
            if ( i === day ) {
                result += '<td class="selected">' + i + "</td>";
            } else {
                result += '<td class="unselected">' + i + "</td>";
            }
            x = i + sd;
            if ( ( x % 7 ) === 0 ) {
                result += "</tr><tr>";
            }
        }
        result += "</tr>";

        return result;
    };

    var buildCalendarFrame = function ( dateObj ) {
        var ml, i, caldata;

        caldata = '<table class="navigation calendar"><tr><td>';

        caldata += '<td class="ylarrow">&lt;&lt;</td>';
        caldata += '<td class="mlarrow">&lt;</td>';
        caldata += '<td><form><select class="monthSelection">';

        ml = WBDate.monthNames.length;
        for ( i = 0; i < ml; i += 1 ) {
            var selected = ( dateObj.getMonth() === i ) ? 'selected="true"' : "";
            caldata += '<option ' + selected + ' value="' + i + '">' + WBDate.monthNames[ i ] + '</option>';
        }
        caldata += '</select></form></td>';

        caldata += '<td class="calyear">' + dateObj.getFullYear() + '</td>';
        caldata += '<td class="mrarrow">&gt;</td>';
        caldata += '<td class="yrarrow">&gt;&gt;</td>';
        caldata += '</tr></table>';

        caldata += '<div id="' + self.parentID + 'content"></div>';

        return caldata;
    };

    // render or re-render the calendar object
    this.render = function () {
        var result, selectObjs, callback, _self, tds,
            p, content, yearTD,
            parentObj, po;

        // actual dom reference object
        po = selector( "#" + this.parentID );
        parentObj = po.get( 0 );
        if ( !parentObj ) {
            throw ( "Could not get parent element to attach calendar to!" );
        }

        // the calendar has not been rendered
        // this is like 'first time in' lol
        if ( !this.hasRendered ) {
            // reference to outself
            _self = this;

            // add click event
            callback = function ( evt ) {
                _self.handleClick( evt, _self );
            };
            events.addEvent( parentObj, 'click', callback, false );

            result = buildCalendarFrame( this.date );
            dom.html( po, result );

            // need to handle the select onchange event
            selectObjs = selector( "select", parentObj );
            selectObjs.get( 0 ).onchange = function ( evt ) {
                _self.handleClick( evt, _self );
            };
            this.handle.selection = selectObjs.get( 0 );

            // ok now we setup the handle to the year table data element
            tds = selector( "td", parentObj );
            yearTD = false;
            for ( p = 0; p < tds.length; p += 1 ) {
                if ( css.hasClass( tds.get( p ), "calyear" ) ) {
                    yearTD = tds.get( p );
                    break;
                }
            }
            this.handle.year = yearTD;

            // ok calendar has been rendered for the first time
            this.hasRendered = true;
        }
        this.handle.selection.selectedIndex = this.date.getMonth();

        dom.html( this.handle.year, this.date.getFullYear() );

        if ( !this.handle.content ) {
            // this will work for now, but should really get the class name
            content = selector( "#" + this.parentID + "content", parentObj );
            if ( !content ) {
                throw ( "Could not build calendar frame" );
            }
            this.handle.content = content.get( 0 );
        }

        // build the inner calendar
        var innerCal = '<table class="calendar">' + getHeaderRow() + getCalendarRows( this.date ) + '</table>';
        dom.html( this.handle.content, innerCal );
    };

    // the handle click callback function
    this.handleClick = function ( evt, calObj ) {
        var name, checkClass, e = events.getEvent( evt ),
            tgt = events.getTarget( e );

        checkClass = function ( tgt, calObj, obj ) {
            var dContent, nYear, nMon;

            dContent = dom.findParent( tgt, "div" );
            if ( !dContent ) {
                return;
            }
            if ( css.hasClass( tgt, "selected" ) || css.hasClass( tgt, "unselected" ) ) {
                if ( !isNaN( tgt.innerHTML ) ) {
                    // this is the div
                    calObj.date.setDate( tgt.innerHTML );
                    calObj.render();
                    if ( obj.userCallBackFN ) {
                        obj.userCallBackFN( calObj );
                    }
                }
            } else if ( css.hasClass( tgt, "ylarrow" ) ) {
                nYear = calObj.date.getFullYear();
                calObj.date.setFullYear( ( +nYear ) - 1 );
                calObj.render();
            } else if ( css.hasClass( tgt, "mlarrow" ) ) {
                nMon = calObj.date.getMonth();
                calObj.date.setMonth( ( +nMon ) - 1 );
                calObj.render();
            } else if ( css.hasClass( tgt, "mrarrow" ) ) {
                nMon = calObj.date.getMonth();
                calObj.date.setMonth( ( +nMon ) + 1 );
                calObj.render();
            } else if ( css.hasClass( tgt, "yrarrow" ) ) {
                nYear = calObj.date.getFullYear();
                calObj.date.setFullYear( ( +nYear ) + 1 );
                calObj.render();
            }
        };

        name = tgt.nodeName.toUpperCase();
        if ( name === 'TD' ) {
            // get the parent table
            var tbl = dom.findParent( tgt, "table" );
            if ( !tbl ) {
                return;
            }
            checkClass( tgt, calObj, this );
        } else if ( name === 'SELECT' ) {
            var nMon = tgt.selectedIndex;
            calObj.date.setMonth( nMon );
            calObj.render();
        }
    };
};

Calendar.prototype.getCalendarDate = function () {
    return WBDate.monthNames[ this.date.getMonth() ] + " " + this.date.getDate() + ", " + this.date.getFullYear();
};

Calendar.prototype.setCalendarDate = function ( mm, dd, yyyy ) {
    this.date = new Date( yyyy, mm, dd );
    this.render();
};
