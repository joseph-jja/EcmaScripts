/////////////////////////////////////////////////
//this should be used to just build the user interface of the window
//this does nothing else.  
//there are 3 buttons: rollup, rolldown, and destroy - functionality not implemented yet

//styles should contain the below classes
//WebWindowMain - the main window
//WebWindowTitle - the title bar of the window
//WebWindowArea - the content area of the window
//WebWindowTitleText - the text in the title bar
//WebWindowButtonBox - the box for the buttons
//WebWindowButton - each button
import * as dom from 'client/dom/DOM';
import * as events from 'client/dom/events';
import * as dragndrop from 'client/dom/dragndrop';
import selector from 'client/dom/selector';

export default function wbWindow( title, x, y, width, height, winID ) {

    // 1 div for the main window
    // all WebWindows are web window mains 
    var options,
        bdy = document.body,
        code,
        buildButton, nht;

    // try to get the window, if not crate it from template
    //this.mainWindow = selector("#" + winID).get(0);
    //if ( ! this.mainWindow ) {
    //    code = template.add('main', '<div class="{{cssClass}}" id="{{eleID}}"></div>');
    //    options = { "cssClass": "WebWindowMain", "eleID": winID };
    //    selector(bdy).append(template.render('main', options)); 
    //    this.mainWindow = selector("#" + winID).get(0); 
    //}

    options = {
        "className": "WebWindowMain",
        "id": winID
    };
    this.mainWindow = dom.createElement( "div", document.body, options );

    // set some style properties for this window
    // left, top, width, and height
    this.mainWindow.style.left = x + "px";
    this.mainWindow.style.top = y + "px";
    this.mainWindow.style.width = width + "px";
    this.mainWindow.style.height = height + "px";

    // 3 divs to contain the data
    options = {
        "className": "WebWindowTitle",
        "id": "WebWindowTitle" + winID
    };
    this.titleBar = dom.createElement( "div", this.mainWindow, options );
    options = {
        "className": "WebWindowArea",
        "id": "WebWindowArea" + winID
    };
    this.windowArea = dom.createElement( "div", this.mainWindow, options );
    // now the footer of the window
    options = {
        "className": "WebWindowFooter",
        "id": "WebWindowFooter" + winID
    };
    this.footerArea = dom.createElement( "div", this.mainWindow, options );

    // we create a span in the title bar
    options = {
        "className": "WebWindowTitleText"
    };
    var titleTable = dom.createElement( "span", this.titleBar, options );
    titleTable.innerHTML = title;

    // this is for the buttons
    options = {
        "className": "WebWindowButtonBox"
    };
    var buttonBox = dom.createElement( "span", this.titleBar, options );

    // because buttons need a form 
    options = {
        "name": "WW" + winID,
        "onsubmit": "return false;"
    };
    var form = dom.createElement( "form", buttonBox, options );

    // maximize, minimize and destroy
    this.maximize = function () {
        return false;
    };
    this.minimize = function () {
        return false;
    };
    this.destroy = function () {
        return false;
    };

    // function for building buttons
    buildButton = function ( parent, winID, name, value, fn ) {

        // IE6 does not support button.type? BUG!!
        //button.type = "button";
        let bclass,
            phtml,
            button,
            opts = {
                "className": "WebWindowButton",
                "name": name,
                "id": name + winID
            };

        button = dom.createElement( "button", parent, opts );
        button.innerHTML = value;
        button.onclick = fn;

        // this is all to workaround the but in IE
        // when you create a button type button 
        phtml = parent.innerHTML;
        phtml = phtml.toLowerCase();
        bclass = new RegExp( "button class" );
        while ( phtml.match( bclass ) ) {
            phtml = phtml.replace( bclass, "button type=\"button\" class" );
        }
    };

    // create buttons: 3 cells
    buildButton( form, winID, "rollup", "-", this.minimize );
    buildButton( form, winID, "rolldown", "o", this.maximize );
    buildButton( form, winID, "destroy", "X", this.destroy );

    // now we set the main container to the window
    // this is where any content will be going
    this.windowArea.style.width = width + "px";
    this.titleBar.style.width = width + "px";
    this.footerArea.style.width = width + "px";

    // TODO update to correctly set size of this area based on rest of widget
    nht = height - this.titleBar.offsetHeight - this.footerArea.offsetHeight;
    this.windowArea.style.height = nht + "px";
};

wbWindow.prototype.popToFront = function ( evt ) {
    var tgtWin, tgt, e;
    e = events.getEvent( evt );
    tgt = events.getTarget();
    tgtWin = selector( tgt ).findParent( "div.WebWindowMain" );
    if ( !tgtWin ) {
        return;
    }
    //document.body.appendChild(tgtWin);
};

wbWindow.prototype.enableDrag = function () {
    var pop = this.popToFront;
    dragndrop.initialize();
    dragndrop.setDragable( this.mainWindow.id, this.titleBar.id );
    events.addEvent( this.mainWindow, "mousedown", pop, false );
};

wbWindow.prototype.disableDrag = function () {
    var pop = this.popToFront;
    dragndrop.initialize();
    dragndrop.setNONDragable( this.mainWindow.id, this.titleBar.id );
    events.removeEvent( this.mainWindow, "mousedown", pop, false );
};

//to set the tile 
wbWindow.prototype.setTitle = function ( title ) {
    var titlearea = this.titleBar.getElementsByTagName( "span" );
    if ( titlearea && titlearea.length > 0 ) {
        titlearea[ 0 ].innerHTML = title;
    }
};

//to set content, just makes it a little easier
//not implemented
wbWindow.prototype.setContent = function ( content ) {
    dom.html( this.windowArea, content );
};
