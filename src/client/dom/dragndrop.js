import * as dom from 'client/dom/DOM';
import * as events from 'client/dom/events';
import selector from 'client/dom/selector';

//drag and drop events
export default function dragndrop() {

    let self = this,
        dragableCoverMask = null,
        currentDragObject = null,
        moving = false,
        offsetX = 0,
        offsetY = 0,
        posX = 0,
        posY = 0,
        isInitialized = false;

    let find = function(evt, dndRef) {

        let dnd = self,
            e, tgt;

        e = events.getEvent(evt);
        tgt = events.getTarget(e);

        if (dnd.moving && dnd.dragableCoverMask.id === tgt.id) {

            dnd.posX = events.getEventPosX();
            dnd.posY = events.getEventPosY();
            dnd[dndRef].style.left = dnd.posX - dnd.offsetX + "px";
            dnd[dndRef].style.top = dnd.posY - dnd.offsetY + "px";

            //if ( store.sessionEnabled ) {
            //	store.sessionStore.setItem(dndRef + "WBDNDX", dnd.posX);
            //	store.sessionStore.setItem(dndRef + "WBDNDY", dnd.posY);
            //}
        }
        return dnd;
    };

    let cleanSelection = function() {
        let select;

        if (window.getSelection) {
            // do something to change selection
            select = window.getSelection();
            if (select && select.empty) {
                select.empty();
            } else if (select && select.removeAllRanges) {
                select.removeAllRanges();
            }
        } else if (document.selection && document.selection.clear) {
            document.selection.clear();
        } else if (document.selection && document.selection.empty) {
            document.selection.empty();
        }
    };

    const toggleDrag = function(toggleOn, moveObjID, eventObjID) {
        // object being moved
        const obj = selector("#" + moveObjID).get(0),
            // find event target object or its the same as the object being moved
            dndEvtObjID = (eventObjID) ? eventObjID : moveObjID;

        const evtObj = selector("#" + dndEvtObjID).get(0);
        if (!obj || !evtObj) {
            return;
        }
        if (toggleOn) {
            // stack of things
            self.dragableObjects[evtObj.id] = obj;
            // setup event
            events.addEvent(evtObj, "mousedown", self.mousedown, false);
        } else {
            // stack of things
            self.dragableObjects[evtObj.id] = null;
            // remove event
            events.removeEvent(evtObj, "mousedown", self.mousedown, false);
        }
    };

    self.dragableObjects = [];

    self.initialize = function() {
        const dnd = self;
        if (dnd.isInitialized) {
            return;
        }
        dnd.dragableCoverMask = selector("#" + "-dragndrop-enabled-x").get(0);
        if (!dnd.dragableCoverMask) {
            dnd.dragableCoverMask = dom.createElement("div", document.body);
            dnd.dragableCoverMask.id = "-dragndrop-enabled-x";
        }
        dnd.dragableCoverMask.style.display = "none";
        events.addEvent(document, "mousemove", dnd.mousemove, false);
        events.addEvent(document, "mouseup", dnd.mouseup, false);
        dnd.isInitialized = true;
    };

    self.findDragableParent = function(element) {
        const dnd = self;
        if (!element || !element.nodeName || element.nodeName.toLowerCase() === "body") {
            return undefined;
        }
        if (!dnd.dragableObjects[element.id]) {
            return dnd.findDragableParent(element.parentNode);
        }
        return element;
    };

    self.mousemove = function(evt) {
        find(evt, "dragableCoverMask");
        cleanSelection();
        return false;
    };

    self.mouseup = function(evt) {
        const dnd = find(evt, "currentDragObject");

        // hide and stop
        dnd.dragableCoverMask.style.display = "none";
        dnd.currentDragObject = null;
        dnd.moving = false;

        cleanSelection();
    };

    self.mousedown = function(evt) {

        const dnd = self,
            e = events.getEvent(evt);

        let tgt = events.getTarget(e);

        // set the current draggable object by using the target objects id
        tgt = dnd.findDragableParent(tgt);
        if (!dnd.dragableObjects[tgt.id]) {
            dnd.moving = false;
            return false;
        }
        dnd.currentDragObject = dnd.dragableObjects[tgt.id];
        document.body.appendChild(dnd.currentDragObject);

        // need to calculate the difference between the event position
        // and the position of the corner of the object
        dnd.posX = events.getEventPosX();
        dnd.posY = events.getEventPosY();
        dnd.offsetX = dnd.posX - dnd.currentDragObject.offsetLeft;
        dnd.offsetY = dnd.posY - dnd.currentDragObject.offsetTop;

        // draggable mask object
        let dcm = dnd.dragableCoverMask;
        dcm.style.position = "absolute";
        dcm.style.display = "block";
        dcm.style.border = "2px solid black";
        dcm.style.left = dnd.currentDragObject.offsetLeft + "px";
        dcm.style.top = dnd.currentDragObject.offsetTop + "px";
        dcm.style.width = dnd.currentDragObject.offsetWidth + "px";
        dcm.style.height = dnd.currentDragObject.offsetHeight + "px";
        dcm.style.zIndex = 100000;

        // were on the move
        dnd.moving = true;
        return false;
    };

    self.setDragable = function(moveObjID, eventObjID) {
        toggleDrag(true, moveObjID, eventObjID);
    };

    self.setNONDragable = function(moveObjID, eventObjID) {
        toggleDrag(false, moveObjID, eventObjID);
    };
    return self;
}