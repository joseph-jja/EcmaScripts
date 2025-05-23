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
import * as dom from '/js/client/dom/DOM';
import * as events from '/js/client/dom/events';
import Dragndrop from '/js/client/dom/dragndrop';
import {
    byId,
    queryAll
} from '/js/client/dom/shortcuts';

export default function wbWindow( title, x, y, width, height, winID ) {

    // try to get the window, if not crate it from template
    const mainWin = byId( winID );
    if ( mainWin ) {
        this.mainWindow = mainWin;

        this.titleBar = queryAll( '.WebWindowTitle', this.mainWindow )[ 0 ];
        this.titleBar.id = "WebWindowTitle" + winID;

        this.windowArea = queryAll( '.WebWindowArea', this.mainWindow )[ 0 ];
        this.windowArea.id = "WebWindowArea" + winID;

        this.footerArea = queryAll( '.WebWindowFooter', this.mainWindow )[ 0 ];
        this.footerArea.id = "WebWindowFooter" + winID;
    } else {
        this.mainWindow = dom.createElement( "div", document.body, {
            "className": "WebWindowMain",
            "id": winID
        } );

        // set some style properties for this window
        // left, top, width, and height
        this.mainWindow.style.left = x + "px";
        this.mainWindow.style.top = y + "px";
        this.mainWindow.style.width = width + "px";
        this.mainWindow.style.height = height + "px";

        // 3 divs to contain the data
        this.titleBar = dom.createElement( "div", this.mainWindow, {
            "className": "WebWindowTitle",
            "id": "WebWindowTitle" + winID
        } );

        this.windowArea = dom.createElement( "div", this.mainWindow, {
            "className": "WebWindowArea",
            "id": "WebWindowArea" + winID
        } );

        // now the footer of the window
        this.footerArea = dom.createElement( "div", this.mainWindow, {
            "className": "WebWindowFooter",
            "id": "WebWindowFooter" + winID
        } );

    }
    // we create a span in the title bar
    const titleTable = dom.createElement( "span", this.titleBar, {
        "className": "WebWindowTitleText"
    } );
    titleTable.innerHTML = title;


    // this is for the buttons
    let options = {
        "className": "WebWindowButtonBox"
    };
    const buttonBox = dom.createElement( "span", this.titleBar, options );

    // because buttons need a form
    options = {
        "name": "WW" + winID,
        "onsubmit": "return false;"
    };
    const form = dom.createElement( "form", buttonBox, options );

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
    const buildButton = ( parent, winID, name, value, fn ) => {

        const opts = {
            "className": "WebWindowButton",
            "name": name,
            "id": name + winID
        };

        const button = dom.createElement( "button", parent, opts );
        button.innerHTML = value;
        button.onclick = fn;

        // this is all to workaround the but in IE
        // when you create a button type button
        let phtml = parent.innerHTML;
        phtml = phtml.toLowerCase();
        const bclass = new RegExp( "button class" );
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
    const nht = height - this.titleBar.offsetHeight - this.footerArea.offsetHeight;
    this.windowArea.style.height = nht + "px";

    this.dragndrop = new Dragndrop();
};

wbWindow.prototype.popToFront = function ( evt ) {
    const e = events.getEvent( evt );
    const tgt = events.getTarget( e );
    const tgtWin = dom.findParent( tgt, "div.WebWindowMain" );
    if ( !tgtWin ) {
        return;
    }
    //document.body.appendChild(tgtWin);
};

wbWindow.prototype.enableDrag = function () {
    const pop = this.popToFront;
    this.dragndrop.initialize();
    this.dragndrop.setDragable( this.mainWindow.id, this.titleBar.id );
    events.addEvent( this.mainWindow, "mousedown", pop, false );
};

wbWindow.prototype.disableDrag = function () {
    const pop = this.popToFront;
    this.dragndrop.initialize();
    this.dragndrop.setNONDragable( this.mainWindow.id, this.titleBar.id );
    events.removeEvent( this.mainWindow, "mousedown", pop, false );
};

//to set the tile
wbWindow.prototype.setTitle = function ( title ) {
    const titlearea = this.titleBar.getElementsByTagName( "span" );
    if ( titlearea && titlearea.length > 0 ) {
        titlearea[ 0 ].innerHTML = title;
    }
};

//to set content, just makes it a little easier
//not implemented
wbWindow.prototype.setContent = function ( content ) {
    dom.html( this.windowArea, content );
};
