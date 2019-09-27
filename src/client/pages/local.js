import {
    DigitalClock,
    BinaryClock
} from 'client/components/clocks';
import Window from 'client/components/wbWindow';
import Calendar from 'client/components/calendar';
import selector from 'client/dom/selector';
import Calculator from 'client/components/calculator/Calculator';
import * as events from 'client/dom/events';

function doLoadStuff() {
    const clock = new DigitalClock();
    clock.setId("digiclock");
    clock.startClock();

    const ywin = new Window("Calendar", 515, 40, 350, 305, "calwin");
    // call constructor to calendar object and render it in a div
    const ncal = new Calendar("calendarData");
    ncal.render();

    // change the css class for the cdata area which holds the calendar
    const cdata = selector("#calendarData").get(0);
    // move the calendar into the window area
    ywin.windowArea.appendChild(cdata);
    ywin.enableDrag();

    const divObj = document.getElementById("googlebar");
    let data = divObj.innerHTML;
    divObj.style.display = "none";

    const googlewin = new Window("Google Search", 20, 470, 340, 150, "googlewin");
    googlewin.windowArea.innerHTML = '<div class="padddata">' + data + '</div>';
    googlewin.enableDrag();

    // main window
    const genObj = document.getElementById("generated");
    genObj.style.display = "none";

    const pagedataObj = document.getElementById("pagedata");
    data = pagedataObj.innerHTML + genObj.innerHTML;

    pagedataObj.style.display = "none";

    const pagedatawin = new Window("Info Window", 140, 40, 350, 405, "mainwindow");
    pagedatawin.windowArea.innerHTML = '<div class="padddata">' + data + '</div>';
    pagedatawin.enableDrag();

    const dwin = new Window("Calculator", 580, 360, 275, 300, "dwindow");
    const webCalc = new Calculator(dwin.windowArea.id);
    webCalc.render();
    //dwin.windowArea.appendChild(webCalc.createKeyPad());
    dwin.enableDrag();

    const binwin = new Window("Binary Clock", 390, 460, 165, 150, "binaryWindow");
    const binClock = new BinaryClock();
    binClock.setId(binwin.windowArea.id);
    binClock.render();
    binClock.startClock();
    binwin.enableDrag();

    //if ( alrtmsg && alrtmsg != "" ) {
    //alert(alrtmsg);
    //}
}

events.addOnLoad(doLoadStuff);